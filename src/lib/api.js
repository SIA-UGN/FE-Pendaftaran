import axios from "axios";
import toast from "react-hot-toast";

const apiClient = axios.create({
  baseURL: process.env.APP_URL || "http://sia-globall.test/api",
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 10000,
});

apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem("access_token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem("access_token");
      localStorage.removeItem("user");

      if (
        typeof window !== "undefined" &&
        window.location.pathname !== "/login"
      ) {
        window.location.href = "/login";
      }
    }

    if (error.response?.status === 500) {
      toast.error("Terjadi kesalahan pada server. Silakan coba lagi nanti.");
    }

    if (!error.response) {
      toast.error("Koneksi terputus. Silakan periksa jaringan Anda.");
    }

    return Promise.reject(error);
  }
);
export default apiClient;
