import { backend } from "../lib/backend.js";

// Simple step-by-step wizard for submitting a new assignment from chat,
// driven by grammY session state (no extra conversations plugin needed).
const STEPS = ["title", "subject", "description", "deadline"];
const PROMPTS = {
  title: "What's the *title* of your assignment?",
  subject: "Which *subject* is it for? (e.g. Database Systems, Python)",
  description: "Briefly *describe* what needs to be done.",
  deadline: "What's the *deadline*? (e.g. 2026-06-20, or type `skip` if there isn't one)",
};

function resetFlow(ctx) {
  ctx.session.flow = null;
  ctx.session.flowData = {};
}

export function registerNewAssignment(bot) {
  bot.command("new", async (ctx) => {
    ctx.session.flow = "title";
    ctx.session.flowData = {};
    await ctx.reply("Let's submit a new assignment 📝\n\n" + PROMPTS.title, { parse_mode: "Markdown" });
  });

  bot.command("cancel", async (ctx) => {
    if (ctx.session.flow) {
      resetFlow(ctx);
      return ctx.reply("Cancelled.");
    }
    await ctx.reply("Nothing to cancel.");
  });
}

export async function handleNewAssignmentStep(ctx) {
  const step = ctx.session.flow;
  const text = ctx.message.text.trim();
  const stepIndex = STEPS.indexOf(step);

  if (stepIndex === -1) {
    resetFlow(ctx);
    return;
  }

  if (step === "deadline") {
    ctx.session.flowData.deadline = text.toLowerCase() === "skip" ? null : text;
  } else {
    ctx.session.flowData[step] = text;
  }

  const nextStep = STEPS[stepIndex + 1];
  if (nextStep) {
    ctx.session.flow = nextStep;
    return ctx.reply(PROMPTS[nextStep], { parse_mode: "Markdown" });
  }

  // All fields collected — create the assignment.
  ctx.session.flow = null;
  const { title, subject, description, deadline } = ctx.session.flowData;

  try {
    const assignment = await backend.createAssignment(String(ctx.from.id), { title, subject, description, deadline });
    resetFlow(ctx);
    await ctx.reply(
      `✅ Submitted! "${assignment.title}" is now *Pending Payment*.\n\nUse /pay to start the payment once it's been reviewed, or /status to check on it any time.`,
      { parse_mode: "Markdown" }
    );
  } catch (err) {
    resetFlow(ctx);
    const notLinked = err.message.includes("linked");
    await ctx.reply(
      notLinked
        ? "Your Telegram isn't linked to a Slot account yet. Generate a code from your dashboard and send /link <code>, then try /new again."
        : `❌ Couldn't submit your assignment: ${err.message}`
    );
  }
}
