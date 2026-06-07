import { backend } from "../lib/backend.js";

export function registerLink(bot) {
  bot.command("link", async (ctx) => {
    const code = ctx.match?.trim();
    if (!code) {
      return ctx.reply(
        "Send your one-time code like this: `/link 123456`\n\nGenerate a code from the *Slot Assistant* card on your dashboard at slot's website.",
        { parse_mode: "Markdown" }
      );
    }

    try {
      const { name } = await backend.link(code, String(ctx.from.id));
      await ctx.reply(`✅ Linked! Your Telegram is now connected to ${name}'s Slot account. Try /status to see your assignments.`);
    } catch (err) {
      await ctx.reply(`❌ ${err.message}`);
    }
  });
}
