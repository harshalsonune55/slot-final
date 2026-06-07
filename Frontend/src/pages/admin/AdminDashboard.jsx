import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  BookOpen, Users, CreditCard, Clock,
  CheckCircle, Activity, IndianRupee, Loader, ArrowRight
} from "lucide-react";
import AdminSidebar from "../../components/AdminSidebar";
import AdminHeader from "../../components/AdminHeader";
import { adminApi } from "../../services/api";

export default function AdminDashboard() {
  const [open, setOpen]     = useState(true);
  const [stats, setStats]   = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate            = useNavigate();

  useEffect(() => {
    adminApi.getStats()
      .then(setStats)
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="bg-gray-100 min-h-screen">
      <div className="fixed left-0 top-0 h-screen z-10">
        <AdminSidebar open={open} setOpen={setOpen} />
      </div>

      <div className={`transition-all duration-300 ${open ? "ml-64" : "ml-20"}`}>
        <AdminHeader title="Dashboard" />

        <div className="p-8 space-y-8">

          {/* WELCOME */}
          <div className="bg-gradient-to-r from-green-600 to-green-700 rounded-2xl p-8 text-white">
            <h2 className="text-2xl font-bold mb-1">Welcome back, Admin</h2>
            <p className="text-green-100">Here's what's happening with your platform today.</p>
            <button
              onClick={() => navigate("/admin/requests")}
              className="mt-5 bg-white text-green-700 font-semibold px-5 py-2 rounded-lg hover:bg-green-50 transition flex items-center gap-2 w-fit"
            >
              View All Requests <ArrowRight size={16} />
            </button>
          </div>

          {loading ? (
            <div className="flex justify-center py-16">
              <Loader size={32} className="text-green-500 animate-spin" />
            </div>
          ) : (
            <>
              {/* STATS GRID */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">
                <StatCard
                  icon={<BookOpen size={24} />}
                  label="Total Assignments"
                  value={stats?.totalAssignments ?? 0}
                  color="bg-blue-100 text-blue-600"
                />
                <StatCard
                  icon={<Users size={24} />}
                  label="Total Students"
                  value={stats?.totalStudents ?? 0}
                  color="bg-purple-100 text-purple-600"
                />
                <StatCard
                  icon={<CheckCircle size={24} />}
                  label="Completed"
                  value={stats?.completed ?? 0}
                  color="bg-green-100 text-green-600"
                />
                <StatCard
                  icon={<IndianRupee size={24} />}
                  label="Total Revenue"
                  value={`₹${(stats?.revenue ?? 0).toLocaleString("en-IN")}`}
                  color="bg-yellow-100 text-yellow-600"
                />
              </div>

              {/* STATUS BREAKDOWN */}
              <div>
                <h2 className="text-lg font-semibold mb-4">Assignment Status Breakdown</h2>
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">
                  <StatusCard label="Pending Payment" count={stats?.pendingPayment ?? 0} color="bg-red-500" />
                  <StatusCard label="Pending Review"  count={stats?.pending       ?? 0} color="bg-orange-400" />
                  <StatusCard label="In Progress"     count={stats?.inProgress    ?? 0} color="bg-blue-500" />
                  <StatusCard label="Completed"       count={stats?.completed     ?? 0} color="bg-green-500" />
                </div>
              </div>

              {/* QUICK ACTIONS */}
              <div>
                <h2 className="text-lg font-semibold mb-4">Quick Actions</h2>
                <div className="grid grid-cols-2 gap-5">
                  <ActionCard
                    title="Review Pending Requests"
                    desc={`${(stats?.pending ?? 0) + (stats?.pendingPayment ?? 0)} requests need your attention`}
                    btn="Open Requests"
                    onClick={() => navigate("/admin/requests")}
                    color="border-l-green-500"
                  />
                  <ActionCard
                    title="In Progress Assignments"
                    desc={`${stats?.inProgress ?? 0} assignments are currently being solved`}
                    btn="View All"
                    onClick={() => navigate("/admin/requests")}
                    color="border-l-blue-500"
                  />
                </div>
              </div>
            </>
          )}

        </div>
      </div>
    </div>
  );
}


function StatCard({ icon, label, value, color }) {
  return (
    <div className="bg-white rounded-xl shadow p-6 flex items-center gap-4">
      <div className={`p-3 rounded-xl ${color}`}>{icon}</div>
      <div>
        <p className="text-gray-500 text-sm">{label}</p>
        <h3 className="text-2xl font-bold mt-0.5">{value}</h3>
      </div>
    </div>
  );
}

function StatusCard({ label, count, color }) {
  return (
    <div className="bg-white rounded-xl shadow p-6">
      <div className={`w-3 h-3 rounded-full ${color} mb-3`} />
      <h3 className="text-3xl font-bold">{count}</h3>
      <p className="text-gray-500 text-sm mt-1">{label}</p>
    </div>
  );
}

function ActionCard({ title, desc, btn, onClick, color }) {
  return (
    <div className={`bg-white rounded-xl shadow p-6 border-l-4 ${color}`}>
      <h3 className="font-semibold text-lg">{title}</h3>
      <p className="text-gray-500 text-sm mt-1 mb-4">{desc}</p>
      <button
        onClick={onClick}
        className="bg-green-600 text-white text-sm px-4 py-2 rounded-lg hover:bg-green-700 transition"
      >
        {btn}
      </button>
    </div>
  );
}
