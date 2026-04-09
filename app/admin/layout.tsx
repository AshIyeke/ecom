"use client";

import { useAuth } from "@/store/AuthContext";
import { useRouter, usePathname } from "next/navigation";
import { useEffect } from "react";
import {
  SidebarProvider,
  SidebarInset,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { AdminSidebar } from "@/components/admin-sidebar";
import { Separator } from "@/components/ui/separator";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { role, loading, user } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (!loading && role !== "admin") {
      router.push("/");
    }
  }, [role, loading, router]);

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  if (role !== "admin") {
    return null;
  }

  const getPageTitle = () => {
    if (pathname === "/admin") return "Dashboard";
    if (pathname.startsWith("/admin/products")) return "Products";
    if (pathname.startsWith("/admin/orders")) return "Orders";
    if (pathname.startsWith("/admin/settings")) return "Settings";
    return "Admin Panel";
  };

  return (
    <SidebarProvider>
      <AdminSidebar />
      <SidebarInset className="bg-background">
        <header className="flex h-20 shrink-0 items-center gap-2 border-b border-border px-6 bg-background/50 backdrop-blur-md sticky top-0 z-10">
          <SidebarTrigger className="-ml-1 text-primary hover:bg-secondary transition-colors" />
          <Separator orientation="vertical" className="mr-4 h-6 opacity-20" />
          <div className="flex flex-1 items-center justify-between">
            <h1 className="text-xl font-serif tracking-tight text-foreground">
              {getPageTitle()}
            </h1>
            <div className="flex items-center gap-4">
              <div className="hidden md:flex flex-col items-end">
                <span className="text-xs font-bold uppercase tracking-widest text-foreground">
                  {user?.email?.split("@")[0]}
                </span>
                <span className="text-[10px] font-black uppercase tracking-[0.2em] text-primary opacity-70">
                  Administrator
                </span>
              </div>
              <div className="w-10 h-10 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center text-primary font-bold">
                {user?.email?.charAt(0).toUpperCase()}
              </div>
            </div>
          </div>
        </header>
        <main className="flex-1 overflow-auto p-6 md:p-10 max-w-7xl mx-auto w-full">
          {children}
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
}
