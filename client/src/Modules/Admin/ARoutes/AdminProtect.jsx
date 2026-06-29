import { Navigate } from "react-router-dom";

export default function AdminProtect({ children }) {

  const token = localStorage.getItem("AdminToken");

  // ❌ Not logged in → go to login
  if (!token) {
    return <Navigate to="/Admin/login" />;
  }

  // ✅ Logged in → allow access
  return children;
}