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

export async function getArrivals() {
  try {
    const { data } = await api.get("/api/checkin/arrivals");
    return data;
  } catch (error) {
    throw normalizeError(error);
  }
}

export async function getDepartures() {
  try {
    const { data } = await api.get("/api/checkin/departures");
    return data;
  } catch (error) {
    throw normalizeError(error);
  }
}

export async function updateArrivalStep(bookingId, step, done) {
  try {
    await api.patch(`/api/checkin/arrivals/${bookingId}/steps`, { step, done });
  } catch (error) {
    throw normalizeError(error);
  }
}

export async function updateDepartureStep(bookingId, step, done) {
  try {
    await api.patch(`/api/checkin/departures/${bookingId}/steps`, { step, done });
  } catch (error) {
    throw normalizeError(error);
  }
}

export async function completeCheckIn(bookingId) {
  try {
    await api.post(`/api/checkin/arrivals/${bookingId}/complete`);
  } catch (error) {
    throw normalizeError(error);
  }
}

export async function completeCheckOut(bookingId) {
  try {
    await api.post(`/api/checkin/departures/${bookingId}/complete`);
  } catch (error) {
    throw normalizeError(error);
  }
}

// Temporary helper — lets you seed test bookings until a full
// Bookings module exists. etaAt / checkoutDueAt must be ISO strings,
// e.g. new Date().toISOString()
export async function createBooking(payload) {
  try {
    const { data } = await api.post("/api/checkin/bookings", payload);
    return data;
  } catch (error) {
    throw normalizeError(error);
  }
}
