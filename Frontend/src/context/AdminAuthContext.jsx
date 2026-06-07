import { createContext, useContext, useState, useEffect } from "react";

const AdminAuthContext = createContext(null);

export function AdminAuthProvider({ children }) {
  const [isAdmin, setIsAdmin]   = useState(false);
  const [loading, setLoading]   = useState(true);

  useEffect(() => {
    setIsAdmin(!!localStorage.getItem("admin_token"));
    setLoading(false);
  }, []);

  function loginAdmin(token) {
    localStorage.setItem("admin_token", token);
    setIsAdmin(true);
  }

  function logoutAdmin() {
    localStorage.removeItem("admin_token");
    setIsAdmin(false);
  }

  return (
    <AdminAuthContext.Provider value={{ isAdmin, loading, loginAdmin, logoutAdmin }}>
      {children}
    </AdminAuthContext.Provider>
  );
}

export function useAdminAuth() {
  return useContext(AdminAuthContext);
}
