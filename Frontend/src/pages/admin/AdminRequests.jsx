import { useEffect, useState } from "react";
import AdminSidebar from "../../components/AdminSidebar";
import AdminHeader from "../../components/AdminHeader";
import { adminApi } from "../../services/api";
import {
  ClipboardList, Loader, CheckCircle, Clock,
  CreditCard, Activity, User, Phone, Mail,
  GraduationCap, Calendar, ChevronDown
} from "lucide-react";

const STATUSES = ["Pending Payment", "Pending", "In Progress", "Completed"];

const STATUS_STYLE = {
  "Pending Payment": "bg-red-100 dark:bg-red-500/15 text-red-600 dark:text-red-400",
  "Pending":         "bg-orange-100 dark:bg-orange-500/15 text-orange-600 dark:text-orange-400",
  "In Progress":     "bg-blue-100 dark:bg-blue-500/15 text-blue-600 dark:text-blue-400",
  "Completed":       "bg-green-100 dark:bg-green-500/15 text-green-600 dark:text-green-400",
};

const STATUS_ICON = {
  "Pending Payment": <CreditCard size={13} />,
  "Pending":         <Clock size={13} />,
  "In Progress":     <Activity size={13} />,
  "Completed":       <CheckCircle size={13} />,
};

export default function AdminRequests() {
  const [open, setOpen]             = useState(true);
  const [assignments, setAssignments] = useState([]);
  const [loading, setLoading]       = useState(true);
  const [filter, setFilter]         = useState("All");
  const [search, setSearch]         = useState("");
  const [updating, setUpdating]     = useState(null); // id being updated

  useEffect(() => {
    adminApi.getAssignments()
      .then(setAssignments)
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  async function handleStatusChange(id, status) {
    setUpdating(id);
    try {
      const updated = await adminApi.updateStatus(id, status);
      setAssignments((prev) =>
        prev.map((a) => (a._id === id ? { ...a, status: updated.status } : a))
      );
    } catch (err) {
      alert(err.message);
    } finally {
      setUpdating(null);
    }
  }

  const filtered = assignments.filter((a) => {
    const matchStatus = filter === "All" || a.status === filter;
    const matchSearch =
      a.title.toLowerCase().includes(search.toLowerCase()) ||
      a.user?.name?.toLowerCase().includes(search.toLowerCase()) ||
      a.user?.email?.toLowerCase().includes(search.toLowerCase());
    return matchStatus && matchSearch;
  });

  return (
    <div className="bg-gray-100 dark:bg-gray-950 min-h-screen transition-colors">
      <div className="fixed left-0 top-0 h-screen z-10">
        <AdminSidebar open={open} setOpen={setOpen} />
      </div>

      <div className={`transition-all duration-300 ${open ? "ml-64" : "ml-20"}`}>
        <AdminHeader title="All Requests" />

        <div className="p-8">

          {/* HEADER ROW */}
          <div className="flex items-center justify-between mb-6 flex-wrap gap-4">
            <div className="flex items-center gap-3">
              <div className="bg-green-100 dark:bg-green-500/15 text-green-600 dark:text-green-400 p-3 rounded-lg">
                <ClipboardList size={22} />
              </div>
              <div>
                <h1 className="text-xl font-semibold text-gray-900 dark:text-gray-100">Assignment Requests</h1>
                <p className="text-gray-500 dark:text-gray-400 text-sm">{assignments.length} total requests</p>
              </div>
            </div>

            <div className="flex gap-3 flex-wrap">
              {/* Search */}
              <input
                type="text"
                placeholder="Search by title or student..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="border border-gray-300 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-100 dark:placeholder:text-gray-500 rounded-lg px-4 py-2 text-sm outline-none focus:ring-2 focus:ring-green-400 w-64"
              />

              {/* Filter */}
              <select
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
                className="border border-gray-300 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-100 rounded-lg px-4 py-2 text-sm outline-none focus:ring-2 focus:ring-green-400"
              >
                <option value="All">All Status</option>
                {STATUSES.map((s) => <option key={s}>{s}</option>)}
              </select>
            </div>
          </div>

          {/* LIST */}
          {loading ? (
            <div className="flex justify-center py-20">
              <Loader size={32} className="text-green-500 animate-spin" />
            </div>
          ) : filtered.length === 0 ? (
            <div className="bg-white dark:bg-gray-900 rounded-xl shadow p-16 text-center">
              <ClipboardList size={48} className="mx-auto text-gray-300 dark:text-gray-700 mb-4" />
              <p className="text-gray-500 dark:text-gray-400">No requests found.</p>
            </div>
          ) : (
            <div className="space-y-4">
              {filtered.map((a) => (
                <RequestCard
                  key={a._id}
                  assignment={a}
                  onStatusChange={handleStatusChange}
                  isUpdating={updating === a._id}
                />
              ))}
            </div>
          )}

        </div>
      </div>
    </div>
  );
}


function RequestCard({ assignment, onStatusChange, isUpdating }) {
  const { _id, title, subject, description, deadline, status, createdAt, user, payment, files } = assignment;
  const [expanded, setExpanded] = useState(false);

  const fmt = (d) =>
    new Date(d).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" });

  return (
    <div className="bg-white dark:bg-gray-900 rounded-xl shadow overflow-hidden">

      {/* MAIN ROW */}
      <div className="p-6">
        <div className="flex items-start justify-between gap-4 flex-wrap">

          {/* LEFT — assignment info */}
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-3 mb-2 flex-wrap">
              <h3 className="font-semibold text-lg text-gray-900 dark:text-gray-100">{title}</h3>
              <span className="bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 text-xs px-2 py-1 rounded-full">{subject}</span>
            </div>

            <p className="text-gray-500 dark:text-gray-400 text-sm line-clamp-2 mb-3">{description}</p>

            <div className="flex gap-4 text-xs text-gray-400 dark:text-gray-500 flex-wrap">
              <span className="flex items-center gap-1">
                <Calendar size={12} />
                Submitted {fmt(createdAt)}
              </span>
              {deadline && (
                <span className="flex items-center gap-1">
                  <Clock size={12} />
                  Due {fmt(deadline)}
                </span>
              )}
              {payment && (
                <span className={`flex items-center gap-1 font-medium ${
                  payment.status === "paid" ? "text-green-600 dark:text-green-400" : "text-red-500 dark:text-red-400"
                }`}>
                  <CreditCard size={12} />
                  Payment: {payment.status === "paid"
                    ? `Paid AED ${Math.round(payment.amount / 100)}`
                    : "Unpaid"}
                </span>
              )}
            </div>
          </div>

          {/* RIGHT — status + controls */}
          <div className="flex flex-col items-end gap-3 shrink-0">

            {/* Current status badge */}
            <div className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-medium ${STATUS_STYLE[status]}`}>
              {STATUS_ICON[status]}
              {status}
            </div>

            {/* Status update dropdown */}
            <div className="relative">
              <select
                value={status}
                onChange={(e) => onStatusChange(_id, e.target.value)}
                disabled={isUpdating}
                className="border border-gray-300 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-100 rounded-lg pl-3 pr-8 py-2 text-sm outline-none focus:ring-2 focus:ring-green-400 appearance-none cursor-pointer disabled:opacity-50"
              >
                {STATUSES.map((s) => (
                  <option key={s} value={s}>{s}</option>
                ))}
              </select>
              <ChevronDown size={14} className="absolute right-2 top-3 text-gray-400 pointer-events-none" />
            </div>

            {isUpdating && (
              <span className="text-xs text-green-600 dark:text-green-400 flex items-center gap-1">
                <Loader size={12} className="animate-spin" /> Updating...
              </span>
            )}

            <button
              onClick={() => setExpanded(!expanded)}
              className="text-xs text-green-600 dark:text-green-400 hover:underline"
            >
              {expanded ? "Hide details" : "View details"}
            </button>
          </div>

        </div>
      </div>

      {/* EXPANDED — student details */}
      {expanded && (
        <div className="border-t border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-800/50 px-6 py-5">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

            {/* Student info */}
            <div>
              <p className="text-xs font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-wide mb-3">Student Info</p>
              <div className="space-y-2">
                <InfoRow icon={<User size={14} />}         label="Name"       value={user?.name || "—"} />
                <InfoRow icon={<Mail size={14} />}         label="Email"      value={user?.email || "—"} />
                <InfoRow icon={<Phone size={14} />}        label="WhatsApp"   value={user?.whatsapp || "—"} />
                <InfoRow icon={<GraduationCap size={14} />} label="University" value={user?.university || "—"} />
                <InfoRow icon={<GraduationCap size={14} />} label="Branch"     value={`${user?.branch || "—"} · Year ${user?.year || "—"}`} />
              </div>
            </div>

            {/* Assignment details + files */}
            <div>
              <p className="text-xs font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-wide mb-3">Full Description</p>
              <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed whitespace-pre-wrap">{description}</p>

              {files?.length > 0 && (
                <div className="mt-4">
                  <p className="text-xs font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-wide mb-2">Attachments</p>
                  <div className="space-y-1">
                    {files.map((f, i) => (
                      <a
                        key={i}
                        href={f.file_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 text-sm text-green-600 dark:text-green-400 hover:underline"
                      >
                        📎 {f.file_name}
                      </a>
                    ))}
                  </div>
                </div>
              )}
            </div>

          </div>
        </div>
      )}

    </div>
  );
}

function InfoRow({ icon, label, value }) {
  return (
    <div className="flex items-center gap-2 text-sm">
      <span className="text-gray-400">{icon}</span>
      <span className="text-gray-500 w-20 shrink-0">{label}</span>
      <span className="font-medium text-gray-700">{value}</span>
    </div>
  );
}
