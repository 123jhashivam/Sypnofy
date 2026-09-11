import React from "react";
import { useLocation, Link } from "react-router-dom";

export default function VerifyEmail() {
  const location = useLocation();
  const email = location.state?.email;

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 px-6">
      <div className="w-full max-w-md rounded-2xl bg-white p-8 text-center shadow-sm">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-blue-50 text-blue-600 text-2xl">
          ✉
        </div>

        <h1 className="mt-6 text-2xl font-semibold text-slate-900">
          Check your email
        </h1>

        <p className="mt-3 text-slate-500">
          We have sent a verification link to
        </p>

        {email && (
          <p className="mt-2 font-medium text-slate-900">
            {email}
          </p>
        )}

        <p className="mt-4 text-sm text-slate-400">
          Please check your inbox and click the verification link to verify
          your account.
        </p>

        <Link
          to="/login"
          className="mt-6 inline-block rounded-xl bg-slate-900 px-6 py-3 text-sm font-semibold text-white hover:bg-slate-800"
        >
          Go to Login
        </Link>
      </div>
    </div>
  );
}

