"use client";

import * as React from "react";
import {useState} from 'react'
import Link from "next/link";
import { CircleCheckIcon, CircleHelpIcon, CircleIcon } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Bell } from "lucide-react";
import Image from "next/image";

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";  

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export default function Navbar() {

  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <nav className="w-full flex items-center justify-between px-5 bg-[var(--green)] z-[1000] fixed top-0">
      <div className="py-6">
        <Link href='/' className="flex items-center gap-3">
          <Image 
            src={"/logo.jpg"} 
            width={40}
            height={40}
            alt="Logo"
          ></Image>
          <p className="text-[var(--cream)] font-bold text-xl">Universitas Global Nusantara</p>
        </Link>
      </div>
      <NavigationMenu viewport={false} className={""}>
        <NavigationMenuList className={"w-fit"}>
          <NavigationMenuItem>
            <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
              <Link href="/">Home</Link>
            </NavigationMenuLink>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <NavigationMenuTrigger>Profil</NavigationMenuTrigger>
            <NavigationMenuContent>
              <ul className="grid w-[200px] gap-4 text-center">
                <li>
                  <NavigationMenuLink asChild>
                    <Link href="/#sejarah">Sejarah</Link>
                  </NavigationMenuLink>
                  <NavigationMenuLink asChild>
                    <Link href="/#visi-misi">Visi-Misi</Link>
                  </NavigationMenuLink>
                  <NavigationMenuLink asChild>
                    <Link href="#">Pimpinan Universitas</Link>
                  </NavigationMenuLink>
                </li>
              </ul>
            </NavigationMenuContent>
          </NavigationMenuItem>
          <NavigationMenuItem>
              <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
                <Link href="#">Fakultas A</Link>
              </NavigationMenuLink>
            </NavigationMenuItem>
          <NavigationMenuItem>
            <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
              <Link href="/pendaftaran">Pendaftaran</Link>
            </NavigationMenuLink>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
      { isLoggedIn ? (
        <div className="flex items-center gap-4 py-6">
          <div className="flex items-center gap-4">
            <Bell className="w-6 h-6 cursor-pointer hover:text-white/90 text-white" />
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger>
              <Avatar>
                <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start" alignOffset={14}>
              <DropdownMenuLabel>faradisy20@gmail.com</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Pendaftaran</DropdownMenuItem>
              <DropdownMenuItem>Ubah Password</DropdownMenuItem>
              <DropdownMenuItem>Logout</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      ) : (
        <div>
            <Link href="/login" className="text-[var(--cream)] font-bold text-md">Login</Link>
        </div>
      )}
      
    </nav>
  );
}

function ListItem({ title, children, href, ...props }) {
  return (
    <li {...props}>
      <NavigationMenuLink asChild>
        <Link href={href}>
          <div className="text-sm leading-none font-medium">{title}</div>
          <p className="text-muted-foreground line-clamp-2 text-sm leading-snug">{children}</p>
        </Link>
      </NavigationMenuLink>
    </li>
  );
}