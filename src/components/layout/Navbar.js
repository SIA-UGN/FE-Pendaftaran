"use client";

import * as React from "react";
import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Bell, Menu, X, ChevronDown } from "lucide-react";
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
import { useLogout } from "@/hooks/useAuth";

export default function Navbar() {
  const router = useRouter();
  const logoutMutation = useLogout();
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const [user, setUser] = useState(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [mobileProfilOpen, setMobileProfilOpen] = useState(false);
  const [hasNotification, setHasNotification] = useState(true);

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
    logoutMutation.mutate();
    setIsLoggedIn(false);
    setUser(null);
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen((prev) => !prev);
    setMobileProfilOpen(false);
  };

  return (
    <nav className="w-full flex items-center justify-between px-4 sm:px-6 md:px-8 lg:px-12 bg-[var(--green)] z-[1000] fixed top-0 border-b-2 border-[var(--yellow)]">
      <div className="py-3 sm:py-4 flex items-center gap-2 sm:gap-3">
        <Link href="/" className="flex items-center gap-2 sm:gap-3">
          <Image
            src="/logo.svg"
            width={45}
            height={56}
            alt="Logo"
            className="w-[45px] h-[56px] sm:w-[50px] sm:h-[62px] md:w-[60px] md:h-[75px]"
          />
          <p className="text-[var(--cream)] font-medium text-sm sm:text-base md:text-lg leading-tight hidden sm:block max-w-[150px] md:max-w-[200px]">
            Universitas Global Nusantara
          </p>
        </Link>
      </div>

      <div className="flex md:hidden items-center">
        <button
          onClick={toggleMobileMenu}
          className="text-white cursor-pointer"
        >
          {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      <div className="hidden md:flex gap-6">
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
                  <DropdownMenuLabel>{user?.name}</DropdownMenuLabel>
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
          <button
            onClick={toggleMobileMenu}
            className="md:hidden text-white cursor-pointer p-1"
          >
            {isMobileMenuOpen ? (
              <X size={24} className="sm:w-7 sm:h-7" />
            ) : (
              <Menu size={24} className="sm:w-7 sm:h-7" />
            )}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="absolute top-[calc(100%+2px)] left-0 w-full bg-[var(--green)]/95 backdrop-blur-md text-white flex flex-col lg:hidden z-[999] border-t border-[var(--yellow)]/30 shadow-2xl rounded-b-2xl overflow-hidden max-h-[calc(100vh-80px)] overflow-y-auto"
          >
            <nav className="flex flex-col divide-y divide-[var(--yellow)]/10">
              {[
                { href: "/", label: "Home" },
                { href: "/sejarah", label: "Sejarah" },
                { href: "/visi-misi", label: "Visi-Misi" },
                { href: "/pimpinan-universitas", label: "Pimpinan Universitas" },
                { href: "/pendaftaran", label: "Pendaftaran" },
              ].map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="px-6 py-4 text-lg font-medium tracking-wide hover:bg-[var(--yellow)] hover:text-[var(--green)] transition-colors duration-200"
                >
                  {item.label}
                </Link>
              ))}

              <div className="p-4 flex flex-col gap-3 bg-[var(--green)]/90">
                {isLoggedIn ? (
                  <>
                    <span className="text-sm text-[var(--yellow)] italic">
                      Welcome,{" "}
                      <span className="font-semibold">{user?.name}</span>
                    </span>
                    <button
                      onClick={handleLogout}
                      className="px-4 py-2 rounded-xl bg-[var(--yellow)] text-[var(--green)] font-semibold hover:bg-white transition-all duration-200 shadow-md"
                    >
                      Logout
                    </button>
                  </>
                ) : (
                  <Button
                    onClick={() => router.push("/login")}
                    className="w-full bg-[var(--yellow)] text-[var(--green)] hover:bg-white transition-all duration-200 font-semibold rounded-xl shadow-md"
                  >
                    Login
                  </Button>
                )}
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
