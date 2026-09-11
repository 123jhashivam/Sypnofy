import React from "react";
import { Routes, Route } from "react-router-dom";

// Home / Landing
import Navbar from "./Component/Home/Navbar";
import Footer from "./Component/Home/Footer";
import Home from "./Component/Pages/Home";

// Authentication
import Signup from "./Component/Pages/Signup";
import Login from "./Component/Pages/Login";
import ProtectedRoute from "./Component/ProtectedRoute";
import VerifyEmail from "./Component/Pages/VerifyEmail";

// Dashboard Layout
import Layout from "./Component/Layout";

// Dashboard Pages
import Dashboard from "./Component/Pages/Dashboard";
import Properties from "./Component/Pages/Properties";
import PropertyDetails from "./Component/Pages/PropertyDetails";
import Bookings from "./Component/Pages/Bookings";
import Kyc from "./Component/Pages/Kyc";
import CheckIn from "./Component/Pages/CheckIn";
import ForeignGuests from "./Component/Pages/ForeignGuests";
import ForeignBooking from "./Component/Pages/ForeignBooking";
import AuditLogs from "./Component/Pages/AuditLogs";
import Reports from "./Component/Pages/Reports";
import Integrations from "./Component/Pages/Integrations";
import Billing from "./Component/Pages/Billing";
import Settings from "./Component/Pages/Settings";

import "./App.css";

// Landing page wrapper
// Only the Home page gets the marketing Navbar and Footer
function LandingLayout({ children }) {
  return (
    <>
      <Navbar />
      {children}
      <Footer />
    </>
  );
}

export default function App() {
  return (
    <Routes>

      {/* =========================
          PUBLIC LANDING PAGE
          ========================= */}
      <Route
        path="/"
        element={
          <LandingLayout>
            <Home />
          </LandingLayout>
        }
      />

      {/* =========================
          AUTHENTICATION
          ========================= */}
      <Route
        path="/signup"
        element={<Signup />}
      />

      <Route
        path="/login"
        element={<Login />}
      />

      <Route
  path="/verify-email"
  element={<VerifyEmail />}
/>

      {/* =========================
          PROTECTED DASHBOARD
          ========================= */}
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <Layout />
          </ProtectedRoute>
        }
      >
        {/* /dashboard */}
        <Route
          index
          element={<Dashboard />}
        />

        {/* /dashboard/properties */}
        <Route
          path="properties"
          element={<Properties />}
        />

        {/* /dashboard/properties/:id */}
        <Route
          path="properties/:id"
          element={<PropertyDetails />}
        />

        {/* /dashboard/bookings */}
        <Route
          path="bookings"
          element={<Bookings />}
        />

        {/* /dashboard/kyc */}
        <Route
          path="kyc"
          element={<Kyc />}
        />

        {/* /dashboard/checkin */}
        <Route
          path="checkin"
          element={<CheckIn />}
        />

        {/* /dashboard/foreign-guests */}
        <Route
          path="foreign-guests"
          element={<ForeignGuests />}
        />

        {/* /dashboard/audit */}
        <Route
          path="audit"
          element={<AuditLogs />}
        />

        {/* /dashboard/reports */}
        <Route
          path="reports"
          element={<Reports />}
        />

        {/* /dashboard/integrations */}
        <Route
          path="integrations"
          element={<Integrations />}
        />

        {/* /dashboard/billing */}
        <Route
          path="billing"
          element={<Billing />}
        />

        {/* /dashboard/settings */}
        <Route
          path="settings"
          element={<Settings />}
        />
      </Route>

      {/* =========================
          FOREIGN BOOKING
          ========================= */}
      <Route
        path="/dashboard/foreign-booking"
        element={
          <ProtectedRoute>
            <ForeignBooking />
          </ProtectedRoute>
        }
      />

    </Routes>
  );
}