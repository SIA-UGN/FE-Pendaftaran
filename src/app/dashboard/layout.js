"use client";

import { usePathname } from "next/navigation";
import { AppSidebar } from "@/components/admin/app-sidebar";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
} from "@/components/ui/breadcrumb";
import { SidebarTrigger } from "@/components/ui/sidebar";

export default function DashboardLayout({ children }) {
  const pathname = usePathname();
  
  const segments = pathname.split('/').filter(Boolean);
  const currentPage = segments[segments.length - 1] || 'dashboard';
  
  const labelMap = {
    'dashboard': 'Dashboard',
    'data': 'Data Pendaftar dan Manager',
    'tambah': 'Pendaftaran Manager',
    'pendaftar': 'Statistika Pendaftar',
    'program-studi': "Statistika Program Studi",
    'keuangan': "Statistika Keuangan"
  };
  
  const breadcrumbLabel = labelMap[currentPage] || currentPage
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className="flex h-21 items-center gap-6 px-4 border-b bg-white fixed w-full z-10 ">
          <SidebarTrigger className="-ml-1" />
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem className="hidden md:block">
                <BreadcrumbLink
                  href="#"
                  className={
                    "font-semibold text-2xl text-[var(--green)] hover:var-[var(--green)]"
                  }
                >
                  {breadcrumbLabel}
                </BreadcrumbLink>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </header>

        <main className="flex flex-1 flex-col gap-4 p-4 pt-0 bg-[var(--light-green)] min-h-screen mt-18">
          {children}
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
}