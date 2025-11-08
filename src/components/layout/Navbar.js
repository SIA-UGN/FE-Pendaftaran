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

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const updateUserData = () => {
      const token = localStorage.getItem("access_token");
      const userStr = localStorage.getItem("user");

      if (token && userStr) {
        try {
          const userData = JSON.parse(userStr);
          setUser(userData);
          setIsLoggedIn(true);
        } catch (error) {
          localStorage.removeItem("user");
          setIsLoggedIn(false);
          setUser(null);
        }
      } else {
        setIsLoggedIn(false);
        setUser(null);
      }
    };

    updateUserData();

    const handleUserUpdate = (event) => {
      if (event.detail) {
        try {
          setUser(event.detail);
          setIsLoggedIn(true);
          localStorage.setItem("user", JSON.stringify(event.detail));
        } catch (error) {
          // Silent fail - localStorage error won't affect UI
        }
      } else {
        updateUserData();
      }
    };

    window.addEventListener("userUpdated", handleUserUpdate);
    window.addEventListener("storage", updateUserData);

    return () => {
      window.removeEventListener("userUpdated", handleUserUpdate);
      window.removeEventListener("storage", updateUserData);
    };
  }, []);

  const handleLogout = () => {
    logoutMutation.mutate();
    setIsLoggedIn(false);
    setUser(null);
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen((prev) => !prev);
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
                    src={user?.avatar_url || "/default-avatar-male.webp"}
                    alt={user?.name || "User avatar"}
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
                <DropdownMenuLabel>{user?.name || "User"}</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link href="/profil">Profil</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/pendaftaran">Pendaftaran</Link>
                </DropdownMenuItem>
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
            className="absolute top-[calc(100%+2px)] left-0 w-full bg-[var(--green)] text-white flex flex-col lg:hidden z-[999] border-t border-[var(--yellow)]/20 shadow-lg max-h-[calc(100vh-80px)] overflow-y-auto"
          >
            <Link
              href="/"
              onClick={() => setIsMobileMenuOpen(false)}
              className="px-6 py-3 hover:bg-white/10 transition-colors"
            >
              Home
            </Link>
            <Link
              href="/#sejarah"
              onClick={() => setIsMobileMenuOpen(false)}
              className="px-6 py-3 hover:bg-white/10 transition-colors"
            >
              Sejarah
            </Link>
            <Link
              href="/#visi-misi"
              onClick={() => setIsMobileMenuOpen(false)}
              className="px-6 py-3 hover:bg-white/10 transition-colors"
            >
              Visi-Misi
            </Link>
            <Link
              href="#"
              onClick={() => setIsMobileMenuOpen(false)}
              className="px-6 py-3 hover:bg-white/10 transition-colors"
            >
              Pimpinan Universitas
            </Link>
            <Link
              href="/pendaftaran"
              onClick={() => setIsMobileMenuOpen(false)}
              className="px-6 py-3 hover:bg-white/10 transition-colors"
            >
              Pendaftaran
            </Link>

            {isLoggedIn ? (
              <>
                <div className="px-6 py-3 border-t border-white/20">
                  <div className="flex items-center gap-3 mb-2">
                    <Avatar className="w-10 h-10">
                      <AvatarImage
                        src={user?.avatar_url || "/default-avatar-male.webp"}
                        alt={user?.name || "User avatar"}
                      />
                      <AvatarFallback>
                        {user?.name?.charAt(0)?.toUpperCase() || "U"}
                      </AvatarFallback>
                    </Avatar>
                    <span className="font-medium">{user?.name || "User"}</span>
                  </div>
                </div>
                <Link
                  href="/profil"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="px-6 py-3 hover:bg-white/10 transition-colors"
                >
                  Profil
                </Link>
                <Link
                  href="/pendaftaran"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="px-6 py-3 hover:bg-white/10 transition-colors"
                >
                  Pendaftaran
                </Link>
                <button
                  onClick={() => {
                    handleLogout();
                    setIsMobileMenuOpen(false);
                  }}
                  className="px-6 py-3 hover:bg-white/10 transition-colors text-left"
                >
                  Logout
                </button>
              </>
            ) : (
              <div className="px-6 py-3">
                <Button
                  onClick={() => {
                    router.push("/login");
                    setIsMobileMenuOpen(false);
                  }}
                  variant="secondary"
                  className="w-full"
                >
                  Login
                </Button>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
