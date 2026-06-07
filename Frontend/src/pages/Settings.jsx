import { useState } from "react";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { useAuth } from "../context/AuthContext";
import { useTheme } from "../context/ThemeContext";
import { Sun, Moon, User, Mail, Bell, Lock } from "lucide-react";

export default function Settings() {
  const [open, setOpen] = useState(true);
  const { user } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const [emailNotifs, setEmailNotifs] = useState(true);

  return (
    <div className="bg-gray-100 dark:bg-gray-950 min-h-screen transition-colors">
      <div className="fixed left-0 top-0 h-screen">
        <Sidebar open={open} setOpen={setOpen} />
      </div>

      <div className={`transition-all duration-300 ${open ? "ml-64" : "ml-20"}`}>
        <Header />

        <div className="p-8 max-w-3xl space-y-8">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">Settings</h1>
            <p className="text-gray-500 dark:text-gray-400 mt-1">Manage your account preferences and appearance.</p>
          </div>

          {/* PROFILE */}
          <section className="bg-white dark:bg-gray-900 rounded-xl shadow p-6">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">Profile</h2>
            <div className="space-y-3">
              <div className="flex items-center gap-3 text-sm">
                <User size={16} className="text-gray-400" />
                <span className="text-gray-500 dark:text-gray-400 w-24">Name</span>
                <span className="text-gray-900 dark:text-gray-100 font-medium">{user?.name || "—"}</span>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <Mail size={16} className="text-gray-400" />
                <span className="text-gray-500 dark:text-gray-400 w-24">Email</span>
                <span className="text-gray-900 dark:text-gray-100 font-medium">{user?.email || "—"}</span>
              </div>
            </div>
          </section>

          {/* APPEARANCE */}
          <section className="bg-white dark:bg-gray-900 rounded-xl shadow p-6">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">Appearance</h2>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-900 dark:text-gray-100">Theme</p>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Currently using {theme === "dark" ? "dark" : "light"} mode.
                </p>
              </div>
              <button
                onClick={toggleTheme}
                className="flex items-center gap-2 px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors text-sm font-medium"
              >
                {theme === "dark" ? <Sun size={16} /> : <Moon size={16} />}
                Switch to {theme === "dark" ? "light" : "dark"} mode
              </button>
            </div>
          </section>

          {/* NOTIFICATIONS */}
          <section className="bg-white dark:bg-gray-900 rounded-xl shadow p-6">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">Notifications</h2>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Bell size={18} className="text-gray-400" />
                <div>
                  <p className="text-sm font-medium text-gray-900 dark:text-gray-100">Email notifications</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Get updates about your assignments by email.</p>
                </div>
              </div>
              <button
                onClick={() => setEmailNotifs((v) => !v)}
                className={`relative w-11 h-6 rounded-full transition-colors ${emailNotifs ? "bg-green-500" : "bg-gray-300 dark:bg-gray-700"}`}
              >
                <span className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow transition-transform ${emailNotifs ? "translate-x-5" : ""}`} />
              </button>
            </div>
          </section>

          {/* SECURITY */}
          <section className="bg-white dark:bg-gray-900 rounded-xl shadow p-6">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">Security</h2>
            <div className="flex items-center gap-3">
              <Lock size={18} className="text-gray-400" />
              <div>
                <p className="text-sm font-medium text-gray-900 dark:text-gray-100">Password</p>
                <p className="text-sm text-gray-500 dark:text-gray-400">Password changes are managed via your account provider.</p>
              </div>
            </div>
          </section>
        </div>

        <Footer />
      </div>
    </div>
  );
}
