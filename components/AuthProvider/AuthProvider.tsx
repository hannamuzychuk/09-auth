"use client"

import { checkSession, getMe } from "@/lib/api/serverApi";
import { useAuthStore } from "@/lib/store/authStore";
import { useEffect } from "react";

interface AuthStoreProps {
  children: React.ReactNode;
}

export default function AuthStore({ children }: AuthStoreProps) {
  const setUser = useAuthStore(state => state.setUser);
  const logout = useAuthStore(state => state.clearIsAuthenticated);

  useEffect(() => {
    async function getUser() {
      const isLogin = await checkSession();
      if (isLogin) {
        const user = await getMe();
        if (user) {
          setUser(user);
        }
      } else {
        logout();
      }
    }
    getUser();
  }, [setUser, logout]);

  return children;
}