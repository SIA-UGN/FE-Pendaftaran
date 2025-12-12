export const formatCurrency = (amount) => {
  if (!amount && amount !== 0) return "Rp 0";

  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
};

export const formatDate = (date, options = {}) => {
  if (!date) return "-";

  const defaultOptions = {
    day: "numeric",
    month: "long",
    year: "numeric",
    ...options,
  };

  return new Intl.DateTimeFormat("id-ID", defaultOptions).format(
    new Date(date)
  );
};

export const formatDateShort = (date) => {
  if (!date) return "-";

  return new Intl.DateTimeFormat("id-ID", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  }).format(new Date(date));
};

export const formatDateTime = (date) => {
  if (!date) return "-";

  return new Intl.DateTimeFormat("id-ID", {
    day: "numeric",
    month: "long",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  }).format(new Date(date));
};

export const formatRelativeTime = (date) => {
  if (!date) return "-";

  const now = new Date();
  const past = new Date(date);
  const diffInSeconds = Math.floor((now - past) / 1000);

  if (diffInSeconds < 60) {
    return "Baru saja";
  }

  const diffInMinutes = Math.floor(diffInSeconds / 60);
  if (diffInMinutes < 60) {
    return `${diffInMinutes} menit yang lalu`;
  }

  const diffInHours = Math.floor(diffInMinutes / 60);
  if (diffInHours < 24) {
    return `${diffInHours} jam yang lalu`;
  }

  const diffInDays = Math.floor(diffInHours / 24);
  if (diffInDays < 30) {
    return `${diffInDays} hari yang lalu`;
  }

  const diffInMonths = Math.floor(diffInDays / 30);
  if (diffInMonths < 12) {
    return `${diffInMonths} bulan yang lalu`;
  }

  const diffInYears = Math.floor(diffInMonths / 12);
  return `${diffInYears} tahun yang lalu`;
};

export const formatPhoneNumber = (phone) => {
  if (!phone) return "-";

  const cleaned = phone.replace(/\D/g, "");

  if (cleaned.startsWith("62")) {
    const match = cleaned.match(/^(\d{2})(\d{3})(\d{4})(\d{4})$/);
    if (match) {
      return `+${match[1]} ${match[2]}-${match[3]}-${match[4]}`;
    }
  } else if (cleaned.startsWith("0")) {
    const match = cleaned.match(/^(\d{4})(\d{4})(\d{4})$/);
    if (match) {
      return `${match[1]}-${match[2]}-${match[3]}`;
    }
  }

  return phone;
};

export const formatFileSize = (bytes) => {
  if (!bytes || bytes === 0) return "0 Bytes";

  const k = 1024;
  const sizes = ["Bytes", "KB", "MB", "GB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));

  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(2))} ${sizes[i]}`;
};

export const formatPercentage = (value, total, decimals = 1) => {
  if (!total || total === 0) return "0%";

  const percentage = (value / total) * 100;
  return `${percentage.toFixed(decimals)}%`;
};

export const truncateText = (text, maxLength = 100) => {
  if (!text) return "";
  if (text.length <= maxLength) return text;

  return `${text.substring(0, maxLength)}...`;
};

export const capitalizeWords = (text) => {
  if (!text) return "";

  return text
    .toLowerCase()
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
};

export const getStatusColor = (status) => {
  const statusColors = {
    // Registration status
    draft: "gray",
    pending: "yellow",
    submitted: "blue",
    reviewing: "purple",
    approved: "green",
    rejected: "red",

    // Payment status
    unpaid: "gray",
    waiting_verification: "yellow",
    paid: "green",
    verified: "green",

    // Document status
    uploaded: "blue",
    verified: "green",

    // General status
    active: "green",
    inactive: "gray",
    completed: "green",
    cancelled: "red",
  };

  return statusColors[status?.toLowerCase()] || "gray";
};

export const getStatusLabel = (status) => {
  const statusLabels = {
    // Registration status
    draft: "Draft",
    pending: "Menunggu",
    submitted: "Diajukan",
    reviewing: "Sedang Ditinjau",
    approved: "Disetujui",
    rejected: "Ditolak",

    // Payment status
    unpaid: "Belum Dibayar",
    waiting_verification: "Menunggu Verifikasi",
    paid: "Sudah Dibayar",
    verified: "Terverifikasi",

    // Document status
    uploaded: "Terupload",
    verified: "Terverifikasi",

    // General status
    active: "Aktif",
    inactive: "Tidak Aktif",
    completed: "Selesai",
    cancelled: "Dibatalkan",
  };

  return statusLabels[status?.toLowerCase()] || status;
};

export const parseErrorMessage = (error) => {
  if (!error) return "Terjadi kesalahan";

  if (error.response?.data?.message) {
    return error.response.data.message;
  }

  if (error.response?.data?.errors) {
    const errors = error.response.data.errors;
    const firstError = Object.values(errors)[0];
    return Array.isArray(firstError) ? firstError[0] : firstError;
  }

  if (error.message === "Network Error") {
    return "Tidak dapat terhubung ke server";
  }

  if (error.code === "ECONNABORTED") {
    return "Permintaan timeout, silakan coba lagi";
  }

  return error.message || "Terjadi kesalahan";
};

export const validateNIK = (nik) => {
  if (!nik) return false;

  const nikRegex = /^\d{16}$/;
  return nikRegex.test(nik);
};

export const validatePhoneNumber = (phone) => {
  if (!phone) return false;

  const cleaned = phone.replace(/\D/g, "");

  const phoneRegex = /^(08|62)\d{8,11}$/;
  return phoneRegex.test(cleaned);
};

export const validateEmail = (email) => {
  if (!email) return false;

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const getInitials = (name) => {
  if (!name) return "?";

  const words = name.trim().split(" ");
  if (words.length === 1) {
    return words[0].charAt(0).toUpperCase();
  }

  return (words[0].charAt(0) + words[words.length - 1].charAt(0)).toUpperCase();
};

export const downloadBlob = (blob, filename) => {
  const url = window.URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  window.URL.revokeObjectURL(url);
};

export const copyToClipboard = async (text) => {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch (error) {
    const textArea = document.createElement("textarea");
    textArea.value = text;
    textArea.style.position = "fixed";
    textArea.style.left = "-999999px";
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();

    try {
      document.execCommand("copy");
      document.body.removeChild(textArea);
      return true;
    } catch (err) {
      document.body.removeChild(textArea);
      return false;
    }
  }
};

export const isEmpty = (value) => {
  if (value === null || value === undefined) return true;
  if (typeof value === "string" && value.trim() === "") return true;
  if (Array.isArray(value) && value.length === 0) return true;
  if (typeof value === "object" && Object.keys(value).length === 0) return true;
  return false;
};

export const sleep = (ms) => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};
