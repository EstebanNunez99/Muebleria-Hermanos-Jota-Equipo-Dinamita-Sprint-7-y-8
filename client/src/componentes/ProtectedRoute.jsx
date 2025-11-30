import { Navigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth.js";

export default function ProtectedRoute({ children }) {
  const { isAuthenticated, cargando } = useAuth();

  if (cargando) return <p>Cargando...</p>;

  return isAuthenticated ? children : <Navigate to="/login" replace />;
}
