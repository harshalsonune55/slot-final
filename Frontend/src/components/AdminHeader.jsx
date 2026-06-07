import { Shield, LogOut } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAdminAuth } from "../context/AdminAuthContext";

export default function AdminHeader({ title = "Admin Panel" }) {
  const { logoutAdmin } = useAdminAuth();
  const navigate = useNavigate();

  function handleLogout() {
    logoutAdmin();
    navigate("/admin/login");
  }

  return (
    <div className="flex justify-between items-center px-8 py-5 bg-white border-b shadow-sm">
      <div className="flex items-center gap-2">
        <Shield size={20} className="text-green-600" />
        <h1 className="text-xl font-semibold text-gray-800">{title}</h1>
      </div>

      <button
        onClick={handleLogout}
        className="flex items-center gap-2 text-sm text-red-500 hover:bg-red-50 px-3 py-2 rounded-lg transition"
      >
        <LogOut size={16} />
        Sign out
      </button>
    </div>
  );
}
