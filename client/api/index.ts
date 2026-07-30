import express from "express";
import { registerRoutes } from "../../server/routes";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

let ready: Promise<void> | null = null;

function init() {
  if (!ready) {
    // The first argument (httpServer) is unused inside registerRoutes except
    // as a return value, so a placeholder is safe here in the serverless context.
    ready = registerRoutes({} as any, app).then(() => undefined);
  }
  return ready;
}

export default async function handler(req: any, res: any) {
  await init();
  app(req, res);
}