const WELCOME = `👋 Welcome to *Slot Assistant*!

I can help you with:
• Checking your assignment & payment status
• Submitting new assignment requests
• Starting a payment for a reviewed assignment
• Answering questions about how Slot works

*Commands:*
/link <code> — connect your Slot account (get a code from your dashboard)
/status — view your assignments
/new — submit a new assignment
/pay — pay for an assignment that's awaiting payment
/help — show this message

You can also just type a question, e.g. "what's the status of my database assignment?"`;

export function registerStart(bot) {
  bot.command(["start", "help"], async (ctx) => {
    await ctx.reply(WELCOME, { parse_mode: "Markdown" });
  });
}
