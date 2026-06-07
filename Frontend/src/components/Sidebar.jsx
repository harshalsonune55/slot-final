import logo from "/S.png";
import { useNavigate, useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  FileText,
  BookOpen,
  CreditCard,
  Clock,
  CheckCircle,
  Settings,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

export default function Sidebar({ open, setOpen }) {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <div
      className={`bg-white h-screen shadow transition-all duration-300
      ${open ? "w-64" : "w-20"} flex flex-col`}
    >
      {/* TOP */}
      <div className="flex items-center justify-between px-4 py-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-green-500 rounded-xl flex items-center justify-center">
            <img src={logo} className="w-6" />
          </div>
          {open && <span className="font-bold text-green-600 text-lg">Slot</span>}
        </div>
        <button onClick={() => setOpen(!open)} className="text-gray-500">
          {open ? <ChevronLeft size={20} /> : <ChevronRight size={20} />}
        </button>
      </div>

      {/* MAIN NAV */}
      <div className="flex flex-col gap-2 px-3">
        <NavItem
          icon={<LayoutDashboard size={20} />}
          text="Dashboard"
          open={open}
          active={location.pathname === "/Dashboard"}
          onClick={() => navigate("/Dashboard")}
        />
        <NavItem
          icon={<FileText size={20} />}
          text="Submit Assignment"
          open={open}
          active={location.pathname === "/submit"}
          onClick={() => navigate("/submit")}
        />
        <NavItem
          icon={<BookOpen size={20} />}
          text="My Assignments"
          open={open}
          active={location.pathname === "/assignments"}
          onClick={() => navigate("/assignments")}
        />
        <NavItem
          icon={<CreditCard size={20} />}
          text="Payments"
          open={open}
          active={location.pathname === "/payment"}
          onClick={() => navigate("/payment")}
        />
      </div>

      {/* STATUS */}
      <div className="mt-6 flex flex-col gap-2 px-3">
        <NavItem
          icon={<Clock size={20} />}
          text="Pending"
          open={open}
          onClick={() => navigate("/assignments")}
        />
        <NavItem
          icon={<CheckCircle size={20} />}
          text="Completed"
          open={open}
          onClick={() => navigate("/assignments")}
        />
      </div>

      {/* SETTINGS */}
      <div className="mt-auto px-3 mb-6">
        <NavItem icon={<Settings size={20} />} text="Settings" open={open} />
      </div>
    </div>
  );
}

function NavItem({ icon, text, open, active, onClick }) {
  return (
    <div
      onClick={onClick}
      className={`flex items-center gap-3 p-3 rounded-lg cursor-pointer
      ${active ? "bg-green-100 text-green-600" : "text-gray-600 hover:bg-gray-100"}`}
    >
      {icon}
      {open && <span className="text-sm font-medium">{text}</span>}
    </div>
  );
}
