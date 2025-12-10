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
      const { user, access_token } = response.data.data;

      if (!user.is_active) {
        toast.error("Akun Anda belum diaktifkan. Silakan hubungi admin.");
        return;
      }

      setAuth(user, access_token);
      toast.success("Login berhasil!");

      timeoutRef.current = setTimeout(() => {
        if (user.role === "admin") {
          router.push("/dashboard");
        } else if (user.role === "manager") {
          router.push("/manager");
        } else if (user.role === "pendaftar" || user.role === "mahasiswa") {
          router.push("/pendaftaran");
        } else {
          router.push("/");
        }
      }, 500);
    },
    onError: (error) => {
      toast.error(error.response?.data?.message || "Login gagal");
    },
  });
};

export const useRegister = () => {
  const { login: setAuth } = useAuthContext();
  const router = useRouter();

  return useMutation({
    mutationFn: authService.register,
    onSuccess: (response) => {
      const { user, access_token } = response.data.data;

      setAuth(user, access_token);
      toast.success("Registrasi berhasil! Selamat datang.");

      router.push("/pendaftaran");
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
    onSuccess: (response) => {
      clearAuth();
      queryClient.clear();
      toast.success(response.data?.message || "Logout berhasil");
      router.push("/login");
    },
    onError: () => {
      clearAuth();
      queryClient.clear();
      router.push("/login");
    },
  });
};

export const useChangePassword = () => {
  return useMutation({
    mutationFn: authService.changePassword,
    onSuccess: (response) => {
      // API response structure: { success, message }
      toast.success(response.data?.message || "Password berhasil diubah");
    },
    onError: (error) => {
      toast.error(error.response?.data?.message || "Gagal mengubah password");
    },
  });
};

export const useForgotPassword = () => {
  return useMutation({
    mutationFn: authService.forgotPassword,
    onSuccess: (response) => {
      // API response structure: { success, message }
      toast.success(
        response.data?.message || "Kode verifikasi telah dikirim ke email Anda"
      );
    },
    onError: (error) => {
      toast.error(
        error.response?.data?.message || "Gagal mengirim kode verifikasi"
      );
    },
  });
};

export const useResetPassword = () => {
  const router = useRouter();

  return useMutation({
    mutationFn: authService.resetPassword,
    onSuccess: (response) => {
      // API response structure: { success, message }
      toast.success(
        response.data?.message || "Password berhasil direset! Silakan login."
      );
      router.push("/login");
    },
    onError: (error) => {
      toast.error(error.response?.data?.message || "Gagal reset password");
    },
  });
};

export const useChangeEmail = () => {
  const { updateUser } = useAuthContext();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: authService.changeEmail,
    onSuccess: (response) => {
      // API response structure: { success, message, data: { user } }
      const { user } = response.data.data;
      updateUser(user); // Update user di context dengan email baru
      toast.success(response.data?.message || "Email berhasil diubah");
      queryClient.invalidateQueries({ queryKey: ["profile"] });
    },
    onError: (error) => {
      toast.error(error.response?.data?.message || "Gagal mengubah email");
    },
  });
};
