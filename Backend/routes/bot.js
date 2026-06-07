import express from "express";
import crypto from "crypto";
import User from "../models/User.js";
import Assignment from "../models/Assignment.js";
import Payment from "../models/Payment.js";
import BotLinkCode from "../models/BotLinkCode.js";
import auth from "../middleware/auth.js";
import botAuth from "../middleware/botAuth.js";

const router = express.Router();

const LINK_CODE_TTL_MS = 10 * 60 * 1000; // 10 minutes

async function findLinkedUser(telegram_id, res) {
  const user = await User.findOne({ telegram_id });
  if (!user) {
    res.status(404).json({ error: "No Slot account linked to this Telegram ID" });
    return null;
  }
  return user;
}

// ── Linking ──────────────────────────────────────────────────────
// POST /api/bot/link-code  (student JWT) — generate a one-time code
router.post("/link-code", auth, async (req, res) => {
  try {
    await BotLinkCode.deleteMany({ user: req.user.id });

    const code = crypto.randomInt(100000, 999999).toString();
    await BotLinkCode.create({
      code,
      user: req.user.id,
      expiresAt: new Date(Date.now() + LINK_CODE_TTL_MS),
    });

    res.json({ code, expiresInMinutes: LINK_CODE_TTL_MS / 60000 });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST /api/bot/link  (bot secret) — bot exchanges a code for a linked account
router.post("/link", botAuth, async (req, res) => {
  try {
    const { code, telegram_id } = req.body;
    if (!code || !telegram_id) {
      return res.status(400).json({ error: "code and telegram_id are required" });
    }

    const link = await BotLinkCode.findOne({ code });
    if (!link) return res.status(404).json({ error: "Invalid or expired code" });

    const alreadyLinked = await User.findOne({ telegram_id });
    if (alreadyLinked && String(alreadyLinked._id) !== String(link.user)) {
      return res.status(409).json({ error: "This Telegram account is already linked to another user" });
    }

    const user = await User.findByIdAndUpdate(link.user, { telegram_id }, { new: true });
    await BotLinkCode.deleteOne({ _id: link._id });

    res.json({ name: user.name, email: user.email });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ── RAG context ──────────────────────────────────────────────────
// GET /api/bot/context/:telegram_id  (bot secret) — everything the RAG
// pipeline needs about this student to answer personal questions
router.get("/context/:telegram_id", botAuth, async (req, res) => {
  try {
    const user = await findLinkedUser(req.params.telegram_id, res);
    if (!user) return;

    const [assignments, payments] = await Promise.all([
      Assignment.find({ user: user._id }).sort({ createdAt: -1 }).limit(20),
      Payment.find({ user: user._id }).populate("assignment", "title subject").sort({ createdAt: -1 }).limit(20),
    ]);

    res.json({
      profile: {
        name: user.name,
        email: user.email,
        university: user.university,
        branch: user.branch,
        year: user.year,
      },
      assignments,
      payments,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ── Assignments ──────────────────────────────────────────────────
// GET /api/bot/assignments/:telegram_id  (bot secret)
router.get("/assignments/:telegram_id", botAuth, async (req, res) => {
  try {
    const user = await findLinkedUser(req.params.telegram_id, res);
    if (!user) return;

    const assignments = await Assignment.find({ user: user._id }).sort({ createdAt: -1 });
    res.json(assignments);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST /api/bot/assignments  (bot secret) — create an assignment from chat
router.post("/assignments", botAuth, async (req, res) => {
  try {
    const { telegram_id, title, subject, description, deadline } = req.body;
    if (!title || !subject || !description) {
      return res.status(400).json({ error: "title, subject and description are required" });
    }

    const user = await findLinkedUser(telegram_id, res);
    if (!user) return;

    const assignment = await Assignment.create({
      user: user._id,
      title,
      subject,
      description,
      deadline: deadline || null,
      status: "Pending Payment",
    });

    res.status(201).json(assignment);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
