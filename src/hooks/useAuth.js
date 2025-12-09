import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { authService } from "@/services/authService";
import { profileService } from "@/services/profileService";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useAuthContext } from "@/contexts/AuthContext";

export const useAuth = () => {
  const [token, setToken] = useState(null);

  useEffect(() => {
    setToken(localStorage.getItem("access_token"));
  }, []);

  return useQuery({
    queryKey: ["auth", "user"],
    queryFn: authService.getUser,
    enabled: false,
    retry: false,
    staleTime: 5 * 60 * 1000,
  });
};

export const useLogin = () => {
  const router = useRouter();
  const queryClient = useQueryClient();
  const { updateUser } = useAuthContext();

  return useMutation({
    mutationFn: authService.login,
    onSuccess: async (response) => {
      const data = response.data.data;

      if (!data || !data.user) {
        toast.error("Login gagal. Respons tidak valid dari server.");
        return;
      }

      localStorage.setItem("access_token", data.access_token);

      try {
        const userDataToStore = {
          id: data.user.id,
          name: data.user.name,
          email: data.user.email,
          roles: data.user.roles || [],
          avatar_url: data.user.avatar_url || null,
        };

        localStorage.setItem("user", JSON.stringify(userDataToStore));
        queryClient.setQueryData(["auth", "user"], userDataToStore);
        updateUser(userDataToStore);

        window.dispatchEvent(
          new CustomEvent("userUpdated", { detail: userDataToStore })
        );
      } catch (error) {}

      const userRoles = data.user.roles || [];

      if (userRoles.includes("admin")) {
        router.push("/dashboard");
      } else if (userRoles.includes("manager")) {
        router.push("/manager");
      } else if (
        userRoles.includes("applicant") ||
        userRoles.includes("student")
      ) {
        router.push("/pendaftaran");
      } else {
        router.push("/");
      }

      setTimeout(() => {
        profileService
          .getProfile()
          .then((profileResponse) => {
            const fullUserData =
              profileResponse.data?.data?.user ||
              profileResponse.data?.data ||
              profileResponse.data;

            if (fullUserData && fullUserData.id) {
              const completeUserData = {
                id: fullUserData.id,
                name: fullUserData.name,
                email: fullUserData.email,
                roles: fullUserData.roles || [],
                avatar_url: fullUserData.avatar_url || null,
              };

              localStorage.setItem("user", JSON.stringify(completeUserData));
              queryClient.setQueryData(["auth", "user"], completeUserData);
              updateUser(completeUserData);

              window.dispatchEvent(
                new CustomEvent("userUpdated", { detail: completeUserData })
              );
            }
          })
          .catch(() => {});
      }, 500);
      queryClient.invalidateQueries({ queryKey: ["profile"] });
      toast.success("Login berhasil");
    },
    onError: (error) => {
      if (!error.response || error.response?.status >= 500) return;

      const message =
        error.response?.data?.message ||
        error.response?.data?.errors?.email?.[0] ||
        "Login gagal. Silakan coba lagi.";
      toast.error(message);
    },
  });
};

export const useRegister = () => {
  const router = useRouter();
  const queryClient = useQueryClient();
  const { updateUser } = useAuthContext();

  return useMutation({
    mutationFn: authService.register,
    onSuccess: (response) => {
      const data = response.data.data;

      localStorage.setItem("access_token", data.access_token);
      localStorage.setItem("user", JSON.stringify(data.user));
      queryClient.setQueryData(["auth", "user"], data.user);
      updateUser(data.user);
      toast.success("Registrasi berhasil");
      router.push("/pendaftaran");
    },
    onError: (error) => {
      if (!error.response || error.response?.status >= 500) return;

      const message =
        error.response?.data?.message ||
        error.response?.data?.errors?.email?.[0] ||
        "Registrasi gagal. Silakan coba lagi.";
      toast.error(message);
    },
  });
};

export const useLogout = () => {
  const router = useRouter();
  const queryClient = useQueryClient();
  const { clearUser } = useAuthContext();

  return useMutation({
    mutationFn: authService.logout,
    onSuccess: () => {
      localStorage.removeItem("access_token");
      localStorage.removeItem("user");
      queryClient.clear();
      clearUser();
      toast.success("Logout berhasil");
      router.push("/");
    },
    onError: (error) => {
      localStorage.removeItem("access_token");
      localStorage.removeItem("user");
      queryClient.clear();
      clearUser();
      router.push("/login");
    },
  });
};

export const useForgotPassword = () => {
  return useMutation({
    mutationFn: authService.forgotPassword,
    onSuccess: (data) => {
      toast.success("Link reset password telah dikirim ke email Anda!");
    },
    onError: (error) => {
      if (!error.response || error.response?.status >= 500) return;

      const message =
        error?.response?.data?.message || "Gagal mengirim link reset password.";
      toast.error(message);
    },
  });
};

export const useResetPassword = () => {
  const router = useRouter();

  return useMutation({
    mutationFn: authService.resetPassword,
    onSuccess: () => {
      toast.success("Password berhasil direset!");
      router.push("/login");
    },
    onError: (error) => {
      if (!error.response || error.response?.status >= 500) return;

      const message =
        error?.response?.data?.message || "Gagal mereset password.";
      toast.error(message);
    },
  });
};

export const useChangePassword = () => {
  return useMutation({
    mutationFn: authService.changePassword,
    onSuccess: () => {
      toast.success("Password berhasil diubah!");
    },
    onError: (error) => {
      if (!error.response || error.response?.status >= 500) return;

      const message =
        error?.response?.data?.message || "Gagal mengubah password.";
      toast.error(message);
    },
  });
};

export const useChangeEmail = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: authService.changeEmail,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["auth", "user"] });
      queryClient.invalidateQueries({ queryKey: ["profile"] });
      toast.success("Email berhasil diubah!");
    },
    onError: (error) => {
      if (!error.response || error.response?.status >= 500) return;

      const message = error?.response?.data?.message || "Gagal mengubah email.";
      toast.error(message);
    },
  });
};
