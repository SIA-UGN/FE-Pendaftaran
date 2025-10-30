"use client"

import { AppSidebar } from "@/components/app-sidebar"
import {
  SidebarInset,
  SidebarProvider,
} from "@/components/ui/sidebar"
import { Separator } from "@/components/ui/separator"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { SidebarTrigger } from "@/components/ui/sidebar"
import Image from "next/image"

export default function DashboardLayout({ children }) {
  return (
    <SidebarProvider>
      <header className="flex h-18 items-center gap-6 border-b bg-white fixed w-full z-10">
      <div className="bg-[var(--green)] text-[var(--yellow)] flex items-center w-[16rem] font-semibold h-full px-4">
        <Image src="/logo.jpg" alt="logo" width={50} height={50} />
          Universitas Global Nusantara
      </div>

          {/* <Separator orientation="vertical" className="h-4 m-0 mx-2" /> */}
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem className="hidden md:block">
                <BreadcrumbLink href="#" className={"font-semibold text-2xl text-[var(--green)] hover:var-[var(--green)]"}>Dashboard</BreadcrumbLink>
              </BreadcrumbItem>
              {/* <BreadcrumbSeparator className="hidden md:block" /> */}
            </BreadcrumbList>
          </Breadcrumb>
        </header>
      <AppSidebar />
      <SidebarInset>
        <main className="flex flex-1 flex-col gap-4 p-4 bg-[var(--light-green)] min-h-screen pt-12">
          
          {children}
        </main>
      </SidebarInset>
    </SidebarProvider>
  )
}
