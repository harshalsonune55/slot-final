import { useNavigate } from "react-router-dom";

const COLUMNS = [
  {
    title: "Product",
    links: [
      { label: "Solutions", path: "/solutions" },
      { label: "Pricing",   path: "/pricing" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "Developers", path: "/developers" },
      { label: "Blog",       path: "/blog" },
    ],
  },
  {
    title: "Get started",
    links: [
      { label: "Sign in",  path: "/login" },
      { label: "Register", path: "/register" },
    ],
  },
];

export default function PublicFooter() {
  const navigate = useNavigate();

  return (
    <footer className="relative border-t border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-950 transition-colors">
      <div className="max-w-6xl mx-auto px-6 py-12 grid grid-cols-2 md:grid-cols-4 gap-8">
        <div className="col-span-2 md:col-span-1">
          <span className="text-xl font-bold text-green-500">Slot</span>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-3 max-w-xs">
            Your trusted tech assignment partner — helping students ship great work, on time.
          </p>
        </div>

        {COLUMNS.map((col) => (
          <div key={col.title}>
            <p className="text-sm font-semibold text-gray-900 dark:text-gray-100 mb-3">{col.title}</p>
            <ul className="space-y-2">
              {col.links.map((l) => (
                <li key={l.label}>
                  <button
                    onClick={() => navigate(l.path)}
                    className="text-sm text-gray-500 dark:text-gray-400 hover:text-green-500 transition-colors"
                  >
                    {l.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="border-t border-gray-200 dark:border-gray-800">
        <div className="max-w-6xl mx-auto px-6 py-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-sm text-gray-500 dark:text-gray-400">
          <p>© 2026 Slot. All rights reserved.</p>
          <p>
            Questions? Reach us at{" "}
            <a href="mailto:md.firoz.alam@slotuae.com" className="text-green-600 dark:text-green-400 font-medium hover:underline">
              md.firoz.alam@slotuae.com
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
