import mongoose from "mongoose";

let connecting;

export function connectDB() {
  if (mongoose.connection.readyState === 1) return Promise.resolve();
  if (!connecting) connecting = mongoose.connect(process.env.MONGODB_URI);
  return connecting;
}
