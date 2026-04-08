"use client"

import { useGetOrdersQuery } from "@/store/api/orderApi"
import { Loader2, ShoppingBag, AlertTriangle, RefreshCw } from "lucide-react"
import AdminOrderItem from "./AdminOrderItem"

export default function AdminOrderList() {
  const { data: orders, isLoading, error, refetch, isFetching } = useGetOrdersQuery(true)

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center py-20 gap-4">
        <Loader2 className="animate-spin text-primary" size={40} />
        <p className="text-muted-foreground font-black uppercase text-[10px] tracking-[0.2em] animate-pulse">Loading Orders...</p>
      </div>
    )
  }

  if (error) {
    return (
      <div className="text-center py-12 bg-destructive/5 rounded-2xl border border-destructive/20 p-8">
        <AlertTriangle className="mx-auto text-destructive mb-4" size={48} />
        <h3 className="text-foreground font-black uppercase text-xs tracking-widest mb-2">Sync Failed</h3>
        <p className="text-muted-foreground text-sm mb-6 max-w-xs mx-auto font-medium">
          {(error as any)?.data || "Something went wrong while fetching the latest orders."}
        </p>
        <button 
          onClick={() => refetch()}
          className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-xl text-xs font-black uppercase tracking-widest hover:opacity-90 transition-all shadow-lg shadow-primary/10"
        >
          <RefreshCw size={14} className={isFetching ? "animate-spin" : ""} />
          Retry Sync
        </button>
      </div>
    )
  }

  if (!orders || orders.length === 0) {
    return (
      <div className="text-center py-24 bg-muted/30 rounded-[2rem] border border-dashed border-border">
        <ShoppingBag className="mx-auto text-muted-foreground/30 mb-4" size={64} />
        <p className="text-foreground font-bold tracking-tight mb-2">No orders recorded</p>
        <p className="text-muted-foreground text-sm font-medium">When customers place orders, they will appear here.</p>
      </div>
    )
  }

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex items-center justify-between px-2">
        <span className="text-[10px] font-black text-muted-foreground uppercase tracking-[0.2em]">
          {orders.length} Orders Logged
        </span>
        {isFetching && (
          <div className="flex items-center gap-2 text-[10px] font-black text-primary uppercase tracking-[0.2em] animate-pulse">
            <RefreshCw size={10} className="animate-spin" />
            Updating...
          </div>
        )}
      </div>
      
      <div className="grid gap-6">
        {orders.map((order) => (
          <AdminOrderItem key={order.id} order={order} />
        ))}
      </div>
    </div>
  )
}
