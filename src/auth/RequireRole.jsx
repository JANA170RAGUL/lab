import { Navigate } from "react-router-dom";
import authService from "./authService";

function RequireRole({ role, children }) {
  const currentRole = authService.getRole();

  if (!currentRole) {
    return <Navigate to="/" replace />;
  }

  if (currentRole !== role) {
    return <Navigate to="/access-denied" replace />;
  }

  return children;
}

export default RequireRole;
