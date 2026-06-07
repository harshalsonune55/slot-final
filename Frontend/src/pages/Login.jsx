import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { api } from "../services/api";
import { useAuth } from "../context/AuthContext";
import logo from "/S.png";

export default function Login() {
  const [email, setEmail]     = useState("");
  const [password, setPassword] = useState("");
  const [error, setError]     = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth();

  async function handleLogin(e) {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const { token, user } = await api.login({ email, password });
      login(token, user);
      navigate("/Dashboard");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex min-h-screen bg-white dark:bg-gray-950 transition-colors">

      {/* LEFT */}
      <div className="w-full md:w-1/2 flex flex-col p-10">

        <div className="flex items-center gap-3 mb-10">
          <img src={logo} alt="Slot Logo" className="w-8 h-8" />
          <h1 className="text-2xl font-bold text-green-500">Slot</h1>
        </div>

        <form onSubmit={handleLogin} className="max-w-md">

          <h2 className="text-3xl font-bold text-gray-800 dark:text-gray-100 mb-2">Sign in</h2>
          <p className="text-gray-500 dark:text-gray-400 mb-6">Welcome back</p>

          {error && (
            <p className="text-red-500 text-sm mb-4 bg-red-50 dark:bg-red-500/10 border border-red-200 dark:border-red-500/30 p-3 rounded-lg">
              {error}
            </p>
          )}

          <input
            type="email"
            placeholder="Email"
            className="w-full p-3 mb-4 border border-gray-300 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-100 dark:placeholder:text-gray-500 rounded-lg focus:ring-2 focus:ring-green-400 outline-none"
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <input
            type="password"
            placeholder="Password"
            className="w-full p-3 mb-4 border border-gray-300 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-100 dark:placeholder:text-gray-500 rounded-lg focus:ring-2 focus:ring-green-400 outline-none"
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <button
            disabled={loading}
            className="w-full bg-green-500 hover:bg-green-600 text-white font-semibold p-3 rounded-lg disabled:opacity-60 transition"
          >
            {loading ? "Signing in..." : "Sign in"}
          </button>

          <p className="text-sm text-gray-500 dark:text-gray-400 mt-4 text-center">
            Don't have an account?{" "}
            <Link to="/register" className="text-green-500 font-medium">Sign up</Link>
          </p>

        </form>
      </div>

      {/* RIGHT */}
      <div className="hidden md:flex w-1/2 bg-green-50 dark:bg-green-500/10 items-center justify-center p-16">
        <div className="max-w-lg text-center">
          <p className="text-2xl text-gray-700 dark:text-gray-300 leading-relaxed">
            "Helping thousands of students ace their assignments with expert tech solutions."
          </p>
          <div className="mt-6 text-gray-500 dark:text-gray-400">— Slot Platform</div>
        </div>
      </div>

    </div>
  );
}
