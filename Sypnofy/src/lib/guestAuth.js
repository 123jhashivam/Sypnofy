import api from "./api";

function normalizeError(error) {
  const data = error?.response?.data;
  if (data) {
    return {
      message: data.error || "Something went wrong. Please try again.",
      fieldErrors: data.fieldErrors || {},
    };
  }
  return {
    message: "Couldn't reach the server. Check your connection and try again.",
    fieldErrors: {},
  };
}

// ---------------------------------------------------------------
// Guest account — a separate login world from hotel-vendor accounts.
// Token is stored under different keys so a guest and a hotel staffer
// can stay logged in on the same browser without clobbering each other.
// ---------------------------------------------------------------

export async function guestSignup(payload) {
  try {
    const { data } = await api.post("/api/guest/auth/signup", payload);
    return data;
  } catch (error) {
    throw normalizeError(error);
  }
}

export async function guestLogin(payload) {
  try {
    const { data } = await api.post("/api/guest/auth/login", payload);
    return data; // { email, message } — OTP sent, no token yet
  } catch (error) {
    throw normalizeError(error);
  }
}

export async function guestVerifyOtp(payload) {
  try {
    const { data } = await api.post("/api/guest/auth/verify-otp", payload);
    localStorage.setItem("guestToken", data.token);
    localStorage.setItem("guestRole", data.role);
    return data;
  } catch (error) {
    throw normalizeError(error);
  }
}

export async function guestResendOtp(payload) {
  try {
    const { data } = await api.post("/api/guest/auth/resend-otp", payload);
    return data;
  } catch (error) {
    throw normalizeError(error);
  }
}

export function guestLogout() {
  localStorage.removeItem("guestToken");
  localStorage.removeItem("guestRole");
}

export function isGuestAuthenticated() {
  return Boolean(localStorage.getItem("guestToken"));
}

// ---------------------------------------------------------------
// Guest verifying their own Aadhaar
// ---------------------------------------------------------------

export async function startSelfKyc(aadhaarNumber) {
  try {
    const { data } = await api.post("/api/guest/kyc/start", { aadhaarNumber });
    // Either { status: "VERIFIED", verificationCode, ... }
    // or     { status: "PENDING", kycId, authorizationUrl }
    return data;
  } catch (error) {
    throw normalizeError(error);
  }
}

export async function checkSelfKycStatus(kycId) {
  try {
    const { data } = await api.post(`/api/guest/kyc/${kycId}/check-status`);
    return data; // { found, verificationCode, verifiedName, maskedIdNumber, verifiedAt }
  } catch (error) {
    throw normalizeError(error);
  }
}

// ---------------------------------------------------------------
// Hotel side — look up a guest by their verification code
// ---------------------------------------------------------------

export async function lookupVerificationCode(code) {
  try {
    const { data } = await api.get(`/api/verification/lookup/${encodeURIComponent(code)}`);
    return data; // { found, verificationCode, verifiedName, maskedIdNumber, verifiedAt }
  } catch (error) {
    throw normalizeError(error);
  }
}