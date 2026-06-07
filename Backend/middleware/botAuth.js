// Shared-secret check for requests coming from the Telegram bot service
// (the bot has no per-user JWT — it authenticates as itself, then identifies
// the student by their linked telegram_id).
export default function botAuth(req, res, next) {
  const secret = req.headers["x-bot-secret"];
  if (!secret || secret !== process.env.BOT_SHARED_SECRET) {
    return res.status(401).json({ error: "Unauthorized — invalid bot secret" });
  }
  next();
}
