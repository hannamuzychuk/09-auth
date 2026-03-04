"use client";

import { checkSession, getMe } from "@/lib/api/clientApi";
import { useAuthStore } from "@/lib/store/authStore";
import { useEffect } from "react";

interface AuthStoreProps {
  children: React.ReactNode;
}

export default function AuthProvider({ children }: AuthStoreProps) {
  const setUser = useAuthStore((state) => state.setUser);
  const logout = useAuthStore((state) => state.clearIsAuthenticated);

  useEffect(() => {
    async function getUser() {
      const session = await checkSession();

      if (session) {
        const user = await getMe();
        setUser(user);
      } else {
        logout();
      }
    }

    getUser();
  }, [setUser, logout]);

  return <>{children}</>;
}