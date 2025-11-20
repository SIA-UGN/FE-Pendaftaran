"use client";

import * as React from "react";
import { ChevronsUpDown, Plus } from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";

import Image from "next/image";
import Link from "next/link";

export function TeamSwitcher({ teams }) {
  const { isMobile } = useSidebar();

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <Link href="/" className="cursor-pointer">
            <SidebarMenuButton
              size="lg"
              className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground hover:bg-transparent w-fit h-fit focus:bg-transparent py-2"
            >
              <div className="flex aspect-square size-12 items-center justify-center rounded-lg overflow-hidden">
                <Image
                  src="/logo.jpg"
                  alt="Logo"
                  width={60}
                  height={60}
                  className="rounded-lg object-cover"
                />
              </div>
              <div className="grid flex-1 text-left text-sm leading-tight text-wrap">
                <span className="truncate font-semibold text-[var(--yellow)] text-wrap text-md">
                  Universitas Global Nusantara
                </span>
              </div>
            </SidebarMenuButton>
          </Link>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
