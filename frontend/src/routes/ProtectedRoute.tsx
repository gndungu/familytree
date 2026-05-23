import { Navigate } from "react-router-dom";
import { isAuthenticated } from "../services/authService";

interface Props {
  children: React.ReactNode;
}

export default function ProtectedRoute({ children }: Props) {
  if (!isAuthenticated()) {
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
}