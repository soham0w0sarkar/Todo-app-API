import express from "express";
import {
  completed,
  createTask,
  deleteTask,
  myTask,
} from "../controllers/task.js";
import { isAuthenciated } from "../utils/features.js";

const router = express.Router();

router.post("/create", isAuthenciated, createTask);

router.get("/myTask", isAuthenciated, myTask);

router
  .route("/update/:id")
  .put(isAuthenciated, completed)
  .delete(isAuthenciated, deleteTask);

export default router;
