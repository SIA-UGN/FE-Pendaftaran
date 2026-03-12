"use client";

import * as React from "react";
import { LayoutDashboard, UsersRound, WalletMinimal, UserRoundCog, ChartLine } from "lucide-react";

import { NavMain } from "@/components/nav-main";
import { NavUser } from "@/components/nav-user";
import { TeamSwitcher } from "@/components/team-switcher";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
  SidebarClose
} from "@/components/ui/sidebar";

const data = {
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
};

export function AppSidebar({ ...props }) {
  return (
    <Sidebar collapsible="icon" {...props} className="border-r border-[#E6EEE9]">
      <SidebarHeader>
        <SidebarClose />
        <TeamSwitcher />
      </SidebarHeader>
      <div className="mx-4 mb-3 border-t" style={{ borderColor: '#E6EEE9' }} />
      <SidebarContent>
        <NavMain items={data.navMain} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
