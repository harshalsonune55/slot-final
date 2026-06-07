import { useState } from "react";
import logo from "/S.png";
import { useNavigate } from "react-router-dom";
import { Sun, Moon, Menu, X } from "lucide-react";
import { useTheme } from "../context/ThemeContext";

const links = [
  { label: "Developers", path: "/developers" },
  { label: "Solutions",  path: "/solutions" },
  { label: "Pricing",    path: "/pricing" },
  { label: "Blog",       path: "/blog" },
];

export default function Navbar() {

  const navigate = useNavigate();
  const { theme, toggleTheme } = useTheme();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="relative bg-white dark:bg-gray-950 transition-colors">

      <div className="flex justify-between items-center px-4 sm:px-6 lg:px-12 py-4 sm:py-6">

        {/* Logo */}
        <div className="flex items-center gap-2 sm:gap-3 cursor-pointer" onClick={() => navigate("/")}>
          <img src={logo} alt="Slot Logo" className="w-7 h-7 sm:w-8 sm:h-8" />
          <span className="text-xl sm:text-2xl font-bold text-green-500">
            Slot
          </span>
        </div>

        {/* Links */}
        <div className="hidden lg:flex gap-8 text-gray-600 dark:text-gray-300 absolute left-1/2 -translate-x-1/2">
          {links.map((link) => (
            <button key={link.label} onClick={() => navigate(link.path)} className="hover:text-green-500">{link.label}</button>
          ))}
        </div>

        {/* Buttons */}
        <div className="hidden md:flex gap-3 lg:gap-4 items-center">

          <button
            onClick={toggleTheme}
            aria-label="Toggle dark mode"
            className="p-2 rounded-lg border border-gray-300 dark:border-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
          >
            {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
          </button>

          <button
            onClick={() => navigate("/login")}
            className="border border-gray-300 dark:border-gray-700 px-3 lg:px-4 py-2 rounded-lg text-sm lg:text-base text-gray-900 dark:text-gray-100 hover:bg-gray-100 dark:hover:bg-gray-800"
          >
            Sign in
          </button>

          <button
            onClick={() => navigate("/register")}
            className="bg-green-500 text-white px-3 lg:px-4 py-2 rounded-lg text-sm lg:text-base font-semibold hover:bg-green-600"
          >
            Start your project
          </button>

        </div>

        {/* Mobile controls */}
        <div className="flex md:hidden items-center gap-2">
          <button
            onClick={toggleTheme}
            aria-label="Toggle dark mode"
            className="p-2 rounded-lg border border-gray-300 dark:border-gray-700 text-gray-600 dark:text-gray-300"
          >
            {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
          </button>
          <button
            onClick={() => setMenuOpen((o) => !o)}
            aria-label="Toggle menu"
            className="p-2 rounded-lg border border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-200"
          >
            {menuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

      </div>

      {/* Mobile menu panel */}
      {menuOpen && (
        <div className="md:hidden flex flex-col gap-4 px-4 sm:px-6 pb-6 text-gray-600 dark:text-gray-300 border-t border-gray-100 dark:border-gray-800">
          {links.map((link) => (
            <button
              key={link.label}
              className="pt-4 text-left hover:text-green-500"
              onClick={() => { setMenuOpen(false); navigate(link.path); }}
            >
              {link.label}
            </button>
          ))}

          <div className="flex flex-col gap-3 pt-2">
            <button
              onClick={() => { setMenuOpen(false); navigate("/login"); }}
              className="border border-gray-300 dark:border-gray-700 px-4 py-2 rounded-lg text-gray-900 dark:text-gray-100 hover:bg-gray-100 dark:hover:bg-gray-800"
            >
              Sign in
            </button>
            <button
              onClick={() => { setMenuOpen(false); navigate("/register"); }}
              className="bg-green-500 text-white px-4 py-2 rounded-lg font-semibold hover:bg-green-600"
            >
              Start your project
            </button>
          </div>
        </div>
      )}

    </nav>
  );
}
