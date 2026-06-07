const BASE_URL = import.meta.env.VITE_BACKEND_URL || "http://localhost:3001";

function getToken() {
  return localStorage.getItem("slot_token");
}

function getAdminToken() {
  return localStorage.getItem("admin_token");
}

async function apiFetch(path, options = {}, token) {
  const isFormData = options.body instanceof FormData;

  const headers = {
    ...(!isFormData && { "Content-Type": "application/json" }),
    ...(token && { Authorization: `Bearer ${token}` }),
  };

  const res = await fetch(`${BASE_URL}${path}`, { ...options, headers });
  const data = await res.json();

  if (!res.ok) throw new Error(data.error || "Request failed");
  return data;
}

// Student API
export const api = {
  register:         (body)     => apiFetch("/api/auth/register", { method: "POST", body: JSON.stringify(body) }),
  login:            (body)     => apiFetch("/api/auth/login",    { method: "POST", body: JSON.stringify(body) }),
  getMe:            ()         => apiFetch("/api/auth/me", {}, getToken()),

  getAssignments:   ()         => apiFetch("/api/assignments", {}, getToken()),
  getAssignment:    (id)       => apiFetch(`/api/assignments/${id}`, {}, getToken()),
  createAssignment: (formData) => apiFetch("/api/assignments", { method: "POST", body: formData }, getToken()),

  createOrder:      (body)     => apiFetch("/api/payment/create-order", { method: "POST", body: JSON.stringify(body) }, getToken()),
  verifyPayment:    (body)     => apiFetch("/api/payment/verify",        { method: "POST", body: JSON.stringify(body) }, getToken()),
  getPayments:      ()         => apiFetch("/api/payment", {}, getToken()),

  generateBotLinkCode: ()      => apiFetch("/api/bot/link-code", { method: "POST" }, getToken()),
};

// Admin API
export const adminApi = {
  login:          (body)         => apiFetch("/api/admin/login", { method: "POST", body: JSON.stringify(body) }),
  getStats:       ()             => apiFetch("/api/admin/stats", {}, getAdminToken()),
  getAssignments: ()             => apiFetch("/api/admin/assignments", {}, getAdminToken()),
  updateStatus:   (id, status)   => apiFetch(`/api/admin/assignments/${id}/status`, { method: "PUT", body: JSON.stringify({ status }) }, getAdminToken()),
  getUsers:       ()             => apiFetch("/api/admin/users", {}, getAdminToken()),
};
