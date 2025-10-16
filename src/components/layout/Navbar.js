"use client";

import * as React from "react";
import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Bell, Menu, X } from "lucide-react";
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
} from "@/components/ui/dropdown-menu";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";

export default function Navbar() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      fetch("http://localhost:8000/api/auth/user", {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/json",
        },
      })
        .then((res) => {
          if (res.ok) return res.json();
          throw new Error("Token invalid");
        })
        .then((data) => {
          setIsLoggedIn(true);
          setUser(data.data.user);
        })
        .catch(() => {
          setIsLoggedIn(false);
          localStorage.removeItem("token");
        });
    }
  }, []);

  const handleLogout = async () => {
    const token = localStorage.getItem("token");
    if (!token) return;

    await fetch("http://localhost:8000/api/auth/logout", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
      },
    });

    localStorage.removeItem("token");
    setIsLoggedIn(false);
    setUser(null);
  };

  return (
    <nav className="w-full flex items-center justify-between px-12 bg-[var(--green)] z-[1000] fixed top-0">
      <div className="py-4 flex items-center gap-3">
        <Link href="/" className="flex items-center gap-3">
          <Image src="/logo.svg" width={60} height={60} alt="Logo" />
          <p className="text-[var(--cream)] font-regular text-lg hidden sm:block">
            Universitas Global Nusantara
          </p>
        </Link>
      </div>

      <div className="hidden md:flex">
        <NavigationMenu>
          <NavigationMenuList className="w-fit">
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
                      <Link href="/sejarah">Sejarah</Link>
                    </NavigationMenuLink>
                    <NavigationMenuLink asChild>
                      <Link href="/visi-misi">Visi-Misi</Link>
                    </NavigationMenuLink>
                    <NavigationMenuLink asChild>
                      <Link href="/pimpinan-universitas">Pimpinan Universitas</Link>
                    </NavigationMenuLink>
                  </li>
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
                <Link href="/pendaftaran">Pendaftaran</Link>
              </NavigationMenuLink>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
      </div>

      <div className="flex md:hidden items-center">
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="text-white cursor-pointer"
        >
          {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      <div className="hidden md:flex items-center gap-4">
        {isLoggedIn ? (
          <>
            <Bell className="w-6 h-6 cursor-pointer hover:text-white/90 text-white" />
            <DropdownMenu>
              <DropdownMenuTrigger>
                <Avatar>
                  <AvatarImage src="https://github.com/shadcn.png" alt="avatar" />
                  <AvatarFallback>
                    {user?.name?.charAt(0)?.toUpperCase() || "U"}
                  </AvatarFallback>
                </Avatar>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start" alignOffset={14} className="z-[2000]">
                <DropdownMenuLabel>{user?.email}</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link href="/pendaftaran">Pendaftaran</Link>
                </DropdownMenuItem>
                <DropdownMenuItem>Ubah Password</DropdownMenuItem>
                <DropdownMenuItem onClick={handleLogout}>Logout</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </>
        ) : (
          <Link
            href="/login"
            className="text-[var(--cream)] font-bold text-md hover:underline"
          >
            Login
          </Link>
        )}
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="absolute top-[72px] left-0 w-full bg-[var(--green)] text-white flex flex-col items-center gap-6 py-5 md:hidden z-[999]"
          >
            <Link href="/" onClick={() => setIsMobileMenuOpen(false)}>Home</Link>
            <Link href="/#sejarah" onClick={() => setIsMobileMenuOpen(false)}>Sejarah</Link>
            <Link href="/#visi-misi" onClick={() => setIsMobileMenuOpen(false)}>Visi-Misi</Link>
            <Link href="#" onClick={() => setIsMobileMenuOpen(false)}>Pimpinan Universitas</Link>
            <Link href="/pendaftaran" onClick={() => setIsMobileMenuOpen(false)}>Pendaftaran</Link>

            {isLoggedIn ? (
              <>
                <Link href="#">Ubah Password</Link>
                <Button variant={"destructive"} onClick={handleLogout}>Logout</Button>
              </>
            ) : (
              <Link href="/login" onClick={() => setIsMobileMenuOpen(false)} className="w-3/4">
                <Button variant={"yellow"} size={"default"} className={"w-full"}>
                  Login
                </Button>
              </Link>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
