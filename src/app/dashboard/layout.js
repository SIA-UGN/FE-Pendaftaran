"use client";

import { AppSidebar } from "@/components/app-sidebar";
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
import Image from "next/image";

export default function DashboardLayout({ children }) {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className="flex h-18 items-center gap-6 px-4 border-b bg-white fixed w-full z-10">
          <SidebarTrigger className="-ml-1" />
          {/* <Separator orientation="vertical" className="h-4 m-0 mx-2" /> */}
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem className="hidden md:block">
                <BreadcrumbLink
                  href="#"
                  className={
                    "font-semibold text-2xl text-[var(--green)] hover:var-[var(--green)]"
                  }
                >
                  Dashboard
                </BreadcrumbLink>
              </BreadcrumbItem>
              {/* <BreadcrumbSeparator className="hidden md:block" /> */}
            </BreadcrumbList>
          </Breadcrumb>
        </header>

        <main className="flex flex-1 flex-col gap-4 p-4 pt-0 bg-muted/30 min-h-screen mt-18">
          {children}
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
}
