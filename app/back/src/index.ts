import express from "express";
import dotenv from "dotenv";
import "reflect-metadata";
import * as routes from "./routes";
import { logger } from "./utils/logger.util";
import { handle } from "./utils/error-handling.util";
import cors from "cors";
import helmet from "helmet";
import fileUpload from "express-fileupload";
dotenv.config({ path: ".env" });

declare module "express" {
  interface Request {
    user?: any;
  }
}

declare global {
  namespace CookieSessionInterfaces {
    interface CookieSessionObject {
      cartId: number;
    }
  }
}

// Initialize environment
dotenv.config();

// Initialize app
const app = express();
app.use(
  helmet({
    contentSecurityPolicy: {
      directives: {
        ...helmet.contentSecurityPolicy.getDefaultDirectives(),
      },
    },
  })
);
const port = process.env.SERVER_PORT;

app.use(fileUpload());

app.use("/assets", express.static("public/assets", { maxAge: 31557600000 }));
app.use("/uploads", express.static("public/uploads", { maxAge: 31557600000 }));
app.use("/public/uploads", express.static("public/uploads", { maxAge: 31557600000 }));

const corsOptions: cors.CorsOptions = {
  origin: "*",
  methods: ["GET", "POST", "PUT", "OPTIONS", "DELETE"],
  allowedHeaders: "*",
  optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
};
app.use(cors(corsOptions));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.options("*", cors());

// Initialize database connections
// DbUtil.init();

// Middleware. Not doing anything
app.use((req, res, next) => {
  next();
});

// Register all routes
routes.registerRoutes(app);

// Handle un-handled errors
handle(app);

// start the express server
const server = app.listen(port, () => {
  logger.info(`server started at http://localhost:${port}`);
  setTimeout(() => {
    assignJobs();
  }, 5000);
});

// socketUtil.init(server);

function assignJobs() {
  // const scheduleEveryHour = scheduling.scheduleJob("hourly", "0 * * * *", () => {});
  // const scheduleEveryDay = scheduling.scheduleJob("daily", "0 5 * * *", () => {});
  // const scheduleEveryMinute = scheduling.scheduleJob("minute", "*/1 * * * *", () => {});
}
