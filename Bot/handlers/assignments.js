import { backend } from "../lib/backend.js";

const NOT_LINKED = "Your Telegram isn't linked to a Slot account yet. Generate a code from your dashboard and send /link <code>.";

export function registerAssignments(bot) {
  bot.command(["status", "assignments"], async (ctx) => {
    try {
      const assignments = await backend.getAssignments(String(ctx.from.id));

      if (!assignments.length) {
        return ctx.reply("You don't have any assignments yet. Send /new to submit one.");
      }

      const lines = assignments.slice(0, 10).map((a, i) => {
        const deadline = a.deadline ? ` · due ${new Date(a.deadline).toDateString()}` : "";
        return `${i + 1}. *${a.title}* (${a.subject})\n   Status: ${a.status}${deadline}`;
      });

      await ctx.reply(`📋 Your assignments:\n\n${lines.join("\n\n")}`, { parse_mode: "Markdown" });
    } catch (err) {
      await ctx.reply(err.message.includes("linked") ? NOT_LINKED : `❌ ${err.message}`);
    }
  });
}
