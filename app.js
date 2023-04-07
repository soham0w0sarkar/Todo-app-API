import express, { json } from "express";
import userRouter from "./routes/user.js";
import { config } from "dotenv";
import cookieParser from "cookie-parser";
import taskRouter from "./routes/task.js";
import { errorMidlleWare } from "./utils/error.js";
import cors from "cors";

export const app = express();

config({
  path: "./data/config.env",
});

//addinf midllewares
app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);
app.use("/api/v1/user", userRouter);
app.use("/api/v1/task", taskRouter);
app.use(errorMidlleWare);

app.get("/", "Greate");
