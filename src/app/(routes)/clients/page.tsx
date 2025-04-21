"use client";

import { useAuthGuard } from "@/hooks/use-auth-guard";

export default function Page() {
  useAuthGuard(["manager"]);
  return <div>Clientes</div>;
}
