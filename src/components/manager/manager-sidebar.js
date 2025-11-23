"use client";

import * as React from "react";

import { DropdownMenuSeparator } from "@/components/ui/dropdown-menu";

import { NavMain } from "@/components/nav-main";
import { NavUser } from "@/components/nav-user";
import { TeamSwitcher } from "@/components/team-switcher";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar";

import { LayoutDashboard, Users, BarChart3, Wallet, Megaphone } from "lucide-react";

const data = {
  user: {
    name: "shadcn",
    email: "m@example.com",
    avatar: "/avatars/shadcn.jpg",
  },
  teams: [
    {
      name: "Universitas Global Nusantara",
      logo: "/logo.jpg",
    },
  ],
  navMain: [
    {
      title: "Dashboard",
      url: "/manager",
      icon: LayoutDashboard,
      isActive: true,
    },
    {
      title: "Data Pendaftar",
      url: "/manager/pendaftar",
      icon: Users,
    },
    {
      title: "Broadcast",
      url: "/manager/broadcast",
      icon: Megaphone,
    },
  ],
};

export function ManagerSidebar({ ...props }) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <TeamSwitcher teams={data.teams} />
      </SidebarHeader>
      <DropdownMenuSeparator />
      <SidebarContent>
        <NavMain items={data.navMain} type={"manager"} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
