import { useState } from "react";
import Navbar from "../components/Navbar";
import PublicFooter from "../components/PublicFooter";
import { Code, Send, CheckCircle } from "lucide-react";

const ROLES = [
  "Frontend Developer",
  "Backend Developer",
  "Full-Stack Developer",
  "Mobile Developer",
  "Data Scientist / ML Engineer",
  "QA / Test Engineer",
];

export default function Developers() {
  const [form, setForm] = useState({ name: "", email: "", role: ROLES[0], portfolio: "", message: "" });
  const [submitted, setSubmitted] = useState(false);

  function handleChange(e) {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    setSubmitted(true);
  }

  return (
    <div className="min-h-screen bg-white dark:bg-gray-950 text-gray-900 dark:text-gray-100 transition-colors">
      <Navbar />

      <div className="max-w-3xl mx-auto px-6 py-16">
        <span className="bg-green-100 dark:bg-green-500/15 text-green-600 dark:text-green-400 px-3 py-1 rounded-full text-sm">
          Join our network
        </span>
        <h1 className="text-3xl sm:text-4xl font-bold mt-4">
          Work with <span className="text-green-500">Slot</span> as a developer
        </h1>
        <p className="text-gray-500 dark:text-gray-400 mt-3 max-w-xl">
          We're always looking for skilled developers to help students bring their assignments and projects to life.
          Tell us about yourself and request a role below.
        </p>

        <div className="grid sm:grid-cols-3 gap-4 mt-8">
          <Perk icon={<Code size={20} />} title="Real projects" desc="Work on a steady stream of varied tech assignments." />
          <Perk icon={<CheckCircle size={20} />} title="Flexible hours" desc="Pick up requests that fit your schedule." />
          <Perk icon={<Send size={20} />} title="Fast payouts" desc="Get paid promptly for completed work." />
        </div>

        {submitted ? (
          <div className="mt-10 bg-green-50 dark:bg-green-500/10 border border-green-200 dark:border-green-500/20 rounded-xl p-8 text-center">
            <CheckCircle size={36} className="mx-auto text-green-500 mb-3" />
            <h2 className="text-xl font-semibold">Thanks, {form.name.split(" ")[0] || "there"}!</h2>
            <p className="text-gray-500 dark:text-gray-400 mt-2">
              Your request for the <span className="font-medium text-gray-900 dark:text-gray-100">{form.role}</span> role has been received.
              Our team will reach out to you at <span className="font-medium text-gray-900 dark:text-gray-100">{form.email}</span>.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="mt-10 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl p-6 sm:p-8 space-y-5">
            <h2 className="text-lg font-semibold">Request a job</h2>

            <div className="grid sm:grid-cols-2 gap-5">
              <Field label="Full name">
                <input
                  required
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  placeholder="Jane Doe"
                  className="w-full border border-gray-300 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-100 rounded-lg px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-green-400"
                />
              </Field>
              <Field label="Email">
                <input
                  required
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder="jane@example.com"
                  className="w-full border border-gray-300 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-100 rounded-lg px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-green-400"
                />
              </Field>
            </div>

            <Field label="Role you're interested in">
              <select
                name="role"
                value={form.role}
                onChange={handleChange}
                className="w-full border border-gray-300 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-100 rounded-lg px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-green-400"
              >
                {ROLES.map((r) => <option key={r}>{r}</option>)}
              </select>
            </Field>

            <Field label="Portfolio / GitHub / LinkedIn">
              <input
                name="portfolio"
                value={form.portfolio}
                onChange={handleChange}
                placeholder="https://github.com/yourname"
                className="w-full border border-gray-300 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-100 rounded-lg px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-green-400"
              />
            </Field>

            <Field label="Tell us about yourself">
              <textarea
                name="message"
                value={form.message}
                onChange={handleChange}
                rows={4}
                placeholder="Your experience, the tech stacks you're comfortable with, and why you'd like to join..."
                className="w-full border border-gray-300 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-100 rounded-lg px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-green-400 resize-none"
              />
            </Field>

            <button
              type="submit"
              className="bg-green-500 hover:bg-green-600 text-white px-6 py-2.5 rounded-lg font-semibold transition flex items-center gap-2"
            >
              <Send size={16} />
              Submit request
            </button>
          </form>
        )}
      </div>

      <PublicFooter />
    </div>
  );
}

function Perk({ icon, title, desc }) {
  return (
    <div className="bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl p-5">
      <div className="w-10 h-10 rounded-lg bg-green-100 dark:bg-green-500/15 text-green-600 dark:text-green-400 flex items-center justify-center mb-3">
        {icon}
      </div>
      <p className="font-semibold text-sm">{title}</p>
      <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">{desc}</p>
    </div>
  );
}

function Field({ label, children }) {
  return (
    <label className="block">
      <span className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">{label}</span>
      {children}
    </label>
  );
}
