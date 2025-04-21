"use client";

import * as React from "react";
import {
  AudioWaveform,
  BookOpen,
  Bot,
  Command,
  Store,
  GalleryVerticalEnd,
  Map,
  Ham,
  PieChart,
  Settings2,
  SquareTerminal,
  Bell,
  MapIcon,
  Pizza,
  CircleDollarSign,
  User,
} from "lucide-react";

import { NavMain } from "@/components/nav-main";
// import { NavProjects } from "@/components/nav-projects";
import { NavUser } from "@/components/nav-user";
import { TeamSwitcher } from "@/components/team-switcher";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar";
import { useUserStore } from "@/stores/auth";

// This is sample data.
const data = {
  user: {
    name: "shadcn",
    email: "m@example.com",
    avatar: "/avatars/shadcn.jpg",
  },
  teams: [
    {
      name: "Pizzaria",
      logo: GalleryVerticalEnd,
      plan: "Empresarial",
    },
  ],
  roleRoutes: [
    {
      role: "owner",
      routes: [
        {
          title: "Lojas",
          url: "/stores",
          icon: Store,
        },
        {
          title: "Vendas",
          url: "/sales",
          icon: CircleDollarSign,
        },
        {
          title: "Funcionários",
          url: "/employees",
          icon: User,
        },
      ],
    },
    {
      role: "manager",
      routes: [
        {
          title: "Produtos",
          url: "/products",
          icon: Pizza,
        },
        {
          title: "Ingredientes",
          url: "/ingredients",
          icon: Ham,
        },
        {
          title: "Notificações",
          url: "/notifications",
          icon: Bell,
        },
        {
          title: "Funcionários",
          url: "/employees",
          icon: User,
          roles: ["owner", "manager"],
        },
        {
          title: "Clientes",
          url: "/clients",
          icon: User,
          roles: ["owner", "manager"],
        },
      ],
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { user } = useUserStore();

  const defineRoute = () => {
    return data.roleRoutes.find((roleRoute) => roleRoute.role === user?.role)
      ?.routes;
  };

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <TeamSwitcher teams={data.teams} />
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={defineRoute() ?? []} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
