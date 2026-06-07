import { backend } from "../lib/backend.js";

const NOT_LINKED = "Your Telegram isn't linked to a Slot account yet. Generate a code from your dashboard and send /link <code>.";

export function registerPay(bot) {
  bot.command("pay", async (ctx) => {
    try {
      const assignments = await backend.getAssignments(String(ctx.from.id));
      const due = assignments.filter((a) => a.status === "Pending Payment");

      if (!due.length) {
        return ctx.reply("You don't have any assignments awaiting payment right now.");
      }

      // Checkout uses the Razorpay JS widget, so payment must be completed
      // on the website — the bot just deep-links to the right assignment.
      const assignment = due[0];
      const frontendUrl = process.env.FRONTEND_URL || "http://localhost:5173";
      await ctx.reply(
        `💳 To pay for *"${assignment.title}"*, complete the secure checkout on the Slot website:\n${frontendUrl}/payment?id=${assignment._id}`,
        { parse_mode: "Markdown" }
      );
    } catch (err) {
      await ctx.reply(err.message.includes("linked") ? NOT_LINKED : `❌ ${err.message}`);
    }
  });
}
