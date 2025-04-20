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
  routes: [
    {
      title: "Lojas",
      url: "/stores",
      icon: Store,
      isActive: true,
    },
    {
      title: "Ingredientes",
      url: "/ingredients",
      icon: Ham,
      isActive: false,
    },
    {
      title: "Notificações",
      url: "/notifications",
      icon: Bell,
      isActive: false,
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <TeamSwitcher teams={data.teams} />
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.routes} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
