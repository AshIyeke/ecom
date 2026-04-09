"use client"

import { SidebarProvider, SidebarInset, SidebarTrigger } from "@/components/ui/sidebar"
import { AccountSidebar } from "@/components/account-sidebar"
import { useAuth } from "@/store/AuthContext"
import { useRouter } from "next/navigation"
import { useEffect } from "react"
import { Separator } from "@/components/ui/separator"

export default function AccountLayout({ children }: { children: React.ReactNode }) {
  const { user, loading } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!loading && !user) {
      router.push("/login")
    }
  }, [user, loading, router])

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
      </div>
    )
  }

  if (!user) {
    return null
  }

  return (
    <SidebarProvider>
      <AccountSidebar />
      <SidebarInset className="bg-background">
        <header className="flex h-20 shrink-0 items-center gap-2 border-b border-border px-6 bg-background/50 backdrop-blur-md sticky top-0 z-10">
          <SidebarTrigger className="-ml-1 text-primary hover:bg-secondary transition-colors" />
          <Separator orientation="vertical" className="mr-4 h-6 opacity-20" />
          <div className="flex flex-1 items-center justify-between">
            <h1 className="text-xl font-serif tracking-tight text-foreground">Account Dashboard</h1>
            <div className="flex items-center gap-4">
              <div className="hidden md:flex flex-col items-end">
                <span className="text-xs font-bold uppercase tracking-widest text-foreground">{user?.email?.split('@')[0]}</span>
                <span className="text-[10px] font-black uppercase tracking-[0.2em] text-primary opacity-70">Member</span>
              </div>
              <div className="w-10 h-10 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center text-primary font-bold">
                {user?.email?.charAt(0).toUpperCase()}
              </div>
            </div>
          </div>
        </header>
        <main className="flex-1 flex flex-col gap-4 p-6 md:p-10 max-w-7xl mx-auto w-full">
          {children}
        </main>
      </SidebarInset>
    </SidebarProvider>
  )
}
