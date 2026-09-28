import React from "react";
import { Routes, Route, Outlet } from "react-router-dom";

// Home / Landing
import Navbar from "./Component/Home/Navbar";
import Footer from "./Component/Home/Footer";
import Home from "./Component/Pages/Home";
import Careers from "./Component/Pages/Careers";
import Pricing from "./Component/Pages/Pricing";
import Flights from "./Component/Pages/Flights";
import Apis from "./Component/Pages/Apis";
import ContactUs from "./Component/Pages/ContactUs";
import AboutUs from "./Component/Pages/AboutUs";
import Hotel from "./Component/Pages/Hotel";

// Authentication
import Signup from "./Component/Pages/Signup";
import Login from "./Component/Pages/Login";
import ProtectedRoute from "./Component/ProtectedRoute";
import VerifyEmail from "./Component/Pages/VerifyEmail";
import GuestSignup from "./Component/Pages/GuestSignup";
import GuestLogin from "./Component/Pages/GuestLogin";
import GuestVerifyIdentity from "./Component/Pages/GuestVerifyIdentity";
import GuestProtectedRoute from "./Component/GuestProtectedRoute";

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

// Landing page wrapper — Navbar + Footer render once here, and every
// nested route's page renders in between via <Outlet />.
function LandingLayout() {
  return (
    <>
      <Navbar />
      <Outlet />
      <Footer />
    </>
  );
}

export default function App() {
  return (
    <Routes>

      {/* =========================
          PUBLIC PAGES — Navbar + Footer on all of these
          ========================= */}
      <Route element={<LandingLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/Careers" element={<Careers />} />
        <Route path="/Pricing" element={< Pricing />} />
        <Route path="/industries/flights" element={<Flights />} />
         <Route path="/industries/api" element={<Apis />} />
         <Route path="/ContactUs" element={<ContactUs />} />
         <Route path="/about" element={<AboutUs />} />
         <Route path="/industries/hotels" element={<Hotel />} />



        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/verify-email" element={<VerifyEmail />} />

        <Route path="/guest/signup" element={<GuestSignup />} />
        <Route path="/guest/login" element={<GuestLogin />} />
        <Route
          path="/guest/verify-identity"
          element={
            <GuestProtectedRoute>
              <GuestVerifyIdentity />
            </GuestProtectedRoute>
          }
        />
      </Route>

      {/* =========================
          PROTECTED DASHBOARD — no Navbar/Footer, its own Layout
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
        <Route index element={<Dashboard />} />

        {/* /dashboard/properties */}
        <Route path="properties" element={<Properties />} />

        {/* /dashboard/properties/:id */}
        <Route path="properties/:id" element={<PropertyDetails />} />

        {/* /dashboard/bookings */}
        <Route path="bookings" element={<Bookings />} />

        {/* /dashboard/kyc */}
        <Route path="kyc" element={<Kyc />} />

        {/* /dashboard/checkin */}
        <Route path="checkin" element={<CheckIn />} />

        {/* /dashboard/foreign-guests */}
        <Route path="foreign-guests" element={<ForeignGuests />} />

        {/* /dashboard/audit */}
        <Route path="audit" element={<AuditLogs />} />

        {/* /dashboard/reports */}
        <Route path="reports" element={<Reports />} />

        {/* /dashboard/integrations */}
        <Route path="integrations" element={<Integrations />} />

        {/* /dashboard/billing */}
        <Route path="billing" element={<Billing />} />

        {/* /dashboard/settings */}
        <Route path="settings" element={<Settings />} />
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