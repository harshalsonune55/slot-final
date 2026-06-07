import mongoose from "mongoose";

const fileSchema = new mongoose.Schema({
  file_name: String,
  file_url:  String,
}, { _id: false });

const assignmentSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  title:       { type: String, required: true },
  subject:     { type: String, default: "" },
  description: { type: String, default: "" },
  deadline:    { type: Date, default: null },
  status: {
    type: String,
    enum: ["Pending Payment", "Pending", "In Progress", "Completed"],
    default: "Pending Payment",
  },
  files: [fileSchema],
}, { timestamps: true });

export default mongoose.model("Assignment", assignmentSchema);
