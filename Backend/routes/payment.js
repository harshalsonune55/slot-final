import express from "express";
import Razorpay from "razorpay";
import crypto from "crypto";
import Payment from "../models/Payment.js";
import Assignment from "../models/Assignment.js";
import auth from "../middleware/auth.js";

const router = express.Router();

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

// POST /api/payment/create-order
router.post("/create-order", auth, async (req, res) => {
  const { amount, assignment_id } = req.body;

  if (!amount) return res.status(400).json({ error: "amount is required" });

  try {
    const order = await razorpay.orders.create({
      amount: Math.round(amount) * 100, // fils
      currency: "AED",
      receipt: `rcpt_${Date.now()}`,
    });

    await Payment.create({
      user: req.user.id,
      assignment: assignment_id || null,
      razorpay_order_id: order.id,
      amount: order.amount,
      status: "pending",
    });

    res.json({ orderId: order.id, amount: order.amount, currency: order.currency });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST /api/payment/verify
router.post("/verify", auth, async (req, res) => {
  const { razorpay_order_id, razorpay_payment_id, razorpay_signature, assignment_id } = req.body;

  if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
    return res.status(400).json({ success: false, error: "Missing payment fields" });
  }

  const expected = crypto
    .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
    .update(`${razorpay_order_id}|${razorpay_payment_id}`)
    .digest("hex");

  if (expected !== razorpay_signature) {
    return res.status(400).json({ success: false, error: "Invalid payment signature" });
  }

  await Payment.findOneAndUpdate(
    { razorpay_order_id },
    { razorpay_payment_id, razorpay_signature, status: "paid" }
  );

  if (assignment_id) {
    await Assignment.findOneAndUpdate(
      { _id: assignment_id, user: req.user.id, status: "Pending Payment" },
      { status: "Pending" }
    );
  }

  res.json({ success: true });
});

// GET /api/payment  — payment history
router.get("/", auth, async (req, res) => {
  try {
    const payments = await Payment.find({ user: req.user.id })
      .populate("assignment", "title subject")
      .sort({ createdAt: -1 });
    res.json(payments);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
