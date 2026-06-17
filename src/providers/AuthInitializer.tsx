import { useEffect, type ReactNode } from "react";
import { useQuery } from "@tanstack/react-query";
import { useAuthStore } from "@/stores/auth.store";
import { apiClient } from "@/lib/api-client";
import type { User } from "@/lib/types";

async function fetchProfile(): Promise<User> {
  const { data } = await apiClient.get<User>("/auth/profile");
  return data;
}

export function AuthInitializer({ children }: { children: ReactNode }) {
  const token = useAuthStore((s) => s.token);
  const setUser = useAuthStore((s) => s.setUser);
  const logout = useAuthStore((s) => s.logout);

  const { error } = useQuery({
    queryKey: ["auth", "profile"],
    queryFn: async () => {
      const user = await fetchProfile();
      setUser(user);
      return user;
    },
    enabled: !!token,
    retry: false,
    staleTime: 5 * 60 * 1000,
  });

  useEffect(() => {
    if (error) {
      logout();
    }
  }, [error, logout]);

  return <>{children}</>;
}
