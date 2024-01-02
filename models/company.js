import mongoose from "mongoose";

const companySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  companyId: {
    type: String,
    required: true,
    unique: true,
  },
  employees: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  ],
});

export default mongoose.model("Company", companySchema);
