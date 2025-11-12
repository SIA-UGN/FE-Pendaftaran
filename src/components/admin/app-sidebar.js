"use client";

import * as React from "react";
import { LayoutDashboard } from "lucide-react";
import { UsersRound } from "lucide-react";
import { FilePlus } from "lucide-react";
import { WalletMinimal } from "lucide-react";
import { UserRoundCog } from "lucide-react";
import { ChartLine } from "lucide-react";
import { Frame } from "lucide-react";
import { PieChart } from "lucide-react";
import { Map } from "lucide-react";

import { DropdownMenuSeparator } from "@/components/ui/dropdown-menu";

import { NavMain } from "@/components/nav-main";
import { NavProjects } from "@/components/nav-projects";
import { NavUser } from "@/components/nav-user";
import { TeamSwitcher } from "@/components/team-switcher";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar";
import { Wallet } from "lucide-react";

// This is sample data.
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
      plan: "Enterprise",
    },
  ],
  navMain: [
    {
      title: "Dashboard",
      url: "/dashboard",
      icon: LayoutDashboard,
      isActive: true,
    },
    {
      title: "Data Pendaftar & Manager",
      url: "/dashboard/data",
      icon: UsersRound,
      isActive: true,
    },
    {
      title: "Edit Form Pendaftaran",
      url: "/dashboard/edit/pendaftaran",
      icon: FilePlus,
      isActive: true,
    },
    {
      title: "Edit Metode Pembayaran",
      url: "/dashboard/edit/pembayaran",
      icon: WalletMinimal,
      isActive: true,
    },
    {
      title: "Pendaftaran Manager",
      url: "/dashboard/manajer/tambah",
      icon: UserRoundCog,
    },
    {
      title: "Statistik",
      url: "/dashboard/statistik",
      icon: ChartLine,
    },
  ],
  projects: [
    {
      name: "Design Engineering",
      url: "#",
      icon: Frame,
    },
    {
      name: "Sales & Marketing",
      url: "#",
      icon: PieChart,
    },
    {
      name: "Travel",
      url: "#",
      icon: Map,
    },
  ],
};

export function AppSidebar({ ...props }) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <TeamSwitcher teams={data.teams} />
      </SidebarHeader>
      <DropdownMenuSeparator className={"bg-[var(--yellow)]"}/>
      <SidebarContent>
        <NavMain items={data.navMain} />
        {/* <NavProjects projects={data.projects} /> */}
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
