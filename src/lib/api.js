import axios from "axios";
import toast from "react-hot-toast";

const apiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || "http://be-ugn.test/api",
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

  if (config.data instanceof FormData) {
    config.headers["Content-Type"] = "multipart/form-data";
  }

  return config;
});

apiClient.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    const status = error.response?.status;
    const url = error.config?.url || "";

    if (status === 401) {
      if (!url.includes("/login") && !url.includes("/register")) {
        localStorage.removeItem("access_token");
        localStorage.removeItem("user");

        if (
          typeof window !== "undefined" &&
          window.location.pathname !== "/login"
        ) {
          toast.error("Sesi Anda telah berakhir. Silakan login kembali.");
          setTimeout(() => {
            window.location.href = "/login";
          }, 3000);
        }
      }
    }

    if (status === 403) {
      const message =
        error.response?.data?.message ||
        "Anda tidak memiliki izin untuk mengakses resource ini.";
      toast.error(message);
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
