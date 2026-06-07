import express from "express";
import jwt from "jsonwebtoken";
import Assignment from "../models/Assignment.js";
import User from "../models/User.js";
import Payment from "../models/Payment.js";
import adminAuth from "../middleware/adminAuth.js";

const router = express.Router();

// POST /api/admin/login
router.post("/login", (req, res) => {
  const { email, password } = req.body;

  if (email !== process.env.ADMIN_EMAIL || password !== process.env.ADMIN_PASSWORD) {
    return res.status(401).json({ error: "Invalid admin credentials" });
  }

  const token = jwt.sign(
    { isAdmin: true, email },
    process.env.JWT_SECRET,
    { expiresIn: "1d" }
  );

  res.json({ token });
});

// GET /api/admin/stats
router.get("/stats", adminAuth, async (req, res) => {
  try {
    const [totalAssignments, totalStudents] = await Promise.all([
      Assignment.countDocuments(),
      User.countDocuments(),
    ]);

    const byStatus = await Assignment.aggregate([
      { $group: { _id: "$status", count: { $sum: 1 } } },
    ]);

    const revenueResult = await Payment.aggregate([
      { $match: { status: "paid" } },
      { $group: { _id: null, total: { $sum: "$amount" } } },
    ]);

    const statusMap = byStatus.reduce((acc, s) => ({ ...acc, [s._id]: s.count }), {});

    res.json({
      totalAssignments,
      totalStudents,
      pendingPayment: statusMap["Pending Payment"] || 0,
      pending:        statusMap["Pending"]         || 0,
      inProgress:     statusMap["In Progress"]     || 0,
      completed:      statusMap["Completed"]       || 0,
      revenue:        Math.round((revenueResult[0]?.total || 0) / 100), // paise → rupees
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET /api/admin/assignments  — all with student info + payment
router.get("/assignments", adminAuth, async (req, res) => {
  try {
    const assignments = await Assignment.find()
      .populate("user", "name email whatsapp university branch year")
      .sort({ createdAt: -1 });

    const assignmentIds = assignments.map((a) => a._id);
    const payments = await Payment.find({ assignment: { $in: assignmentIds } });
    const paymentMap = payments.reduce(
      (acc, p) => ({ ...acc, [p.assignment.toString()]: p }),
      {}
    );

    const result = assignments.map((a) => ({
      ...a.toObject(),
      payment: paymentMap[a._id.toString()] || null,
    }));

    res.json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET /api/admin/assignments/:id
router.get("/assignments/:id", adminAuth, async (req, res) => {
  try {
    const assignment = await Assignment.findById(req.params.id)
      .populate("user", "name email whatsapp university branch year");
    if (!assignment) return res.status(404).json({ error: "Not found" });

    const payment = await Payment.findOne({ assignment: assignment._id });
    res.json({ ...assignment.toObject(), payment: payment || null });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// PUT /api/admin/assignments/:id/status
router.put("/assignments/:id/status", adminAuth, async (req, res) => {
  const { status } = req.body;
  const valid = ["Pending Payment", "Pending", "In Progress", "Completed"];

  if (!valid.includes(status)) {
    return res.status(400).json({ error: "Invalid status value" });
  }

  try {
    const assignment = await Assignment.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    ).populate("user", "name email whatsapp");

    if (!assignment) return res.status(404).json({ error: "Not found" });
    res.json(assignment);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET /api/admin/users
router.get("/users", adminAuth, async (req, res) => {
  try {
    const users = await User.find().sort({ createdAt: -1 });
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
