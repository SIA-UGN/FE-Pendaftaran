import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { authService } from "@/services/authService";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export const useAuth = () => {
  const [token, setToken] = useState(null);

  useEffect(() => {
    setToken(localStorage.getItem("access_token"));
  }, []);

  return useQuery({
    queryKey: ["auth", "user"],
    queryFn: authService.getUser,
    enabled: !!token,
    retry: false,
  });
};

export const useLogin = () => {
  const router = useRouter();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: authService.login,
    onSuccess: (data) => {
      localStorage.setItem("access_token", data.data.access_token);
      localStorage.setItem("user", JSON.stringify(data.data.user));
      queryClient.setQueryData(["auth", "user"], data.data.user);
      toast.success("Login successful");
      router.push("/dashboard");
    },
  });
};

export const useRegister = () => {
  const router = useRouter();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: authService.register,
    onSuccess: (data) => {
      localStorage.setItem("access_token", data.data.access_token);
      localStorage.setItem("user", JSON.stringify(data.data.user));
      queryClient.setQueryData(["auth", "user"], data.data.user);
      toast.success("Registration successful");
      router.push("/dashboard");
    },
  });
};

export const useLogout = () => {
  const router = useRouter();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: authService.logout,
    onSuccess: () => {
      localStorage.removeItem("access_token");
      localStorage.removeItem("user");
      queryClient.clear();
      toast.success("Logout successful");
      router.push("/login");
    },
  });
};

export const useForgotPassword = () => {
  return useMutation({
    mutationFn: authService.forgotPassword,
    onSuccess: (data) => {
      toast.success("Password reset link has been sent to your email!");
      if (process.env.NODE_ENV === "development" && data?.data?.reset_token) {
        console.log("Reset token (dev only):", data.data.reset_token);
      }
    },
    onError: (error) => {
      const message =
        error?.response?.data?.message || "Failed to send password reset link.";
      toast.error(message);
    },
  });
};

export const useResetPassword = () => {
  const router = useRouter();

  return useMutation({
    mutationFn: authService.resetPassword,
    onSuccess: () => {
      toast.success("Password has been reset successfully!");
      router.push("/login");
    },
    onError: (error) => {
      const message =
        error?.response?.data?.message || "Failed to reset password.";
      toast.error(message);
    },
  });
};

export const useChangePassword = () => {
  return useMutation({
    mutationFn: authService.changePassword,
    onSuccess: () => {
      toast.success("Password has been changed successfully!");
    },
    onError: (error) => {
      const message =
        error?.response?.data?.message || "Failed to change password.";
      toast.error(message);
    },
  });
};
