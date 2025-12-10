import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { authService } from "@/services/authService";
import { useAuth as useAuthContext } from "@/contexts/AuthContext";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { useEffect, useRef } from "react";

export const useLogin = () => {
  const { login: setAuth } = useAuthContext();
  const router = useRouter();
  const timeoutRef = useRef(null);

  // Cleanup timeout on unmount
  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  return useMutation({
    mutationFn: authService.login,
    onSuccess: (response) => {
      const { user, access_token } = response.data;
      setAuth(user, access_token);
      toast.success("Login berhasil!");

      // Redirect based on role
      timeoutRef.current = setTimeout(() => {
        if (user.role === "admin") {
          router.push("/dashboard");
        } else if (user.role === "manager") {
          router.push("/manager");
        } else {
          router.push("/pendaftaran");
        }
      }, 500);
    },
    onError: (error) => {
      toast.error(error.response?.data?.message || "Login gagal");
    },
  });
};

export const useRegister = () => {
  const router = useRouter();

  return useMutation({
    mutationFn: authService.register,
    onSuccess: () => {
      toast.success("Registrasi berhasil! Silakan login.");
      router.push("/login");
    },
    onError: (error) => {
      toast.error(error.response?.data?.message || "Registrasi gagal");
    },
  });
};

export const useLogout = () => {
  const { logout: clearAuth } = useAuthContext();
  const router = useRouter();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: authService.logout,
    onSuccess: () => {
      clearAuth();
      queryClient.clear();
      toast.success("Logout berhasil");
      router.push("/login");
    },
    onError: () => {
      // Force logout even if API fails
      clearAuth();
      queryClient.clear();
      router.push("/login");
    },
  });
};

export const useChangePassword = () => {
  return useMutation({
    mutationFn: authService.changePassword,
    onSuccess: () => {
      toast.success("Password berhasil diubah");
    },
    onError: (error) => {
      toast.error(error.response?.data?.message || "Gagal mengubah password");
    },
  });
};

export const useForgotPassword = () => {
  return useMutation({
    mutationFn: authService.forgotPassword,
    onSuccess: () => {
      toast.success("Link reset password telah dikirim ke email Anda");
    },
    onError: (error) => {
      toast.error(
        error.response?.data?.message || "Gagal mengirim email reset"
      );
    },
  });
};

export const useResetPassword = () => {
  const router = useRouter();

  return useMutation({
    mutationFn: authService.resetPassword,
    onSuccess: () => {
      toast.success("Password berhasil direset! Silakan login.");
      router.push("/login");
    },
    onError: (error) => {
      toast.error(error.response?.data?.message || "Gagal reset password");
    },
  });
};

export const useChangeEmail = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: authService.changeEmail,
    onSuccess: () => {
      toast.success("Email berhasil diubah");
      queryClient.invalidateQueries({ queryKey: ["profile"] });
    },
    onError: (error) => {
      toast.error(error.response?.data?.message || "Gagal mengubah email");
    },
  });
};
