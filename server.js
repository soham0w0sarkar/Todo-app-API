import app from "./app.js";
import http from "http";
import { Server } from "socket.io";
import { connectDB } from "./data/database.js";

import Company from "./models/company.js";
import Task from "./models/task.js";

connectDB();

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*",
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
  },
});

io.on("connection", (socket) => {
  socket.on("join", async (companyId, user) => {
    const company = await Company.findOne({ companyId });

    if (!company) {
      return socket.emit("error", "Company not found");
    }

    console.log("User joined", companyId);

    socket.join(companyId);
    socket.userId = user._id;
    
    const tasks = await Task.find({
      createdBy: { $in: company.employees },
      taskFor: "company",
    });

    io.to(companyId).emit("tasks", tasks);

    socket.on("createTask", async (title) => {
      const task = await Task.create({
        title,
        taskFor: "company",
        createdBy: socket.userId,
      });

      io.to(companyId).emit("newTask", task);
    });

    socket.on("updateTask", async (task) => {
      const taskinQ = await Task.findById(task);

      if (!taskinQ) {
        return socket.emit("error", "Task not found");
      }

      taskinQ.completed = true;
      taskinQ.completedBy = socket.userId;
      await taskinQ.save();

      io.to(companyId).emit("updatedTask", taskinQ);
    });

    socket.on("deleteTask", async (task) => {
      const taskinQ = await Task.findById(task);

      if (!taskinQ) {
        return socket.emit("error", "Task not found");
      }

      await taskinQ.deleteOne();

      io.to(companyId).emit("deletedTask", taskinQ);
    });
  });
});

server.listen(process.env.PORT, () => {
  console.log(`Server Listening to : http://localhost:${process.env.PORT}`);
});
