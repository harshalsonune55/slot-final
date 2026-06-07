import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import PublicFooter from "../components/PublicFooter";
import { Check } from "lucide-react";

const PLANS = [
  {
    name: "Starter",
    price: 49,
    tagline: "For quick, single assignments",
    features: [
      "1 assignment at a time",
      "Standard turnaround",
      "Email support",
      "Plagiarism-free guarantee",
    ],
    highlight: false,
  },
  {
    name: "Pro",
    price: 99,
    tagline: "For students with regular coursework",
    features: [
      "Up to 3 assignments at a time",
      "Priority turnaround",
      "Live chat & WhatsApp support",
      "Plagiarism-free guarantee",
      "Free revisions",
    ],
    highlight: true,
  },
  {
    name: "Premium",
    price: 199,
    tagline: "For complex, full-stack projects",
    features: [
      "Unlimited assignments",
      "Fastest turnaround",
      "Dedicated developer",
      "Plagiarism-free guarantee",
      "Free revisions",
      "Code walkthrough call",
    ],
    highlight: false,
  },
];

export default function Pricing() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-white dark:bg-gray-950 text-gray-900 dark:text-gray-100 transition-colors">
      <Navbar />

      <div className="max-w-6xl mx-auto px-6 py-16">
        <div className="text-center max-w-2xl mx-auto">
          <span className="bg-green-100 dark:bg-green-500/15 text-green-600 dark:text-green-400 px-3 py-1 rounded-full text-sm">
            Simple pricing
          </span>
          <h1 className="text-3xl sm:text-4xl font-bold mt-4">
            Pricing that fits your <span className="text-green-500">workload</span>
          </h1>
          <p className="text-gray-500 dark:text-gray-400 mt-3">
            Transparent, per-assignment pricing in AED — no hidden fees, no subscriptions required to get started.
          </p>
        </div>

        <div className="grid sm:grid-cols-3 gap-6 mt-12">
          {PLANS.map((plan) => (
            <div
              key={plan.name}
              className={`rounded-2xl p-7 border transition-colors flex flex-col ${
                plan.highlight
                  ? "border-green-500 bg-green-50 dark:bg-green-500/10 shadow-lg"
                  : "border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-900"
              }`}
            >
              {plan.highlight && (
                <span className="self-start bg-green-500 text-white text-xs font-semibold px-3 py-1 rounded-full mb-4">
                  Most popular
                </span>
              )}
              <h2 className="text-lg font-semibold">{plan.name}</h2>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">{plan.tagline}</p>

              <div className="mt-5">
                <span className="text-3xl font-bold">AED {plan.price}</span>
                <span className="text-sm text-gray-500 dark:text-gray-400"> / assignment</span>
              </div>

              <ul className="mt-6 space-y-2.5 flex-1">
                {plan.features.map((f) => (
                  <li key={f} className="flex items-start gap-2 text-sm text-gray-600 dark:text-gray-300">
                    <Check size={16} className="text-green-500 mt-0.5 shrink-0" />
                    {f}
                  </li>
                ))}
              </ul>

              <button
                onClick={() => navigate("/register")}
                className={`mt-7 w-full px-5 py-2.5 rounded-lg font-semibold transition ${
                  plan.highlight
                    ? "bg-green-500 hover:bg-green-600 text-white"
                    : "border border-gray-300 dark:border-gray-700 text-gray-900 dark:text-gray-100 hover:bg-gray-100 dark:hover:bg-gray-800"
                }`}
              >
                Get started
              </button>
            </div>
          ))}
        </div>

        <p className="text-center text-sm text-gray-500 dark:text-gray-400 mt-10">
          Need something custom? <a href="mailto:support@solveit.com" className="text-green-600 dark:text-green-400 font-medium hover:underline">Contact us</a> for a tailored quote.
        </p>
      </div>

      <PublicFooter />
    </div>
  );
}
