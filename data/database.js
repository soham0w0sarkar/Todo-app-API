import mongoose from "mongoose";

export const connectDB = () => {
  mongoose
    .connect(process.env.MONGO_URI, {
      dbName: "Todo_app",
    })
    .then(() => {
      console.log("Database Connected");
    })
    .catch((e) => {
      console.error(e);
    });
};
