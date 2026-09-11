import api from "./api";

// Normalizes whatever the backend's GlobalExceptionHandler sent back into
// a shape the form can use directly:
//   { message: string, fieldErrors: { email: "...", phone: "..." } }
function normalizeError(error) {
  const data = error?.response?.data;
  if (data) {
    return {
      message: data.message || data.error || "Something went wrong. Please try again.",
      fieldErrors: data.fieldErrors || {},
    };
  }
  return {
    message: "Couldn't reach the server. Check your connection and try again.",
    fieldErrors: {},
  };
}

export async function signup(payload) {
  try {
    const { data } = await api.post("/api/auth/signup", payload);
    return data; // { userId, hotelId, email, message }
  } catch (error) {
    throw normalizeError(error);
  }
}

export async function login(payload) {
  try {
    const { data } = await api.post("/api/auth/login", payload);
    // { email, message } — no token yet, OTP has just been emailed
    return data;
  } catch (error) {
    throw normalizeError(error);
  }
}

export async function verifyOtp(payload) {
  try {
    const { data } = await api.post("/api/auth/verify-otp", payload);
    // { token, userId, email, role } — login is complete now
    localStorage.setItem("token", data.token);
    localStorage.setItem("role", data.role);
    return data;
  } catch (error) {
    throw normalizeError(error);
  }
}

export async function resendOtp(payload) {
  try {
    const { data } = await api.post("/api/auth/resend-otp", payload);
    return data;
  } catch (error) {
    throw normalizeError(error);
  }
}

export function logout() {
  localStorage.removeItem("token");
  localStorage.removeItem("role");
}

// --- Simple helpers the route guard and UI use to check auth state ---

export function isAuthenticated() {
  return Boolean(localStorage.getItem("token"));
}

export function getRole() {
  return localStorage.getItem("role"); // "USER" | "ADMIN" | "SUPERADMIN" | null
}
export async function getMe() {
  try {
    const { data } = await api.get("/api/me");
    return data;
  } catch (error) {
    throw normalizeError(error);
  }
}