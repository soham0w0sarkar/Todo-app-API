import express, { json } from "express";
import { config } from "dotenv";
import cookieParser from "cookie-parser";
import { errorMidlleWare } from "./utils/error.js";
import cors from "cors";

import userRouter from "./routes/user.js";
import companyRouter from "./routes/company.js";
import taskRouter from "./routes/task.js";

config({
  path: "./data/config.env",
});

const app = express();

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
    optionsSuccessStatus: 200,
    exposedHeaders: ["Set-Cookie"],
    methods: ["GET", "PUT", "POST", "DELETE", "OPTIONS"],
    allowedHeaders: [
      "Access-Control-Allow-Origin",
      "Content-Type",
      "Authorization",
      "Set-Cookie",
    ],
  })
);

app.use(express.json());
app.use(cookieParser());

app.use("/api/v1/user", userRouter);
app.use("/api/v1/task", taskRouter);
app.use("/api/v1/company", companyRouter);

app.get("/", (req, res) => {
  res.send("<h1>Hello Everynian</h1>");
});

app.use(errorMidlleWare);

export default app;
