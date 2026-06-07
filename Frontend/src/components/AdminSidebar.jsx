import { useNavigate, useLocation } from "react-router-dom";
import { useAdminAuth } from "../context/AdminAuthContext";
import {
  LayoutDashboard,
  ClipboardList,
  Users,
  LogOut,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import logo from "/S.png";

export default function AdminSidebar({ open, setOpen }) {
  const navigate = useNavigate();
  const location = useLocation();
  const { logoutAdmin } = useAdminAuth();

  function handleLogout() {
    logoutAdmin();
    navigate("/admin/login");
  }

  return (
    <div
      className={`bg-gray-900 dark:bg-gray-950 dark:border-r dark:border-gray-800 h-screen shadow-xl transition-all duration-300
      ${open ? "w-64" : "w-20"} flex flex-col`}
    >
      {/* TOP */}
      <div className="flex items-center justify-between px-4 py-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-green-500 rounded-xl flex items-center justify-center">
            <img src={logo} className="w-6" />
          </div>
          {open && (
            <div>
              <span className="font-bold text-white text-lg">Slot</span>
              <p className="text-green-400 text-xs">Admin Panel</p>
            </div>
          )}
        </div>
        <button onClick={() => setOpen(!open)} className="text-gray-400 hover:text-white">
          {open ? <ChevronLeft size={20} /> : <ChevronRight size={20} />}
        </button>
      </div>

      {/* NAV */}
      <div className="flex flex-col gap-1 px-3 flex-1">
        <NavItem
          icon={<LayoutDashboard size={20} />}
          text="Dashboard"
          open={open}
          active={location.pathname === "/admin"}
          onClick={() => navigate("/admin")}
        />
        <NavItem
          icon={<ClipboardList size={20} />}
          text="All Requests"
          open={open}
          active={location.pathname === "/admin/requests"}
          onClick={() => navigate("/admin/requests")}
        />
        <NavItem
          icon={<Users size={20} />}
          text="Students"
          open={open}
          active={location.pathname === "/admin/students"}
          onClick={() => navigate("/admin/students")}
        />
      </div>

      {/* LOGOUT */}
      <div className="px-3 mb-6">
        <button
          onClick={handleLogout}
          className={`w-full flex items-center gap-3 p-3 rounded-lg text-red-400 hover:bg-red-900/30 transition
          ${!open ? "justify-center" : ""}`}
        >
          <LogOut size={20} />
          {open && <span className="text-sm font-medium">Sign out</span>}
        </button>
      </div>
    </div>
  );
}

function NavItem({ icon, text, open, active, onClick }) {
  return (
    <button
      onClick={onClick}
      className={`w-full flex items-center gap-3 p-3 rounded-lg transition
      ${active
        ? "bg-green-600 text-white"
        : "text-gray-400 hover:bg-gray-800 hover:text-white"}
      ${!open ? "justify-center" : ""}`}
    >
      {icon}
      {open && <span className="text-sm font-medium">{text}</span>}
    </button>
  );
}
