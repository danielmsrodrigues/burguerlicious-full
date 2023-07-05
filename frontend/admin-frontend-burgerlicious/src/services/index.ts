import axios from "axios";

const baseURL = "http://localhost:3002";
// const baseURL = "https://admin-backend-burguerlicious.vercel.app/";

export const api = axios.create({
  baseURL,
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");

  if (token) {
    config.headers["Authorization"] = `Bearer ${token}`;
  }

  return config;
});
