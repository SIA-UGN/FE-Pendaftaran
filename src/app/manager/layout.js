"use client";

import { usePathname } from "next/navigation";
import { ManagerSidebar } from "@/components/manager/manager-sidebar";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { Separator } from "@/components/ui/separator";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { SidebarTrigger } from "@/components/ui/sidebar";

function getPageTitle(pathname) {
  if (pathname === "/manager") return "Dashboard";
  if (pathname.startsWith("/manager/pendaftar")) return "Data Pendaftar";
  if (pathname.startsWith("/manager/statistik")) return "Statistik";
  if (pathname.startsWith("/manager/keuangan")) return "Keuangan";
  return "Dashboard";
}

export default function DashboardLayout({ children }) {
  const pathname = usePathname();
  const pageTitle = getPageTitle(pathname);

  return (
    <SidebarProvider>
      <ManagerSidebar />
      <SidebarInset>
        <header className="flex h-18 items-center gap-6 px-4 border-b bg-white fixed w-full z-10">
          <SidebarTrigger className="-ml-1 text-xl" />
          <Separator orientation="vertical" className="h-4 m-0 mx-2" />
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem className="hidden md:block">
                <BreadcrumbLink
                  href={pathname}
                  className="font-semibold text-2xl text-[var(--green)]"
                >
                  {pageTitle}
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator className="hidden md:block" />
            </BreadcrumbList>
          </Breadcrumb>
        </header>

        <main className="flex flex-1 flex-col gap-4 p-4 pt-0 bg-[var(--green-background)] min-h-screen mt-18">
          {children}
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
}
