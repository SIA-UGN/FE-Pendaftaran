"use client"

import * as React from "react"
import {
  AudioWaveform,
  BookOpen,
  Bot,
  Command,
  Frame,
  GalleryVerticalEnd,
  Map,
  PieChart,
  ChartPie,
  Settings2,
  SquareTerminal,
  Users,
  UserLock,
  UserPlus,
} from "lucide-react"

import {
  DropdownMenuSeparator
} from "@/components/ui/dropdown-menu"

import { NavMain } from "@/components/nav-main"
import { NavProjects } from "@/components/nav-projects"
import { NavUser } from "@/components/nav-user"
import { TeamSwitcher } from "@/components/team-switcher"
import { SidebarTrigger } from "@/components/ui/sidebar"

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar"
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
      logo: '/logo.jpg',
      plan: "Enterprise",
    },
  ],
  navMain: [
  {
    title: "Data Pendaftar",
    url: "/dashboard",
    icon: Users,
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
    title: "Data Manajer",
    url: "/dashboard/manajer",
    icon: UserLock,
    items: [
      {
        title: "Daftar Manajer",
        url: "/dashboard/manajer",
      },
      {
        title: "Detail Manajer",
        url: "/manajer/detail",
      },
      {
        title: "Performa Manajer",
        url: "/manajer/performa",
      },
    ],
  },
  {
    title: "Tambahkan Manajer",
    url: "/dashboard/manajer/tambah",
    icon: UserPlus,
    items: [
      {
        title: "Form Tambah",
        url: "/dashboard/manajer/tambah",
      },
      {
        title: "Panduan Tambah",
        url: "/manajer/tambah/panduan",
      },
      {
        title: "Riwayat Tambah",
        url: "/manajer/tambah/history",
      },
    ],
  },
  {
    title: "Statistika",
    url: "/dashboard/statistika",
    icon: ChartPie,
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
    url: "/dashboard/keuangan",
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
}

export function AppSidebar({
  ...props
}) {
  return (
    <div className="bg-[var(--light-green)] flex">
      <Sidebar collapsible="icon" {...props} className={"h-[92.5vh] mt-auto"}>
        {/* <SidebarHeader>
          <TeamSwitcher teams={data.teams} />
        </SidebarHeader> */}
        <DropdownMenuSeparator/>
        <SidebarContent>
          <NavMain items={data.navMain} />
          {/* <NavProjects projects={data.projects} /> */}
        </SidebarContent>
        <SidebarFooter>
          <NavUser user={data.user} />
        </SidebarFooter>
        <SidebarRail />
      </Sidebar>
      
      <SidebarTrigger className="-ml-1 mt-28 bg-white p-6" />
    </div>

  );
}
