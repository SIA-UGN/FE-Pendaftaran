"use client";

import { Triangle } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

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
import { cn } from "@/lib/utils";

export function NavMain({ items, type }) {
  const pathname = usePathname();

  // Helper function untuk check apakah path aktif
  const isActivePath = (url) => {
    // Exact match untuk home/dashboard
    if (url === "/dashboard" || url === "/manager") {
      return pathname === url;
    }
    // Untuk path lainnya, check dengan startsWith
    return pathname === url || pathname.startsWith(url + "/");
  };

  // Helper function untuk check apakah salah satu submenu Statistik aktif
  const isStatistikActive = () => {
    const statistikPaths = [
      `/dashboard/statistik`,
      `/manager/statistik`,
    ];
    return statistikPaths.some(path => pathname.startsWith(path));
  };

  // Submenu items untuk Statistik
  const statistikSubItems = [
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
  ];

  return (
    <SidebarGroup>
      <SidebarMenu>
        {items.map((item) => {
          const isItemActive = item.title === "Statistik" ? isStatistikActive() : isActivePath(item.url);
          
          return (
            <Collapsible
              key={item.title}
              asChild
              defaultOpen={item.isActive || isStatistikActive()}
              className="group/collapsible"
            >
              <SidebarMenuItem>
                {/* Jika item.title === "Statistik", gunakan CollapsibleTrigger */}
                {item.title === "Statistik" ? (
                  <>
                    <CollapsibleTrigger asChild>
                      <SidebarMenuButton
                        tooltip={item.title}
                        className={cn(
                          "group/button",
                          isStatistikActive() && "!bg-[var(--yellow)] !text-[var(--green)] hover:!bg-[var(--yellow)] hover:!text-[var(--green)]"
                        )}
                      >
                        {item.icon && <item.icon className={cn(
                          isStatistikActive() && "!text-[var(--green)]"
                        )} />}
                        <span>{item.title}</span>

                        <Triangle
                          fill="currentColor"
                          stroke="none"
                          className={cn(
                            "cursor-pointer ml-auto transition-transform duration-200 rotate-90 group-data-[state=open]/collapsible:rotate-180",
                            isStatistikActive() 
                              ? "!fill-[var(--green)]" 
                              : "fill-[var(--yellow)] group-hover/button:fill-[var(--green)] group-focus/button:fill-[var(--green)]"
                          )}
                        />
                      </SidebarMenuButton>
                    </CollapsibleTrigger>

                    <CollapsibleContent>
                      <SidebarMenuSub>
                        {statistikSubItems.map((sub) => {
                          const isSubActive = isActivePath(sub.url);
                          
                          return (
                            <SidebarMenuSubItem key={sub.title}>
                              <SidebarMenuSubButton 
                                asChild
                                isActive={isSubActive}
                                className={cn(
                                  "text-white transition-all duration-200",
                                  isSubActive && "!bg-[var(--yellow)]/20 !border-l-4 !border-[var(--yellow)] !font-bold !text-[var(--yellow)]"
                                )}
                              >
                                <Link href={sub.url}>
                                  <sub.icon className={cn(
                                    "stroke-white !text-white transition-all duration-200",
                                    isSubActive && "!stroke-[var(--yellow)] !text-[var(--yellow)]"
                                  )} />
                                  <span>
                                    {sub.title}
                                  </span>
                                </Link>
                              </SidebarMenuSubButton>
                            </SidebarMenuSubItem>
                          );
                        })}
                      </SidebarMenuSub>
                    </CollapsibleContent>
                  </>
                ) : (
                  // Jika bukan Statistik, tampilkan tombol biasa langsung ke link
                  <SidebarMenuButton 
                    asChild 
                    tooltip={item.title}
                    isActive={isItemActive}
                    className={cn(
                      "transition-all duration-200",
                      isItemActive && "!bg-[var(--yellow)] !text-[var(--green)] hover:!bg-[var(--yellow)] hover:!text-[var(--green)]"
                    )}
                  >
                    <Link href={item.url}>
                      {item.icon && <item.icon className={cn(
                        "transition-all duration-200",
                        isItemActive && "!text-[var(--green)]"
                      )} />}
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                )}
              </SidebarMenuItem>
            </Collapsible>
          );
        })}
      </SidebarMenu>
    </SidebarGroup>
  );
}