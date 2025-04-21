"use client";

import { useUserStore } from "@/stores/auth";
import { redirect } from "next/navigation";
import { useEffect } from "react";

export default function Home() {
  const { user } = useUserStore();

  useEffect(() => {
    const authStore = localStorage.getItem("auth-storage");
    if (!authStore) redirect("/login");

    switch (user?.role) {
      case "owner":
        redirect("/stores");
      case "manager":
        redirect("/products");
      default:
        redirect("/stores");
    }
  }, [user]);

  return null;
}
