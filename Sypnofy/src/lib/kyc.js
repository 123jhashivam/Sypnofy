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

export async function listKyc() {
  try {
    const { data } = await api.get("/api/kyc");
    return data;
  } catch (error) {
    throw normalizeError(error);
  }
}

// docTypes: array like ["aadhaar"] or ["aadhaar", "pan"]
export async function startKyc({ guestName, docTypes, bookingId }) {
  try {
    const { data } = await api.post("/api/kyc/start", { guestName, docTypes, bookingId });
    return data; // { id, guestName, docType, status, authorizationUrl, ... }
  } catch (error) {
    throw normalizeError(error);
  }
}

export async function checkKycStatus(kycId) {
  try {
    const { data } = await api.post(`/api/kyc/${kycId}/check-status`);
    return data;
  } catch (error) {
    throw normalizeError(error);
  }
}
