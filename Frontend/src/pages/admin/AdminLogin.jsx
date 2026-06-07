import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Shield, Lock } from "lucide-react";
import { adminApi } from "../../services/api";
import { useAdminAuth } from "../../context/AdminAuthContext";

export default function AdminLogin() {
  const [email, setEmail]       = useState("");
  const [password, setPassword] = useState("");
  const [error, setError]       = useState("");
  const [loading, setLoading]   = useState(false);
  const navigate                = useNavigate();
  const { loginAdmin }          = useAdminAuth();

  async function handleLogin(e) {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const { token } = await adminApi.login({ email, password });
      loginAdmin(token);
      navigate("/admin");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-gray-900 dark:bg-gray-950 flex items-center justify-center px-4 transition-colors">
      <div className="bg-white dark:bg-gray-900 dark:border dark:border-gray-800 rounded-2xl shadow-2xl p-10 w-full max-w-md">

        {/* Icon */}
        <div className="flex justify-center mb-6">
          <div className="bg-green-100 dark:bg-green-500/15 p-4 rounded-2xl">
            <Shield size={40} className="text-green-600 dark:text-green-400" />
          </div>
        </div>

        <h1 className="text-2xl font-bold text-center text-gray-800 dark:text-gray-100 mb-1">Admin Login</h1>
        <p className="text-gray-500 dark:text-gray-400 text-center text-sm mb-8">Slot Admin Panel</p>

        {error && (
          <p className="text-red-500 dark:text-red-400 text-sm mb-5 bg-red-50 dark:bg-red-500/10 border border-red-200 dark:border-red-500/30 p-3 rounded-lg text-center">
            {error}
          </p>
        )}

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="text-sm font-medium text-gray-700 dark:text-gray-300 block mb-1">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="admin@slot.com"
              className="w-full p-3 border border-gray-300 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-100 dark:placeholder:text-gray-500 rounded-lg focus:ring-2 focus:ring-green-400 outline-none"
              required
            />
          </div>

          <div>
            <label className="text-sm font-medium text-gray-700 dark:text-gray-300 block mb-1">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full p-3 border border-gray-300 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-100 dark:placeholder:text-gray-500 rounded-lg focus:ring-2 focus:ring-green-400 outline-none"
              required
            />
          </div>

          <button
            disabled={loading}
            className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-3 rounded-lg transition disabled:opacity-60 flex items-center justify-center gap-2 mt-2"
          >
            <Lock size={16} />
            {loading ? "Signing in..." : "Sign in as Admin"}
          </button>
        </form>

        <p className="text-center text-xs text-gray-400 dark:text-gray-500 mt-6">
          Student?{" "}
          <a href="/login" className="text-green-600 dark:text-green-400 hover:underline">Go to student login</a>
        </p>
      </div>
    </div>
  );
}
