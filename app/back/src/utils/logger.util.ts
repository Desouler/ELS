import winston from "winston";
import path from "path";
import { NODE_ENV } from './config.util';

const format = winston.format.combine(winston.format.json(), winston.format.timestamp());
export const logger = winston.createLogger({
  level: "info",
  format,
  transports: [
    new winston.transports.File({ filename: path.join(__dirname, "./../../log/error.log"), level: "error", format }),
    new winston.transports.File({ filename: path.join(__dirname, "./../../log/all.log"), format }),
  ],
});

export function logError(error: any) {
    try {
        if (typeof error ===  "string") {
            logger.error(error);
        } else if (typeof error === "object") {
            logger.error(error.message);
            if (error.stack) {
                logger.error(error.stack);
            }
        }
    } catch (errr) { }
}

if (NODE_ENV === "development") {
  logger.add(
    new winston.transports.Console({
      format: winston.format.simple(),
    })
  );
}