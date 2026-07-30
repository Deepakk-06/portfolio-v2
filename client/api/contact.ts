import { z } from "zod";
import { Resend } from "resend";
import { storage } from "../../server/storage";
import { insertMessageSchema } from "../../shared/schema";

const resend = process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null;
const CONTACT_RECEIVER_EMAIL = "deeeeps06@gmail.com";

export default async function handler(req: any, res: any) {
  if (req.method !== "POST") {
    res.status(405).json({ message: "Method not allowed" });
    return;
  }

  try {
    const input = insertMessageSchema.parse(req.body);
    await storage.createMessage(input);

    if (resend) {
      try {
        await resend.emails.send({
          from: "Portfolio Contact <onboarding@resend.dev>",
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