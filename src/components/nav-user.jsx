"use client";

import { LogOut } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";

import { useRouter } from "next/navigation";
import { deleteCookie, getCookie } from "cookies-next";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useLogout } from "@/hooks/useAuth";

export function NavUser({ user }) {
  const logoutMutation = useLogout();
  const [isLoggedIn, setIsLoggedIn] = useState(true);

  const { isMobile } = useSidebar();
  const [loading, setLoading] = useState(false);

  const handleLogout = () => {
    logoutMutation.mutate();
    setIsLoggedIn(false);
  };

  return (
    <SidebarMenu>
      {/* Profil User */}
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              size="lg"
              className="hover:bg-green-800 data-[state=open]:bg-green-800 data-[state=open]:text-white rounded-lg"
            >
              <Avatar className="h-8 w-8 rounded-lg">
                <AvatarImage src={user.avatar} alt={user.name} />
                <AvatarFallback className="rounded-lg">
                  {user.name?.charAt(0).toUpperCase() || "U"}
                </AvatarFallback>
              </Avatar>
              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-medium">{user.name || "Manager"}</span>
                <span className="truncate text-xs text-gray-300">
                  {user.email || "manager@sia.com"}
                </span>
              </div>
            </SidebarMenuButton>
          </DropdownMenuTrigger>
        </DropdownMenu>
      </SidebarMenuItem>

      {/* Tombol Logout di bawah profil */}
      <SidebarMenuItem className="mt-3">
        <Button
          onClick={handleLogout}
          disabled={loading}
          variant="destructive"
          className="w-full flex items-center justify-center gap-2 rounded-lg bg-red-600 hover:bg-red-700 text-white transition-colors"
        >
          <LogOut className="w-4 h-4" />
          {loading ? "Logging out..." : "Logout"}
        </Button>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
