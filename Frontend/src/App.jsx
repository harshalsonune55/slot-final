import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider }      from "./context/AuthContext";
import { AdminAuthProvider } from "./context/AdminAuthContext";
import { ThemeProvider }     from "./context/ThemeContext";
import ProtectedRoute        from "./components/ProtectedRoute";
import ProtectedAdminRoute   from "./components/ProtectedAdminRoute";

import Home             from "./pages/Home";
import Login            from "./pages/Login";
import Register         from "./pages/Register";
import Dashboard        from "./pages/Dashboard";
import SubmitAssignment from "./pages/SubmitAssignment";
import MyAssignments    from "./pages/MyAssignments";
import Payment          from "./pages/Payment";
import PaymentSuccess   from "./pages/PaymentSuccess";
import Settings         from "./pages/Settings";
import Developers       from "./pages/Developers";
import Solutions        from "./pages/Solutions";
import Pricing          from "./pages/Pricing";
import Blog             from "./pages/Blog";

import AdminLogin     from "./pages/admin/AdminLogin";
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminRequests  from "./pages/admin/AdminRequests";

function App() {
  return (
    <ThemeProvider>
    <AuthProvider>
      <AdminAuthProvider>
        <BrowserRouter>
          <Routes>
            {/* ── Student routes ── */}
            <Route path="/"         element={<Home />} />
            <Route path="/login"    element={<Login />} />
            <Route path="/register" element={<Register />} />

            <Route path="/developers" element={<Developers />} />
            <Route path="/solutions"  element={<Solutions />} />
            <Route path="/pricing"    element={<Pricing />} />
            <Route path="/blog"       element={<Blog />} />

            <Route path="/Dashboard"   element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
            <Route path="/submit"      element={<ProtectedRoute><SubmitAssignment /></ProtectedRoute>} />
            <Route path="/assignments" element={<ProtectedRoute><MyAssignments /></ProtectedRoute>} />
            <Route path="/payment"     element={<ProtectedRoute><Payment /></ProtectedRoute>} />
            <Route path="/payment-success" element={<ProtectedRoute><PaymentSuccess /></ProtectedRoute>} />
            <Route path="/settings"    element={<ProtectedRoute><Settings /></ProtectedRoute>} />

            {/* ── Admin routes ── */}
            <Route path="/admin/login" element={<AdminLogin />} />
            <Route path="/admin"          element={<ProtectedAdminRoute><AdminDashboard /></ProtectedAdminRoute>} />
            <Route path="/admin/requests" element={<ProtectedAdminRoute><AdminRequests /></ProtectedAdminRoute>} />
          </Routes>
        </BrowserRouter>
      </AdminAuthProvider>
    </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
