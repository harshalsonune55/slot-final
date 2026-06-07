import mongoose from "mongoose";

const paymentSchema = new mongoose.Schema({
  user:       { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  assignment: { type: mongoose.Schema.Types.ObjectId, ref: "Assignment", default: null },
  razorpay_order_id:   { type: String, unique: true, sparse: true },
  razorpay_payment_id: { type: String, default: null },
  razorpay_signature:  { type: String, default: null },
  amount: { type: Number, default: 0 }, // in paise
  status: { type: String, enum: ["pending", "paid", "failed"], default: "pending" },
}, { timestamps: true });

export default mongoose.model("Payment", paymentSchema);
