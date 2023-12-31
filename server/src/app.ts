import { Server as HttpServer } from "http";
import { Server as HttpsServer } from "https";
import { join } from "path";
import { execSync } from "child_process";
import express, { Express } from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

import env from "./config/env";
import db from "./config/db";
import apiRouterHandler from "./routes";
import errorMiddleware from "./middlewares/error";

let server: HttpsServer | HttpServer | null;
const BASE_PATH = env?.BASE_PATH || "";
const PORT = env?.PORT || 8080;

async function defineApp(app: Express) {
  app.use(express.json());
  app.use(express.urlencoded({ extended: false }));

  const allowedOrigins = [];
  if (env?.NODE_ENV !== "production") {
    allowedOrigins.push("http://localhost:3000");
    const host = "192.168.43.50";
    console.log(host);
    allowedOrigins.push(`http://${host}:3000`);
  }
  if (env?.BASE_ORIGINS) allowedOrigins.push(env?.BASE_ORIGINS);
  console.log(allowedOrigins);
  app.use(
    cors({
      credentials: true,
      origin: allowedOrigins,
    })
  );
  app.use(cookieParser());
  app.use(BASE_PATH + "/api", apiRouterHandler, errorMiddleware);
}

async function start() {
  const app = express();

  await defineApp(app);

  if (env?.NODE_ENV === "production") {
    const staticPath = join(__dirname, "..", "generated", "public");
    app.use(BASE_PATH, express.static(staticPath));
    app.get(BASE_PATH + "/*", (req, res) =>
      res.sendFile(join(__dirname, "..", "generated", "public", "index.html"))
    );
  }

  server = app.listen(PORT, () => {
    console.log("Listening on PORT " + PORT);
  });
}

db.authenticate()
  .then(start)
  .catch((err) => {
    console.error(`Application Error: ${err}\n`);
    server?.close((err) => {
      if (err) return console.error(err);
      console.log("Server closed without error.");
    });
  });
