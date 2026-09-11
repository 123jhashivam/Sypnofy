import { Navigate } from "react-router-dom";
import { isAuthenticated, getRole } from "../lib/auth";

// Usage in your router — wrap each protected page directly:
//
//   <Route path="/dashboard" element={
//     <ProtectedRoute><Dashboard /></ProtectedRoute>
//   } />
//
//   // Once the admin pages exist, restrict them by role like this:
//   <Route path="/admin" element={
//     <ProtectedRoute allowedRoles={["ADMIN", "SUPERADMIN"]}>
//       <AdminDashboard />
//     </ProtectedRoute>
//   } />
//
//   <Route path="/superadmin" element={
//     <ProtectedRoute allowedRoles={["SUPERADMIN"]}>
//       <SuperAdminDashboard />
//     </ProtectedRoute>
//   } />
//
// allowedRoles is optional — omit it for "just needs to be logged in".
export default function ProtectedRoute({ children, allowedRoles }) {
  if (!isAuthenticated()) {
    return <Navigate to="/login" replace />;
  }

  const role = getRole();
  if (allowedRoles && !allowedRoles.includes(role)) {
    // Logged in, but wrong role — send them somewhere safe rather than
    // showing a page they're not meant to see.
    return <Navigate to="/dashboard" replace />;
  }

  return children;
}
