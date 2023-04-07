import mongoose from "mongoose";

export const connectDB = () => {
  mongoose
    .connect(process.env.MONGO_URL, {
      dbName: "Todo_app",
    })
    .then(() => {
      console.log("Database Connected");
    })
    .catch((e) => {
      console.error(e);
    });
};
