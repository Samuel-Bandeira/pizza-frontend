"use client";

import { useAuthGuard } from "@/hooks/use-auth-guard";

export default function Page() {
  useAuthGuard(["owner"]);
  return <div>Vendas</div>;
}
