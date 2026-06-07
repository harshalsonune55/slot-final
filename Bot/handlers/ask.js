import { answerQuestion } from "../lib/rag.js";

export async function handleAsk(ctx) {
  const question = ctx.message.text.trim();
  if (!question) return;

  await ctx.replyWithChatAction("typing");

  try {
    const answer = await answerQuestion(String(ctx.from.id), question);
    await ctx.reply(answer || "I'm not sure how to answer that — try /help to see what I can do.");
  } catch (err) {
    console.error("RAG error:", err);
    await ctx.reply("Sorry, I couldn't process that right now. Please try again in a moment.");
  }
}
