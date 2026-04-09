"use client";

import {
  User,
  ShoppingBag,
  Settings,
  LogOut,
  LayoutDashboard,
} from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { useAuth } from "@/store/AuthContext";
import Link from "next/link";
import { usePathname } from "next/navigation";

const items = [
  {
    title: "Overview",
    url: "/account",
    icon: LayoutDashboard,
  },
  {
    title: "Profile",
    url: "/account/profile",
    icon: User,
  },
  {
    title: "Orders",
    url: "/account/orders",
    icon: ShoppingBag,
  },
  {
    title: "Settings",
    url: "/account/settings",
    icon: Settings,
  },
];

export function AccountSidebar() {
  const { user, signOut } = useAuth();
  const pathname = usePathname();

  return (
    <Sidebar className="border-r border-border">
      <SidebarHeader className="border-b border-border px-6 py-6 bg-secondary/30">
        <Link href="/" className="flex flex-col items-start group">
          <h2 className="text-xl font-serif tracking-[0.2em] font-light text-foreground uppercase">
            Opal Scents
          </h2>
          <span className="text-[7px] tracking-[0.4em] font-black text-muted-foreground -mt-1 uppercase opacity-70">
            My Account
          </span>
        </Link>
      </SidebarHeader>
      <SidebarContent className="bg-background">
        <SidebarGroup>
          <SidebarGroupLabel className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground px-4 py-4">
            Manage Account
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu className="px-2">
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton
                    asChild
                    isActive={pathname === item.url}
                    className="rounded-xl h-11 px-4 data-[active=true]:bg-primary data-[active=true]:text-primary-foreground transition-all"
                  >
                    <Link href={item.url}>
                      <item.icon className="h-4 w-4" />
                      <span className="font-medium">{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter className="border-t border-border p-4 bg-secondary/10">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              onClick={() => signOut()}
              className="text-destructive hover:text-destructive hover:bg-destructive/10 rounded-xl h-11 px-4 transition-all"
            >
              <LogOut className="h-4 w-4" />
              <span className="font-bold uppercase tracking-widest text-[10px]">
                Logout
              </span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
