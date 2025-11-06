"use client";

import * as React from "react";
import {
  AudioWaveform,
  BookOpen,
  Bot,
  Command,
  Frame,
  GalleryVerticalEnd,
  Map,
  PieChart,
  Settings2,
  SquareTerminal,
} from "lucide-react";

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
      url: "/manager",
      icon: SquareTerminal,
      isActive: true,
      items: [
        {
          title: "Semua Pendaftar",
          url: "/dashboard",
        },
        {
          title: "History Pendaftaran",
          url: "/pendaftar/history",
        },
        {
          title: "Pengaturan",
          url: "/pendaftar/settings",
        },
      ],
    },
    {
      title: "Data Pendaftar",
      url: "/manager/pendaftar",
      icon: SquareTerminal,
      isActive: true,
      items: [
        {
          title: "Semua Pendaftar",
          url: "/dashboard",
        },
        {
          title: "History Pendaftaran",
          url: "/pendaftar/history",
        },
        {
          title: "Pengaturan",
          url: "/pendaftar/settings",
        },
      ],
    },
    {
      title: "Statistik",
      url: "/manager/statistik",
      icon: Settings2,
      items: [
        {
          title: "Data Umum",
          url: "/dashboard/statistika",
        },
        {
          title: "Statistik Tim",
          url: "/statistika/team",
        },
        {
          title: "Tagihan",
          url: "/statistika/billing",
        },
        {
          title: "Batas Penggunaan",
          url: "/statistika/limits",
        },
      ],
    },
    {
      title: "Keuangan",
      url: "/manager/keuangan",
      icon: Wallet,
      items: [
        {
          title: "Laporan Keuangan",
          url: "/keuangan/laporan",
        },
        {
          title: "Transaksi",
          url: "/keuangan/transaksi",
        },
        {
          title: "Tagihan",
          url: "/keuangan/tagihan",
        },
        {
          title: "Rekap",
          url: "/keuangan/rekap",
        },
      ],
    },
    {
      title: "Broadcast",
      url: "/manager/broadcast",
      icon: Wallet,
      items: [
        {
          title: "Laporan Keuangan",
          url: "/keuangan/laporan",
        },
        {
          title: "Transaksi",
          url: "/keuangan/transaksi",
        },
        {
          title: "Tagihan",
          url: "/keuangan/tagihan",
        },
        {
          title: "Rekap",
          url: "/keuangan/rekap",
        },
      ],
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

export function ManagerSidebar({ ...props }) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <TeamSwitcher teams={data.teams} />
      </SidebarHeader>
      <DropdownMenuSeparator />
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
