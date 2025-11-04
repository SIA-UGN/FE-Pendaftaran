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
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";

export default function Navbar() {
  const router = useRouter();
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const [user, setUser] = useState(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const loadUser = () => {
      try {
        const token = localStorage.getItem("access_token");
        const storedUser = localStorage.getItem("user");

        if (!token || !storedUser) throw new Error("No token");

        setIsLoggedIn(true);
        setUser(JSON.parse(storedUser));
      } catch (err) {
        console.log("User not logged in", err);
        setIsLoggedIn(false);
        setUser(null);
      }
    };

    loadUser();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("access_token");
    localStorage.removeItem("user");
    setIsLoggedIn(false);
    setUser(null);
    router.push("/");
  };

  const toggleMobileMenu = () => setIsMobileMenuOpen((prev) => !prev);

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
              <NavigationMenuLink
                asChild
                className={navigationMenuTriggerStyle()}
              >
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
                      <Link href="/pimpinan-universitas">
                        Pimpinan Universitas
                      </Link>
                    </NavigationMenuLink>
                    <NavigationMenuLink asChild>
                      <Link href="/fakultas">Fakultas</Link>
                    </NavigationMenuLink>
                  </li>
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuLink
                asChild
                className={navigationMenuTriggerStyle()}
              >
                <Link href="/pendaftaran">Pendaftaran</Link>
              </NavigationMenuLink>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
      </div>

      <div className="flex md:hidden items-center">
        <button
          onClick={toggleMobileMenu}
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
                  <AvatarImage
                    src="https://github.com/shadcn.png"
                    alt="avatar"
                  />
                  <AvatarFallback>
                    {user?.name?.charAt(0)?.toUpperCase() || "U"}
                  </AvatarFallback>
                </Avatar>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                align="start"
                alignOffset={14}
                className="z-[2000]"
              >
                <DropdownMenuLabel>{user?.email}</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link href="/profil">Profil</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/pendaftaran">Pendaftaran</Link>
                </DropdownMenuItem>
                <DropdownMenuItem>Ubah Password</DropdownMenuItem>
                <DropdownMenuItem onClick={handleLogout}>
                  Logout
                </DropdownMenuItem>
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

      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="absolute top-[72px] left-0 w-full bg-[var(--green)] text-white flex flex-col items-center gap-6 py-5 md:hidden z-[999]"
          >
            <Link href="/" onClick={() => setIsMobileMenuOpen(false)}>
              Home
            </Link>
            <Link href="/#sejarah" onClick={() => setIsMobileMenuOpen(false)}>
              Sejarah
            </Link>
            <Link href="/#visi-misi" onClick={() => setIsMobileMenuOpen(false)}>
              Visi-Misi
            </Link>
            <Link href="#" onClick={() => setIsMobileMenuOpen(false)}>
              Pimpinan Universitas
            </Link>
            <Link
              href="/pendaftaran"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Pendaftaran
            </Link>

            {isLoggedIn ? (
              <>
                <span>Welcome, {user?.name}</span>
                <button onClick={handleLogout}>Logout</button>
              </>
            ) : (
              <Button onClick={() => router.push("/login")}>Login</Button>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
