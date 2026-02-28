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
    'pendaftar': 'Statistik Pendaftar',
    'program-studi': "Statistik Program Studi",
    'keuangan': "Statistik Keuangan"
  };
  
  const breadcrumbLabel = labelMap[currentPage] || currentPage
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header
          className="flex h-16 items-center gap-4 px-4 border-b fixed w-full z-10"
          style={{ backgroundColor: '#015023', borderColor: '#DABC4E', fontFamily: 'Urbanist, system-ui, sans-serif' }}
        >
          <SidebarTrigger className="-ml-1 text-white hover:text-[#DABC4E]" />
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem className="hidden md:block">
                <BreadcrumbLink
                  href="#"
                  className="font-semibold text-xl"
                  style={{ color: '#DABC4E' }}
                >
                  {breadcrumbLabel}
                </BreadcrumbLink>
              </BreadcrumbItem>
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