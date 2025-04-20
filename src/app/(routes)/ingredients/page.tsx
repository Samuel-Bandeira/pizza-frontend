"use client";

import { useAuthGuard } from "@/hooks/use-auth-guard";

export default function Page() {
  useAuthGuard();
  return <div>Ingredientes</div>;
}
