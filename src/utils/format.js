/**
 * Format currency to Indonesian Rupiah
 * @param {number} amount - Amount to format
 * @returns {string} Formatted currency string
 */
export const formatCurrency = (amount) => {
  if (!amount && amount !== 0) return "Rp 0";

  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
};

/**
 * Format date to Indonesian locale
 * @param {string|Date} date - Date to format
 * @param {Object} options - Intl.DateTimeFormat options
 * @returns {string} Formatted date string
 */
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

/**
 * Format date to short format (DD/MM/YYYY)
 * @param {string|Date} date - Date to format
 * @returns {string} Formatted date string
 */
export const formatDateShort = (date) => {
  if (!date) return "-";

  return new Intl.DateTimeFormat("id-ID", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  }).format(new Date(date));
};

/**
 * Format date with time
 * @param {string|Date} date - Date to format
 * @returns {string} Formatted date and time string
 */
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

/**
 * Format relative time (e.g., "2 hours ago")
 * @param {string|Date} date - Date to format
 * @returns {string} Relative time string
 */
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

/**
 * Format phone number to Indonesian format
 * @param {string} phone - Phone number to format
 * @returns {string} Formatted phone number
 */
export const formatPhoneNumber = (phone) => {
  if (!phone) return "-";

  // Remove all non-digit characters
  const cleaned = phone.replace(/\D/g, "");

  // Format: 0812-3456-7890 or +62 812-3456-7890
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

/**
 * Format file size to human readable format
 * @param {number} bytes - File size in bytes
 * @returns {string} Formatted file size
 */
export const formatFileSize = (bytes) => {
  if (!bytes || bytes === 0) return "0 Bytes";

  const k = 1024;
  const sizes = ["Bytes", "KB", "MB", "GB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));

  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(2))} ${sizes[i]}`;
};

/**
 * Format percentage
 * @param {number} value - Value to format
 * @param {number} total - Total value
 * @param {number} decimals - Number of decimal places
 * @returns {string} Formatted percentage
 */
export const formatPercentage = (value, total, decimals = 1) => {
  if (!total || total === 0) return "0%";

  const percentage = (value / total) * 100;
  return `${percentage.toFixed(decimals)}%`;
};

/**
 * Truncate text with ellipsis
 * @param {string} text - Text to truncate
 * @param {number} maxLength - Maximum length
 * @returns {string} Truncated text
 */
export const truncateText = (text, maxLength = 100) => {
  if (!text) return "";
  if (text.length <= maxLength) return text;

  return `${text.substring(0, maxLength)}...`;
};

/**
 * Capitalize first letter of each word
 * @param {string} text - Text to capitalize
 * @returns {string} Capitalized text
 */
export const capitalizeWords = (text) => {
  if (!text) return "";

  return text
    .toLowerCase()
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
};

/**
 * Format status badge color
 * @param {string} status - Status value
 * @returns {string} Tailwind color class
 */
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

/**
 * Format status label to Indonesian
 * @param {string} status - Status value
 * @returns {string} Indonesian status label
 */
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

/**
 * Parse error message from API response
 * @param {Object} error - Error object from axios
 * @returns {string} User-friendly error message
 */
export const parseErrorMessage = (error) => {
  if (!error) return "Terjadi kesalahan";

  // Check for response data message
  if (error.response?.data?.message) {
    return error.response.data.message;
  }

  // Check for validation errors
  if (error.response?.data?.errors) {
    const errors = error.response.data.errors;
    const firstError = Object.values(errors)[0];
    return Array.isArray(firstError) ? firstError[0] : firstError;
  }

  // Check for network errors
  if (error.message === "Network Error") {
    return "Tidak dapat terhubung ke server";
  }

  // Check for timeout
  if (error.code === "ECONNABORTED") {
    return "Permintaan timeout, silakan coba lagi";
  }

  // Default error message
  return error.message || "Terjadi kesalahan";
};

/**
 * Validate Indonesian ID number (NIK)
 * @param {string} nik - NIK to validate
 * @returns {boolean} True if valid
 */
export const validateNIK = (nik) => {
  if (!nik) return false;

  // NIK must be 16 digits
  const nikRegex = /^\d{16}$/;
  return nikRegex.test(nik);
};

/**
 * Validate Indonesian phone number
 * @param {string} phone - Phone number to validate
 * @returns {boolean} True if valid
 */
export const validatePhoneNumber = (phone) => {
  if (!phone) return false;

  // Remove all non-digit characters
  const cleaned = phone.replace(/\D/g, "");

  // Must start with 08 or 62 and have 10-13 digits
  const phoneRegex = /^(08|62)\d{8,11}$/;
  return phoneRegex.test(cleaned);
};

/**
 * Validate email format
 * @param {string} email - Email to validate
 * @returns {boolean} True if valid
 */
export const validateEmail = (email) => {
  if (!email) return false;

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

/**
 * Generate initials from name
 * @param {string} name - Full name
 * @returns {string} Initials (max 2 characters)
 */
export const getInitials = (name) => {
  if (!name) return "?";

  const words = name.trim().split(" ");
  if (words.length === 1) {
    return words[0].charAt(0).toUpperCase();
  }

  return (words[0].charAt(0) + words[words.length - 1].charAt(0)).toUpperCase();
};

/**
 * Download file from blob
 * @param {Blob} blob - File blob
 * @param {string} filename - Filename for download
 */
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

/**
 * Copy text to clipboard
 * @param {string} text - Text to copy
 * @returns {Promise<boolean>} True if successful
 */
export const copyToClipboard = async (text) => {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch (error) {
    // Fallback for older browsers
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

/**
 * Check if value is empty (null, undefined, empty string, empty array, empty object)
 * @param {any} value - Value to check
 * @returns {boolean} True if empty
 */
export const isEmpty = (value) => {
  if (value === null || value === undefined) return true;
  if (typeof value === "string" && value.trim() === "") return true;
  if (Array.isArray(value) && value.length === 0) return true;
  if (typeof value === "object" && Object.keys(value).length === 0) return true;
  return false;
};

/**
 * Sleep/delay function
 * @param {number} ms - Milliseconds to sleep
 * @returns {Promise} Promise that resolves after ms
 */
export const sleep = (ms) => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};
