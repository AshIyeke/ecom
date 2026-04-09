"use client"

import AdminOrderList from "@/components/AdminOrderList"
import { ShoppingBag, LayoutGrid } from "lucide-react"

export default function AdminOrdersPage() {
  return (
    <div className="space-y-6 pb-20 md:pb-0">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white dark:bg-zinc-900/50 p-6 rounded-3xl border border-zinc-200 dark:border-zinc-800 shadow-sm">
        <div className="space-y-1">
          <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50 flex items-center gap-3">
            <ShoppingBag className="text-primary h-6 w-6" />
            Orders
          </h2>
          <p className="text-xs font-black uppercase tracking-[0.2em] text-muted-foreground opacity-70">
            Logistics & Fulfillment
          </p>
        </div>
      </div>
      
      <AdminOrderList />
    </div>
  )
}
