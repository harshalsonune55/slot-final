import "dotenv/config";
import { Bot, session } from "grammy";
import { connectDB } from "./lib/db.js";

import { registerStart } from "./handlers/start.js";
import { registerLink } from "./handlers/link.js";
import { registerAssignments } from "./handlers/assignments.js";
import { registerNewAssignment, handleNewAssignmentStep } from "./handlers/newAssignment.js";
import { registerPay } from "./handlers/pay.js";
import { handleAsk } from "./handlers/ask.js";

await connectDB();
console.log("Connected to MongoDB");

const bot = new Bot(process.env.TELEGRAM_BOT_TOKEN);

function initialSession() {
  return { flow: null, flowData: {} };
}
bot.use(session({ initial: initialSession }));

registerStart(bot);
registerLink(bot);
registerAssignments(bot);
registerNewAssignment(bot);
registerPay(bot);

// Fallback: route plain text either to an in-progress multi-step flow
// (e.g. /new assignment wizard) or to the RAG Q&A pipeline.
bot.on("message:text", async (ctx) => {
  if (ctx.session.flow) {
    return handleNewAssignmentStep(ctx);
  }
  return handleAsk(ctx);
});

bot.catch((err) => {
  console.error("Bot error:", err.error || err);
});

bot.start();
console.log("Slot Telegram bot started");
