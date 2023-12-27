import express, { json } from "express";
import userRouter from "./routes/user.js";
import { config } from "dotenv";
import cookieParser from "cookie-parser";
import taskRouter from "./routes/task.js";
import { errorMidlleWare } from "./utils/error.js";
import cors from "cors";

const app = express();

config({
  path: "./data/config.env",
});

//adding midllewares
app.use(express.json());
app.use(cookieParser());

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

app.use("/api/v1/user", userRouter);
app.use("/api/v1/task", taskRouter);
app.use(errorMidlleWare);

app.get("/", (req, res) => {
  res.send("<h1>Hello Everynian</h1>");
});

export default app;
