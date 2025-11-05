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
import { getCookie, deleteCookie } from "cookies-next";

export default function Navbar() {
  const router = useRouter();
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const [user, setUser] = useState(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [mobileProfilOpen, setMobileProfilOpen] = useState(false);
  const [hasNotification, setHasNotification] = useState(true);

 useEffect(() => {
  const fetchUser = async () => {
    try {
      const token = getCookie("access_token"); 
      if (!token) throw new Error("No token");

      const res = await fetch("http://localhost:8000/api/auth/user", {
        method: "GET",
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${token}`, 
        },
      });

      if (res.status === 401) throw new Error("Unauthorized");

      const data = await res.json();
      setIsLoggedIn(true);
      setUser(data.data.user);
    } catch (err) {
      console.log("User not logged in", err);
      setIsLoggedIn(false);
      setUser(null);
    }
  };

  fetchUser();
}, []);


  const handleLogout = () => {
    deleteCookie("access_token");
    setIsLoggedIn(false);
    setUser(null);
    router.push("/");
    setIsMobileMenuOpen(false);
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

      <div className="flex gap-4 lg:gap-6 items-center">
        <div className="hidden lg:flex h-full">
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
                  <ul className="grid w-[200px] gap-4 text-center p-4">
                    <li>
                      <NavigationMenuLink asChild>
                        <Link href="/sejarah" className="block py-2 hover:text-[var(--green)]">Sejarah</Link>
                      </NavigationMenuLink>
                    </li>
                    <li>
                      <NavigationMenuLink asChild>
                        <Link href="/visi-misi" className="block py-2 hover:text-[var(--green)]">Visi-Misi</Link>
                      </NavigationMenuLink>
                    </li>
                    <li>
                      <NavigationMenuLink asChild>
                        <Link href="/pimpinan-universitas" className="block py-2 hover:text-[var(--green)]">Pimpinan Universitas</Link>
                      </NavigationMenuLink>
                    </li>
                    <li>
                      <NavigationMenuLink asChild>
                        <Link href="/fakultas" className="block py-2 hover:text-[var(--green)]">Fakultas</Link>
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

        <div className="hidden lg:flex items-center gap-4">
          {isLoggedIn ? (
            <>
              <Link href="/notifikasi" className="relative">
                <Bell className="w-5 h-5 xl:w-6 xl:h-6 cursor-pointer hover:text-white/90 text-white" />
                {hasNotification && (
                  <span className="absolute top-0 right-0 block w-2 h-2 xl:w-2.5 xl:h-2.5 bg-[var(--yellow)] rounded-full ring-1 ring-white"></span>
                )}
              </Link>
              <DropdownMenu>
                <DropdownMenuTrigger>
                  <Avatar className="w-8 h-8 xl:w-10 xl:h-10">
                    <AvatarImage src="https://github.com/shadcn.png" alt="avatar" />
                    <AvatarFallback>
                      {user?.name?.charAt(0)?.toUpperCase() || "U"}
                    </AvatarFallback>
                  </Avatar>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" alignOffset={-5} className="z-[2000] w-56">
                  <DropdownMenuLabel className="font-normal">
                    <div className="flex flex-col space-y-1">
                      <p className="text-sm font-medium">{user?.name}</p>
                      <p className="text-xs text-muted-foreground truncate">{user?.email}</p>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <Link href="/profil">Profil</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/pendaftaran">Pendaftaran</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem>Ubah Password</DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={handleLogout} className="text-red-600">
                    Logout
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </>
          ) : (
            <Link href="/login" className="text-white bg-[var(--yellow)] font-bold text-sm xl:text-base hover:bg-white py-1.5 xl:py-2 px-4 xl:px-6 rounded-lg hover:text-[var(--yellow)] transition-colors">
              Login
            </Link>
          )}
        </div>
      </div>

      <div className="flex lg:hidden items-center gap-3">
        {isLoggedIn && (
          <Link href="/notifikasi" className="relative">
            <Bell className="w-5 h-5 sm:w-6 sm:h-6 cursor-pointer hover:text-white/90 text-white" />
            {hasNotification && (
              <span className="absolute top-0 right-0 block w-2 h-2 bg-[var(--yellow)] rounded-full ring-1 ring-white"></span>
            )}
          </Link>
        )}
        <button onClick={toggleMobileMenu} className="text-white cursor-pointer p-1">
          {isMobileMenuOpen ? <X size={24} className="sm:w-7 sm:h-7" /> : <Menu size={24} className="sm:w-7 sm:h-7" />}
        </button>
      </div>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="absolute top-[calc(100%+2px)] left-0 w-full bg-[var(--green)] text-white flex flex-col lg:hidden z-[999] border-t border-[var(--yellow)]/20 shadow-lg max-h-[calc(100vh-80px)] overflow-y-auto"
          >
            <div className="py-4 px-4 space-y-1">
              <Link 
                href="/" 
                onClick={() => setIsMobileMenuOpen(false)}
                className="block py-3 px-4 hover:bg-white/10 rounded-md transition-colors"
              >
                Home
              </Link>
              
              <div className="py-2">
                <button
                  onClick={() => setMobileProfilOpen(!mobileProfilOpen)}
                  className="w-full flex items-center justify-between py-3 px-4 hover:bg-white/10 rounded-md transition-colors"
                >
                  <span>Profil</span>
                  <ChevronDown 
                    className={`w-4 h-4 transition-transform ${mobileProfilOpen ? 'rotate-180' : ''}`}
                  />
                </button>
                <AnimatePresence>
                  {mobileProfilOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                      className="overflow-hidden pl-4"
                    >
                      <Link 
                        href="/sejarah" 
                        onClick={() => setIsMobileMenuOpen(false)}
                        className="block py-2.5 px-4 hover:bg-white/10 rounded-md transition-colors text-sm"
                      >
                        Sejarah
                      </Link>
                      <Link 
                        href="/visi-misi" 
                        onClick={() => setIsMobileMenuOpen(false)}
                        className="block py-2.5 px-4 hover:bg-white/10 rounded-md transition-colors text-sm"
                      >
                        Visi-Misi
                      </Link>
                      <Link 
                        href="/pimpinan-universitas" 
                        onClick={() => setIsMobileMenuOpen(false)}
                        className="block py-2.5 px-4 hover:bg-white/10 rounded-md transition-colors text-sm"
                      >
                        Pimpinan Universitas
                      </Link>
                      <Link 
                        href="/fakultas" 
                        onClick={() => setIsMobileMenuOpen(false)}
                        className="block py-2.5 px-4 hover:bg-white/10 rounded-md transition-colors text-sm"
                      >
                        Fakultas
                      </Link>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              <Link 
                href="/pendaftaran" 
                onClick={() => setIsMobileMenuOpen(false)}
                className="block py-3 px-4 hover:bg-white/10 rounded-md transition-colors"
              >
                Pendaftaran
              </Link>

              {isLoggedIn ? (
                <>
                  <div className="border-t border-white/20 my-3"></div>
                  <div className="py-3 px-4 flex items-center gap-3">
                    <Avatar className="w-10 h-10">
                      <AvatarImage src="https://github.com/shadcn.png" alt="avatar" />
                      <AvatarFallback>
                        {user?.name?.charAt(0)?.toUpperCase() || "U"}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium truncate">{user?.name}</p>
                      <p className="text-xs text-white/70 truncate">{user?.email}</p>
                    </div>
                  </div>
                  <Link 
                    href="/profil" 
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="block py-3 px-4 hover:bg-white/10 rounded-md transition-colors"
                  >
                    Profil
                  </Link>
                  <button 
                    onClick={() => {/* Ubah password logic */}}
                    className="w-full text-left py-3 px-4 hover:bg-white/10 rounded-md transition-colors"
                  >
                    Ubah Password
                  </button>
                  <button 
                    onClick={handleLogout}
                    className="w-full text-left py-3 px-4 hover:bg-red-600/20 text-red-300 rounded-md transition-colors"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <div className="border-t border-white/20 my-3"></div>
                  <Button 
                    onClick={() => {
                      router.push("/login");
                      setIsMobileMenuOpen(false);
                    }}
                    className="w-full bg-[var(--yellow)] text-white font-bold hover:bg-white hover:text-[var(--yellow)] py-2.5"
                  >
                    Login
                  </Button>
                </>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}