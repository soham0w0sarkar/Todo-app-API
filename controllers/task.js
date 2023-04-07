import { Task } from "../models/task.js";
import errorHandler from "../utils/error.js";

export const createTask = async (req, res, next) => {
  try {
    const { title, description } = req.body;

    await Task.create({
      title,
      description,
      createdBy: req.user,
    });

    res.status(201).json({
      success: true,
      message: "Task Created Sucessfully",
    });
  } catch (error) {
    next(error);
  }
};

export const myTask = async (req, res, next) => {
  try {
    const tasks = await Task.find({ createdBy: req.user._id });

    res.status(200).json({
      success: true,
      tasks,
    });
  } catch (error) {
    next(error);
  }
};

export const completed = async (req, res, next) => {
  try {
    const task = await Task.findById(req.params.id);

    if (!task) return next(new errorHandler("No Such Tasks Exists", 400));

    task.completed = !task.completed;
    await task.save();

    res.status(200).json({
      success: true,
      message: "Task Completed",
    });
  } catch (error) {
    next(error);
  }
};

export const deleteTask = async (req, res, next) => {
  try {
    const task = await Task.findById(req.params.id);

    if (!task) return next(new errorHandler("No Such Tasks Exists", 400));

    await task.deleteOne();

    res.status(200).json({
      success: true,
      message: "Task Delete Successfully",
    });
  } catch (error) {
    next(error);
  }
};
