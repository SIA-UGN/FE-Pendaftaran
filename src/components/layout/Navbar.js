"use client";

import * as React from "react";
import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
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
import { useUnreadCount } from "@/hooks/useNotification";
import { cn } from "@/lib/utils";

export default function Navbar() {
  const router = useRouter();
  const pathname = usePathname();
  const logoutMutation = useLogout();
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const [user, setUser] = useState(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [mobileProfilOpen, setMobileProfilOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    const handleResize = () => { if (window.innerWidth >= 768) setIsMobileMenuOpen(false); };
    window.addEventListener('scroll', handleScroll);
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const shouldFetchNotifications = isLoggedIn && user?.role === "pendaftar";
  const {
    data: unreadNotificationsData,
    isError,
    error,
  } = useUnreadCount(shouldFetchNotifications);

  // Helper function untuk check apakah path aktif
  const isActivePath = (path) => {
    if (path === "/") {
      return pathname === "/";
    }
    return pathname.startsWith(path);
  };

  const isProfilMenuActive = () => {
    const profilPaths = [
      "/sejarah",
      "/visi-misi",
      "/pimpinan-universitas",
      "/fakultas",
    ];
    return profilPaths.some((path) => pathname.startsWith(path));
  };

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
        } catch (error) {}
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

  if (isError) return <div className="bg-[var(--green)]"></div>;

  const unreadNotifications = unreadNotificationsData?.data?.data?.unread_count;

  const handleLogout = () => {
    logoutMutation.mutate();
    setIsLoggedIn(false);
    setUser(null);
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen((prev) => !prev);
  };

  return (
    <div
      className={cn(
        "w-full transition-all duration-300",
        isScrolled
          ? "fixed top-0 left-0 right-0 z-[1000] py-3 sm:py-4"
          : "relative"
      )}
    >
    <nav
      className={cn(
        "w-full flex items-center justify-between px-4 sm:px-6 md:px-8 lg:px-12 transition-all duration-300 ease-in-out",
        isScrolled
          ? "mx-auto rounded-[12px] sm:rounded-[18px] max-w-[calc(100%-2rem)] sm:max-w-[calc(100%-3rem)] lg:max-w-[calc(100%-4rem)]"
          : "rounded-b-[16px] sm:rounded-b-[20px]"
      )}
      style={{
        backgroundColor: '#015023',
        boxShadow: isScrolled
          ? '0 10px 40px rgba(0,0,0,0.15), 0 4px 12px rgba(0,0,0,0.1)'
          : '0 4px 16px rgba(0,0,0,0.18)'
      }}
    >
      <div className="py-1 sm:py-1 flex items-center gap-2 sm:gap-3">
        <Link href="/" className="flex items-center gap-2 sm:gap-3">
          <Image
            src="/logo.svg"
            width={45}
            height={56}
            alt="Logo"
            className="w-[45px] h-[56px] sm:w-[50px] sm:h-[62px] md:w-[60px] md:h-[75px]"
          />
          <p className="text-[var(--cream)] font-medium text-sm sm:text-base md:text-lg leading-tight hidden sm:block max-w-[150px] md:max-w-[200px]">
            Universitas
            <br />
            Global Nusantara
          </p>
        </Link>
      </div>

      <div className="flex md:hidden items-center gap-3">
        {isLoggedIn && (
          <Link href="/notifikasi" className="relative">
            <Bell
              className={cn(
                "w-6 h-6 cursor-pointer hover:text-white/90 text-white",
                isActivePath("/notifikasi") && "text-[var(--yellow)]"
              )}
            />
            {unreadNotifications > 0 && (
              <span className="absolute -top-1 -right-1 bg-red-600 text-white text-xs font-bold rounded-full w-4 h-4 flex items-center justify-center">
                {unreadNotifications}
              </span>
            )}
          </Link>
        )}
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
                  className={cn(
                    navigationMenuTriggerStyle(),
                    isActivePath("/") &&
                      !isProfilMenuActive() &&
                      !isActivePath("/pendaftaran") &&
                      "bg-[var(--yellow)] text-[var(--green)]"
                  )}
                >
                  <Link href="/">Home</Link>
                </NavigationMenuLink>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuTrigger
                  className={cn(
                    isProfilMenuActive() &&
                      "bg-[var(--yellow)] text-[var(--green)]"
                  )}
                >
                  Profil
                </NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="w-[200px] p-1.5">
                    {[
                      { href: '/sejarah',              label: 'Sejarah' },
                      { href: '/visi-misi',            label: 'Visi & Misi' },
                      { href: '/pimpinan-universitas', label: 'Pimpinan Universitas' },
                      { href: '/fakultas',             label: 'Fakultas' },
                    ].map(({ href, label }) => (
                      <li key={href}>
                        <NavigationMenuLink asChild>
                          <Link
                            href={href}
                            className={cn(
                              'block px-4 py-2.5 rounded-lg text-sm font-medium transition-all duration-150',
                              'text-white/80 hover:text-white hover:bg-white/10',
                              isActivePath(href) && 'text-[#DABC4E] bg-[#DABC4E]/10 font-semibold'
                            )}
                          >
                            {label}
                          </Link>
                        </NavigationMenuLink>
                      </li>
                    ))}
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuLink
                  asChild
                  className={cn(
                    navigationMenuTriggerStyle(),
                    isActivePath("/pendaftaran") &&
                      "bg-[var(--yellow)] text-[var(--green)]"
                  )}
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
              <Link href="/notifikasi" className="relative">
                <Bell
                  className={cn(
                    "w-6 h-6 cursor-pointer hover:text-white/90 text-white",
                    isActivePath("/notifikasi") && "text-[var(--yellow)]"
                  )}
                />

                {unreadNotifications > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-600 text-white text-xs font-bold rounded-full w-4 h-4 flex items-center justify-center">
                    {unreadNotifications}
                  </span>
                )}
              </Link>
              <DropdownMenu>
                <DropdownMenuTrigger>
                  <Avatar
                    className={cn(
                      "ring-2 ring-transparent transition-all",
                      isActivePath("/profil") && "ring-[var(--yellow)]"
                    )}
                  >
                    <AvatarImage
                      src={user?.avatar_url || "/default-avatar-male.webp"}
                      alt={user?.name || "User avatar"}
                      key={user?.avatar_url || "default"}
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
                    <Link
                      href="/profil"
                      className={cn(
                        isActivePath("/profil") &&
                          "bg-[var(--yellow)]/10 font-semibold"
                      )}
                    >
                      Profil
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link
                      href="/pendaftaran"
                      className={cn(
                        isActivePath("/pendaftaran") &&
                          "bg-[var(--yellow)]/10 font-semibold"
                      )}
                    >
                      Pendaftaran
                    </Link>
                  </DropdownMenuItem>
                  {user?.role === "pendaftar" && (
                    <DropdownMenuItem asChild>
                      <Link
                        href="/pendaftaran/status"
                        className={cn(
                          isActivePath("/pendaftaran/status") &&
                            "bg-[var(--yellow)]/10 font-semibold"
                        )}
                      >
                        Hasil Seleksi
                      </Link>
                    </DropdownMenuItem>
                  )}
                  <DropdownMenuItem onClick={handleLogout}>
                    Logout
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </>
          ) : (
            <Link
              href="/login"
              className="text-[var(--green)] font-semibold text-sm hover:opacity-90 px-5 py-2 bg-[var(--yellow)] rounded-xl transition-all duration-200 shadow-sm"
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
                {
                  href: "/pimpinan-universitas",
                  label: "Pimpinan Universitas",
                },
                {
                  href: "/fakultas",
                  label: "Fakultas",
                },
                { href: "/pendaftaran", label: "Pendaftaran" },
              ].map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={cn(
                    "px-6 py-4 text-lg font-medium tracking-wide hover:bg-[var(--yellow)] hover:text-[var(--green)] transition-colors duration-200",
                    isActivePath(item.href) &&
                      "bg-[var(--yellow)] text-[var(--green)] font-bold"
                  )}
                >
                  {item.label}
                </Link>
              ))}

              {/* Notifikasi & Profil di Mobile Menu */}
              {isLoggedIn && (
                <>
                  <Link
                    href="/notifikasi"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={cn(
                      "px-6 py-4 text-lg font-medium tracking-wide hover:bg-[var(--yellow)] hover:text-[var(--green)] transition-colors duration-200 flex items-center justify-between",
                      isActivePath("/notifikasi") &&
                        "bg-[var(--yellow)] text-[var(--green)] font-bold"
                    )}
                  >
                    <span>Notifikasi</span>
                    {unreadNotifications > 0 && (
                      <span className="bg-red-600 text-white text-xs font-bold rounded-full w-6 h-6 flex items-center justify-center">
                        {unreadNotifications}
                      </span>
                    )}
                  </Link>
                  <Link
                    href="/profil"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={cn(
                      "px-6 py-4 text-lg font-medium tracking-wide hover:bg-[var(--yellow)] hover:text-[var(--green)] transition-colors duration-200",
                      isActivePath("/profil") &&
                        "bg-[var(--yellow)] text-[var(--green)] font-bold"
                    )}
                  >
                    Profil
                  </Link>
                </>
              )}

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
    </div>
  );
}
