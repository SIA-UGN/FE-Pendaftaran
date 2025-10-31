import { createContext, useContext, useEffect, useState } from "react";
import { useAuth } from "@/hooks/useAuth";

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  const [user, setUSer] = useState(null);
  const [loading, setLoading] = useState(true);

  const { data: authData, isLoading, error } = useAuth();

  useEffect(() => {
    if (authData?.data?.user) {
      setUSer(authData.data.user);
    } else {
      setUSer(null);
    }
    setLoading(isLoading);
  }, [authData, isLoading]);

  const hasRole = (role) => {
    return user?.roles?.includes(role) || false;
  };

  const hasPermission = (permission) => {
    return user?.permissions?.includes(permission) || false;
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        hasRole,
        hasPermission,
        isAuthenticated: !!user,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuthContext must be used within an AuthProvider");
  }
  return context;
};
