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
  if (pathname.startsWith("/manager/broadcast")) return "Broadcast";
  return "Dashboard";
}

export default function DashboardLayout({ children }) {
  const pathname = usePathname();
  const pageTitle = getPageTitle(pathname);

  return (
    // <ProtectedRoute allowedRoles={["manager"]}>
    <SidebarProvider>
      <ManagerSidebar />
      <SidebarInset>
        <header
          className="flex h-16 items-center gap-4 px-4 border-b fixed w-full z-10"
          style={{ backgroundColor: '#015023', borderColor: '#DABC4E', fontFamily: 'Urbanist, system-ui, sans-serif' }}
        >
          <SidebarTrigger className="-ml-1 text-white hover:text-[#DABC4E]" />
          <Separator orientation="vertical" className="h-4 m-0" style={{ backgroundColor: 'rgba(218,188,78,0.4)' }} />
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem className="hidden md:block">
                <BreadcrumbLink
                  href={pathname}
                  className="font-semibold text-xl"
                  style={{ color: '#DABC4E' }}
                >
                  {pageTitle}
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator className="hidden md:block" />
            </BreadcrumbList>
          </Breadcrumb>
        </header>

        <main
          className="flex flex-1 flex-col gap-4 p-4 pt-0 min-h-screen mt-16"
          style={{ backgroundColor: '#E6EEE9', fontFamily: 'Urbanist, system-ui, sans-serif' }}
        >
          {children}
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
}
