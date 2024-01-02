import mongoose from "mongoose";

const taskSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  completedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  taskFor: {
    type: String,
    enum: ["personal", "company"],
    default: "personal",
  },
  completed: {
    type: Boolean,
    default: false,
  },
});

export default mongoose.model("Task", taskSchema);
