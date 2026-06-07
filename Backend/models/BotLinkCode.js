import mongoose from "mongoose";

// One-time codes a logged-in student generates on the website and sends to the
// Telegram bot to link their account. Expires shortly after creation.
const botLinkCodeSchema = new mongoose.Schema({
  code:      { type: String, required: true, unique: true },
  user:      { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  expiresAt: { type: Date, required: true },
}, { timestamps: true });

botLinkCodeSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 });

export default mongoose.model("BotLinkCode", botLinkCodeSchema);
