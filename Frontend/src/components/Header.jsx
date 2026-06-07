import { Bell, Search, LogOut } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Header() {
  const { user, logout } = useAuth();
  const [showMenu, setShowMenu] = useState(false);
  const navigate = useNavigate();

  function handleLogout() {
    logout();
    navigate("/login");
  }

  const initials = user?.name
    ? user.name.split(" ").map((w) => w[0]).join("").toUpperCase().slice(0, 2)
    : "?";

  return (
    <div className="flex justify-between items-center p-6 bg-white border-b relative">
      <h1 className="text-xl font-semibold">Dashboard</h1>

      <div className="flex items-center gap-4">

        <div className="flex items-center border rounded-lg px-3 py-2">
          <Search size={18} className="text-gray-400" />
          <input placeholder="Search assignments..." className="outline-none ml-2 text-sm" />
        </div>

        <div className="relative">
          <Bell size={20} />
          <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
            3
          </span>
        </div>

        <div className="relative">
          <button
            onClick={() => setShowMenu(!showMenu)}
            className="w-9 h-9 bg-green-500 rounded-full text-white flex items-center justify-center font-semibold text-sm"
          >
            {initials}
          </button>

          {showMenu && (
            <div className="absolute right-0 top-11 bg-white border rounded-xl shadow-lg py-2 w-48 z-50">
              <div className="px-4 py-2 border-b">
                <p className="font-medium text-sm truncate">{user?.name}</p>
                <p className="text-xs text-gray-400 truncate">{user?.email}</p>
              </div>
              <button
                onClick={handleLogout}
                className="w-full flex items-center gap-2 px-4 py-2 text-sm text-red-500 hover:bg-red-50 transition"
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
