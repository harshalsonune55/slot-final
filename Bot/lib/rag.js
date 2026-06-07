import { searchKnowledge } from "./vectorstore.js";
import { backend } from "./backend.js";
import { chat } from "./groq.js";

const SYSTEM_PROMPT = `You are the Slot Assistant, a helpful Telegram bot for Slot — a platform where students get help with tech assignments.

Answer the student's question using ONLY the context provided below (general platform knowledge and, if available, the student's own account data). Be concise and friendly, suitable for a chat message. If the context doesn't contain the answer, say you don't have that information rather than guessing — do not invent assignment statuses, amounts, or dates.

When discussing the student's own assignments or payments, refer to them by title/subject and status. Format money as ₹ (amounts from the backend are in paise — divide by 100).`;

function formatAccountContext(context) {
  if (!context) {
    return "The student has not linked their Slot account to this bot, so no personal data is available. Suggest they use /link <code> to connect their account (the code is generated from the website dashboard).";
  }

  const { profile, assignments, payments } = context;

  const assignmentLines = assignments.length
    ? assignments.map((a) =>
        `- "${a.title}" (${a.subject}) — status: ${a.status}${a.deadline ? `, deadline: ${new Date(a.deadline).toDateString()}` : ""}`
      ).join("\n")
    : "(no assignments yet)";

  const paymentLines = payments.length
    ? payments.map((p) =>
        `- ₹${(p.amount / 100).toFixed(2)} for "${p.assignment?.title || "an assignment"}" — status: ${p.status}`
      ).join("\n")
    : "(no payments yet)";

  return [
    `Student profile: ${profile.name} (${profile.email})${profile.university ? `, ${profile.university}` : ""}${profile.branch ? `, ${profile.branch}` : ""}${profile.year ? `, year ${profile.year}` : ""}`,
    `Assignments:\n${assignmentLines}`,
    `Payments:\n${paymentLines}`,
  ].join("\n\n");
}

export async function answerQuestion(telegramId, question) {
  const [knowledgeChunks, accountContext] = await Promise.all([
    searchKnowledge(question, 4).catch(() => []),
    backend.getContext(telegramId).catch(() => null),
  ]);

  const knowledgeText = knowledgeChunks.length
    ? knowledgeChunks.map((c) => `- ${c.text}`).join("\n")
    : "(no matching general knowledge found)";

  const userPrompt = [
    `General platform knowledge:\n${knowledgeText}`,
    `Student account data:\n${formatAccountContext(accountContext)}`,
    `Student's question: ${question}`,
  ].join("\n\n---\n\n");

  return chat([
    { role: "system", content: SYSTEM_PROMPT },
    { role: "user", content: userPrompt },
  ]);
}
