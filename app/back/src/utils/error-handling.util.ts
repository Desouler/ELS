import * as express from "express";
import { logError } from "./logger.util";

export async function handle(app: express.Application) {
  function parseStackTrace(stackTrace: string) {
    let stack: string[] = [];
    if (stackTrace) {
      stack = stackTrace.split("\n");

      for (let i = 0; i < stack.length; i++) {
        stack[i] = stack[i].trim();
      }
    }
    return stack;
  }
  app.use(async (err: any, req: any, res: any, next: any) => {
    logError(err);
    if (process.env.NODE_ENV === "development") {
      return res.status(500).json({message: err.message, stack: parseStackTrace(err.stack)});
    } else {
      return res.status(500).json({message: ""});
    }
  });
  app.use(async (req: any, res: any, next: any) => {
    res.status(404);

    if (req.accepts("json")) {
      res.json({ message: "The url was not found" });
      return;
    }
  });
}
