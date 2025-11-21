"use client";

import { Triangle } from "lucide-react";
import Link from "next/link";

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  SidebarGroup,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from "@/components/ui/sidebar";

import { UserRound } from "lucide-react";
import { GraduationCap } from "lucide-react";
import { Banknote } from "lucide-react";

export function NavMain({ items, type }) {
  return (
    <SidebarGroup>
      <SidebarMenu>
        {items.map((item) => (
          <Collapsible
            key={item.title}
            asChild
            defaultOpen={item.isActive}
            className="group/collapsible"
          >
            <SidebarMenuItem>
              {/* Jika item.title === "Statistik", gunakan CollapsibleTrigger */}
              {item.title === "Statistik" ? (
                <>
                  <CollapsibleTrigger asChild>
                    <SidebarMenuButton
                      tooltip={item.title}
                      className="group/button"
                    >
                      {item.icon && <item.icon />}
                      <span>{item.title}</span>

                      <Triangle
                        fill="currentColor"
                        stroke="none"
                        className="
                          cursor-pointer ml-auto
                          transition-transform duration-200
                          rotate-90
                          group-data-[state=open]/collapsible:rotate-180
                          fill-[var(--yellow)]
                          group-hover/button:fill-[var(--green)]
                          group-focus/button:fill-[var(--green)]
                          
                        "
                      />
                    </SidebarMenuButton>
                  </CollapsibleTrigger>

                  <CollapsibleContent>
                    <SidebarMenuSub>
                      {[
                        {
                          title: "Statistika Pendaftar",
                          url:
                            type === "manager"
                              ? "/manager/statistik/pendaftar"
                              : "/dashboard/statistik/pendaftar",
                          icon: UserRound,
                        },
                        {
                          title: "Statistika Prodi",
                          url:
                            type === "manager"
                              ? "/manager/statistik/program-studi"
                              : "/dashboard/statistik/program-studi",
                          icon: GraduationCap,
                        },
                        {
                          title: "Statistika Keuangan",
                          url:
                            type === "manager"
                              ? "/manager/statistik/keuangan"
                              : "/dashboard/statistik/keuangan",
                          icon: Banknote,
                        },
                      ].map((sub) => (
                        <SidebarMenuSubItem key={sub.title}>
                          <SidebarMenuSubButton asChild>
                            <Link href={sub.url} className="text-white">
                              <sub.icon className="stroke-white !text-white" />
                              <span>{sub.title}</span>
                            </Link>
                          </SidebarMenuSubButton>
                        </SidebarMenuSubItem>
                      ))}
                    </SidebarMenuSub>
                  </CollapsibleContent>
                </>
              ) : (
                // Jika bukan Statistik, tampilkan tombol biasa langsung ke link
                <SidebarMenuButton asChild tooltip={item.title}>
                  <Link href={item.url}>
                    {item.icon && <item.icon />}
                    <span>{item.title}</span>
                  </Link>
                </SidebarMenuButton>
              )}
            </SidebarMenuItem>
          </Collapsible>
        ))}
      </SidebarMenu>
    </SidebarGroup>
  );
}
