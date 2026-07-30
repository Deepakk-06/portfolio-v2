import { pgTable, text, serial, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { drizzle } from "drizzle-orm/node-postgres";
import pg from "pg";
import { z } from "zod";
import { Resend } from "resend";

const { Pool } = pg;

const messages = pgTable("messages", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull(),
  message: text("message").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
});

const insertMessageSchema = createInsertSchema(messages).omit({ id: true, createdAt: true });

if (!process.env.DATABASE_URL) {
  throw new Error("DATABASE_URL must be set. Did you forget to provision a database?");
}
const pool = new Pool({ connectionString: process.env.DATABASE_URL });
const db = drizzle(pool);

const resend = process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null;
const CONTACT_RECEIVER_EMAIL = "deeeeps06@gmail.com";

export default async function handler(req: any, res: any) {
  if (req.method !== "POST") {
    res.status(405).json({ message: "Method not allowed" });
    return;
  }

  try {
    const input = insertMessageSchema.parse(req.body);
    await db.insert(messages).values(input);

    if (resend) {
      try {
        await resend.emails.send({
          from: "Deepak K <onboarding@resend.dev>",
          to: CONTACT_RECEIVER_EMAIL,
          replyTo: input.email,
          subject: `New message from ${input.name} (Portfolio Contact Form)`,
          text: `Name: ${input.name}\nEmail: ${input.email}\n\nMessage:\n${input.message}`,
        });
      } catch (emailErr) {
        console.error("Failed to send contact email:", emailErr);
      }
    } else {
      console.warn("RESEND_API_KEY not set — skipping email notification.");
    }

    res.status(201).json({ success: true, message: "Message sent successfully" });
  } catch (err) {
    if (err instanceof z.ZodError) {
      res.status(400).json({
        message: "Invalid input",
        field: err.errors[0].path.join(".")
      });
    } else {
      console.error(err);
      res.status(500).json({ message: "Internal server error" });
    }
  }
}
