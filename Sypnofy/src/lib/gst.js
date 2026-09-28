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

export async function listGstVerifications() {
  try {
    const { data } = await api.get("/api/gst");
    return data;
  } catch (error) {
    throw normalizeError(error);
  }
}

export async function verifyGstin(gstin) {
  try {
    const { data } = await api.post("/api/gst/verify", { gstin });
    return data; // { id, gstin, status, legalName, tradeName, gstinStatus, stateJurisdiction, registrationDate, failureReason }
  } catch (error) {
    throw normalizeError(error);
  }
}
