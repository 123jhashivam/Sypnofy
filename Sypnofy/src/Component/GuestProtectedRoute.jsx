import { Navigate } from "react-router-dom";
import { isGuestAuthenticated } from "../lib/guestAuth"; // apna actual relative path check kar lena

export default function GuestProtectedRoute({ children }) {
  if (!isGuestAuthenticated()) {
    return <Navigate to="/guest/login" replace />;
  }
  return children;
}
