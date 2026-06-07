import { Bell, Search, LogOut, CreditCard, Activity, CheckCircle, Clock, Sun, Moon } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useTheme } from "../context/ThemeContext";
import { api } from "../services/api";

const NOTIF_ICON = {
  "Pending Payment": <CreditCard size={16} className="text-red-500 dark:text-red-400" />,
  "Pending":         <Clock size={16} className="text-orange-500 dark:text-orange-400" />,
  "In Progress":     <Activity size={16} className="text-blue-500 dark:text-blue-400" />,
  "Completed":       <CheckCircle size={16} className="text-green-500 dark:text-green-400" />,
};

const NOTIF_TEXT = {
  "Pending Payment": (title) => `Payment is pending for "${title}"`,
  "Pending":         (title) => `"${title}" was submitted and is awaiting review`,
  "In Progress":     (title) => `Work has started on "${title}"`,
  "Completed":       (title) => `"${title}" is complete — solution ready!`,
};

export default function Header() {
  const { user, logout } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const [showMenu, setShowMenu]   = useState(false);
  const [showNotifs, setShowNotifs] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const [readIds, setReadIds]     = useState(() => {
    try {
      return new Set(JSON.parse(localStorage.getItem("slot_read_notifs") || "[]"));
    } catch {
      return new Set();
    }
  });
  const notifRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    api.getAssignments()
      .then((data) => {
        const items = data.map((a) => ({
          id: `${a._id}:${a.status}`,
          title: a.title,
          status: a.status,
          time: a.updatedAt || a.createdAt,
        }));
        items.sort((a, b) => new Date(b.time) - new Date(a.time));
        setNotifications(items.slice(0, 8));
      })
      .catch(() => {});
  }, []);

  useEffect(() => {
    function handleClickOutside(e) {
      if (notifRef.current && !notifRef.current.contains(e.target)) {
        setShowNotifs(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const unreadCount = notifications.filter((n) => !readIds.has(n.id)).length;

  function persistReadIds(next) {
    setReadIds(next);
    localStorage.setItem("slot_read_notifs", JSON.stringify([...next]));
  }

  function markAsRead(id) {
    persistReadIds(new Set([...readIds, id]));
  }

  function markAllAsRead() {
    persistReadIds(new Set(notifications.map((n) => n.id)));
  }

  function toggleNotifs() {
    setShowNotifs((v) => !v);
    setShowMenu(false);
  }

  function fmtTime(d) {
    if (!d) return "";
    const diffMs = Date.now() - new Date(d).getTime();
    const mins = Math.floor(diffMs / 60000);
    if (mins < 1)   return "just now";
    if (mins < 60)  return `${mins}m ago`;
    const hrs = Math.floor(mins / 60);
    if (hrs < 24)   return `${hrs}h ago`;
    const days = Math.floor(hrs / 24);
    return `${days}d ago`;
  }

  function handleLogout() {
    logout();
    navigate("/login");
  }

  const initials = user?.name
    ? user.name.split(" ").map((w) => w[0]).join("").toUpperCase().slice(0, 2)
    : "?";

  return (
    <div className="flex justify-between items-center p-6 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 relative transition-colors">
      <h1 className="text-xl font-semibold text-gray-900 dark:text-gray-100">Dashboard</h1>

      <div className="flex items-center gap-4">

        <div className="flex items-center border border-gray-300 dark:border-gray-700 rounded-lg px-3 py-2">
          <Search size={18} className="text-gray-400" />
          <input placeholder="Search assignments..." className="outline-none ml-2 text-sm bg-transparent text-gray-900 dark:text-gray-100 dark:placeholder:text-gray-500" />
        </div>

        <button
          onClick={toggleTheme}
          aria-label="Toggle dark mode"
          className="p-2 rounded-lg border border-gray-300 dark:border-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
        >
          {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
        </button>

        <div className="relative" ref={notifRef}>
          <button
            onClick={toggleNotifs}
            className="relative text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-gray-100 transition"
          >
            <Bell size={20} />
            {unreadCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
                {unreadCount > 9 ? "9+" : unreadCount}
              </span>
            )}
          </button>

          {showNotifs && (
            <div className="absolute right-0 top-11 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl shadow-lg w-80 z-50 overflow-hidden">
              <div className="flex items-center justify-between px-4 py-3 border-b border-gray-200 dark:border-gray-800">
                <p className="font-semibold text-sm text-gray-900 dark:text-gray-100">Notifications</p>
                {unreadCount > 0 && (
                  <button
                    onClick={markAllAsRead}
                    className="text-xs text-green-600 dark:text-green-400 hover:underline"
                  >
                    Mark all as read
                  </button>
                )}
              </div>

              <div className="max-h-80 overflow-y-auto">
                {notifications.length === 0 ? (
                  <p className="text-sm text-gray-400 dark:text-gray-500 text-center py-8">No notifications yet</p>
                ) : (
                  notifications.map((n) => (
                    <button
                      key={n.id}
                      onClick={() => {
                        markAsRead(n.id);
                        setShowNotifs(false);
                        navigate("/assignments");
                      }}
                      className={`w-full flex items-start gap-3 px-4 py-3 text-left border-b border-gray-100 dark:border-gray-800/60 last:border-0 transition hover:bg-gray-50 dark:hover:bg-gray-800/60 ${
                        readIds.has(n.id) ? "" : "bg-green-50/60 dark:bg-green-500/5"
                      }`}
                    >
                      <span className="mt-0.5 shrink-0">{NOTIF_ICON[n.status] || <Bell size={16} className="text-gray-400" />}</span>
                      <span className="flex-1 min-w-0">
                        <span className="block text-sm text-gray-700 dark:text-gray-300 line-clamp-2">
                          {(NOTIF_TEXT[n.status] || ((t) => `Update on "${t}"`))(n.title)}
                        </span>
                        <span className="block text-xs text-gray-400 dark:text-gray-500 mt-1">{fmtTime(n.time)}</span>
                      </span>
                      {!readIds.has(n.id) && (
                        <span className="mt-1.5 w-2 h-2 rounded-full bg-green-500 shrink-0" />
                      )}
                    </button>
                  ))
                )}
              </div>
            </div>
          )}
        </div>

        <div className="relative">
          <button
            onClick={() => { setShowMenu(!showMenu); setShowNotifs(false); }}
            className="w-9 h-9 bg-green-500 rounded-full text-white flex items-center justify-center font-semibold text-sm"
          >
            {initials}
          </button>

          {showMenu && (
            <div className="absolute right-0 top-11 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl shadow-lg py-2 w-48 z-50">
              <div className="px-4 py-2 border-b border-gray-200 dark:border-gray-800">
                <p className="font-medium text-sm truncate text-gray-900 dark:text-gray-100">{user?.name}</p>
                <p className="text-xs text-gray-400 truncate">{user?.email}</p>
              </div>
              <button
                onClick={handleLogout}
                className="w-full flex items-center gap-2 px-4 py-2 text-sm text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10 transition"
              >
                <LogOut size={15} />
                Sign out
              </button>
            </div>
          )}
        </div>

      </div>
    </div>
  );
}
