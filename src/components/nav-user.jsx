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
import { useAuth } from "@/contexts/AuthContext";

export function NavUser() {
  const logoutMutation = useLogout();
  const { isMobile } = useSidebar();
  const { user, loading } = useAuth();
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const handleLogout = () => {
    setIsLoggingOut(true);
    logoutMutation.mutate({
      onSuccess: () => {
        setIsLoggingOut(false);
      },
      onError: () => {
        setIsLoggingOut(false);
      },
    });
  };

  if (loading) return <div>Loading...</div>;
  if (!user) return null;

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              size="lg"
              className="hover:bg-green-800 data-[state=open]:bg-green-800 data-[state=open]:text-white rounded-lg text-white"
              group
            >
              <Avatar className="h-8 w-8 rounded-lg">
                {user?.avatar ? (
                  <AvatarImage src={user.avatar} alt={user.name} />
                ) : (
                  <AvatarFallback className="rounded-lg text-black">
                    {user?.name?.charAt(0)?.toUpperCase() || "U"}
                  </AvatarFallback>
                )}
              </Avatar>

              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-medium text-white">
                  {user?.name || "User"}
                </span>
                <span className="truncate text-xs text-gray-300">
                  {user?.email || "user@example.com"}
                </span>
              </div>
            </SidebarMenuButton>
          </DropdownMenuTrigger>
        </DropdownMenu>
      </SidebarMenuItem>

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
