import { Navigate } from "react-router-dom";
import { useAuth } from "../auth/useAuth";
export default function AdminRoute({ children }) {
  const { user } = useAuth();
  return user?.role === "admin" ? children : <Navigate to="/" />;
}
