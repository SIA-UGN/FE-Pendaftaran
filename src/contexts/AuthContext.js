"use client";

import { createContext, useContext, useState, useEffect } from "react";
import { authService } from "@/services/authService";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Load auth data from localStorage on mount
    const storedToken = localStorage.getItem("access_token");
    const storedUser = localStorage.getItem("user");

    if (storedToken && storedUser) {
      setToken(storedToken);
      setUser(JSON.parse(storedUser));
    }

    setLoading(false);
  }, []);

  const login = (userData, accessToken) => {
    console.log("🔐 [AuthContext.login] Called with:", {
      userData,
      tokenLength: accessToken?.length,
      tokenPreview: accessToken?.substring(0, 30) + "...",
    });

    setUser(userData);
    setToken(accessToken);
    localStorage.setItem("access_token", accessToken);
    localStorage.setItem("user", JSON.stringify(userData));

    console.log("✅ [AuthContext.login] Saved to localStorage");
    console.log(
      "✅ [AuthContext.login] Verify token:",
      localStorage.getItem("access_token")?.substring(0, 30) + "..."
    );
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem("access_token");
    localStorage.removeItem("user");
  };

  const updateUser = (userData) => {
    setUser(userData);
    localStorage.setItem("user", JSON.stringify(userData));
  };

  const value = {
    user,
    token,
    loading,
    login,
    logout,
    updateUser,
    isAuthenticated: !!token,
    isAdmin: user?.role === "admin",
    isManager: user?.role === "manager",
    isPendaftar: user?.role === "pendaftar",
    isMahasiswa: user?.role === "mahasiswa",
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
