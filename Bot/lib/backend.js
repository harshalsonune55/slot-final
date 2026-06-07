// Thin client for the Slot backend's bot-only endpoints (/api/bot/*),
// authenticated with the shared bot secret rather than a per-user JWT.
const BASE_URL = process.env.BACKEND_URL || "http://localhost:3001";

async function botFetch(path, options = {}) {
  const res = await fetch(`${BASE_URL}${path}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      "x-bot-secret": process.env.BOT_SHARED_SECRET,
      ...options.headers,
    },
  });

  const data = await res.json();
  if (!res.ok) throw new Error(data.error || "Backend request failed");
  return data;
}

export const backend = {
  link: (code, telegramId) =>
    botFetch("/api/bot/link", { method: "POST", body: JSON.stringify({ code, telegram_id: telegramId }) }),

  getContext: (telegramId) =>
    botFetch(`/api/bot/context/${telegramId}`),

  getAssignments: (telegramId) =>
    botFetch(`/api/bot/assignments/${telegramId}`),

  createAssignment: (telegramId, body) =>
    botFetch("/api/bot/assignments", { method: "POST", body: JSON.stringify({ telegram_id: telegramId, ...body }) }),
};
