import { Navigate } from "react-router-dom";
import { useAuth } from "../context/authContext";

export default function PublicRoute({ children }) {
  const { isAuthenticated } = useAuth();

  // If user is logged in, redirect to dashboard
  if (isAuthenticated) {
    return <Navigate to="/dashboard" replace />;
  }

  // If not logged in, show the child (login or register page)
  return children;
}
