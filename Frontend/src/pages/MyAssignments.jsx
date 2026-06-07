import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "../services/api";
import { BookOpen, Clock, CheckCircle, CreditCard, Loader } from "lucide-react";

export default function MyAssignments() {
  const [open, setOpen]             = useState(true);
  const [assignments, setAssignments] = useState([]);
  const [loading, setLoading]       = useState(true);
  const [error, setError]           = useState("");

  useEffect(() => {
    api.getAssignments()
      .then(setAssignments)
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="bg-gray-100 min-h-screen">
      <div className="fixed left-0 top-0 h-screen">
        <Sidebar open={open} setOpen={setOpen} />
      </div>

      <div className={`transition-all duration-300 ${open ? "ml-64" : "ml-20"}`}>
        <Header />

        <div className="p-8">
          <div className="flex items-center gap-3 mb-8">
            <div className="bg-green-100 text-green-600 p-3 rounded-lg">
              <BookOpen size={22} />
            </div>
            <h1 className="text-2xl font-semibold">My Assignments</h1>
          </div>

          {loading ? (
            <div className="flex justify-center py-20">
              <Loader size={32} className="text-green-500 animate-spin" />
            </div>
          ) : error ? (
            <div className="bg-red-50 border border-red-200 text-red-600 rounded-xl p-6 text-center">
              {error}
            </div>
          ) : assignments.length === 0 ? (
            <div className="bg-white rounded-xl shadow p-16 text-center">
              <BookOpen size={48} className="mx-auto text-gray-300 mb-4" />
              <h3 className="text-lg font-semibold text-gray-600">No assignments yet</h3>
              <p className="text-gray-400 mt-1">Submit your first assignment to get started.</p>
            </div>
          ) : (
            <div className="space-y-4">
              {assignments.map((a) => (
                <AssignmentCard key={a._id} assignment={a} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}


function AssignmentCard({ assignment }) {
  const navigate = useNavigate();
  const { _id, title, subject, deadline, status, createdAt } = assignment;

  const statusConfig = {
    "Pending Payment": { color: "bg-red-100 text-red-600",      icon: <CreditCard size={15} /> },
    "Pending":         { color: "bg-orange-100 text-orange-600", icon: <Clock size={15} /> },
    "In Progress":     { color: "bg-blue-100 text-blue-600",    icon: <Clock size={15} /> },
    "Completed":       { color: "bg-green-100 text-green-600",  icon: <CheckCircle size={15} /> },
  };

  const cfg = statusConfig[status] || statusConfig["Pending"];

  const fmt = (d) => new Date(d).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" });

  return (
    <div className="bg-white rounded-xl shadow p-6 flex justify-between items-center">

      <div>
        <h3 className="font-semibold text-lg">{title}</h3>
        <div className="flex gap-3 text-sm text-gray-500 mt-2 flex-wrap">
          <span className="bg-gray-100 px-2 py-1 rounded">{subject || "—"}</span>
          <span>Submitted {fmt(createdAt)}</span>
          {deadline && <span>Due {fmt(deadline)}</span>}
        </div>
      </div>

      <div className="flex items-center gap-3">
        {status === "Pending Payment" && (
          <button
            onClick={() => navigate(`/payment?id=${_id}`)}
            className="bg-green-600 text-white text-sm px-4 py-2 rounded-lg hover:bg-green-700 transition"
          >
            Pay Now
          </button>
        )}
        <div className={`flex items-center gap-2 px-3 py-1 rounded-full text-sm ${cfg.color}`}>
          {cfg.icon}
          {status}
        </div>
      </div>

    </div>
  );
}
