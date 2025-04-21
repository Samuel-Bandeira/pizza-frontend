"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore, useUserStore } from "@/stores/auth";

export function useAuthGuard(roles: string[]) {
  const { user } = useUserStore();
  const router = useRouter();
  const accessToken = useAuthStore((s) => s.accessToken);

  useEffect(() => {
    if (!accessToken || !roles.includes(String(user?.role))) {
      router.replace("/");
    }
  }, [accessToken]);
}
