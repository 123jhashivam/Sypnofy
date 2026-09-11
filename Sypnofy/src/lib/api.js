import axios from "axios";

// Vite exposes env vars prefixed with VITE_ on import.meta.env.
// If you're on Create React App instead, swap this for
// process.env.REACT_APP_API_BASE_URL.
const baseURL = import.meta.env.VITE_API_BASE_URL || "http://localhost:8080";

export const api = axios.create({
  baseURL,
  headers: { "Content-Type": "application/json" },
});

// Attach the JWT (once logged in) to every outgoing request automatically,
// so individual calls never have to remember to add the header.
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
