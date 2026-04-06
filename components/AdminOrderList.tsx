"use client"

import { useGetOrdersQuery } from "@/store/api/orderApi"
import { Loader2, ShoppingBag, AlertTriangle, RefreshCw } from "lucide-react"
import AdminOrderItem from "./AdminOrderItem"

export default function AdminOrderList() {
  const { data: orders, isLoading, error, refetch, isFetching } = useGetOrdersQuery(true)

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center py-20 gap-4">
        <Loader2 className="animate-spin text-zinc-900 dark:text-zinc-50" size={40} />
        <p className="text-zinc-500 font-medium animate-pulse text-sm">Loading orders...</p>
      </div>
    )
  }

  if (error) {
    return (
      <div className="text-center py-12 bg-red-50 dark:bg-red-900/10 rounded-xl border border-red-100 dark:border-red-900/20 p-6">
        <AlertTriangle className="mx-auto text-red-500 mb-3" size={40} />
        <h3 className="text-red-800 dark:text-red-400 font-bold mb-1 text-sm">Failed to load orders</h3>
        <p className="text-red-600 dark:text-red-400/70 text-xs mb-4">
          {(error as any)?.data || "Something went wrong while fetching orders."}
        </p>
        <button 
          onClick={() => refetch()}
          className="inline-flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-lg text-xs font-bold hover:bg-red-700 transition-all"
        >
          <RefreshCw size={14} className={isFetching ? "animate-spin" : ""} />
          Retry
        </button>
      </div>
    )
  }

  if (!orders || orders.length === 0) {
    return (
      <div className="text-center py-20 bg-zinc-50 dark:bg-zinc-900/50 rounded-2xl border border-dashed border-zinc-200 dark:border-zinc-800">
        <ShoppingBag className="mx-auto text-zinc-300 mb-2" size={48} />
        <p className="text-zinc-500 font-medium text-sm">No orders found.</p>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between px-2">
        <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest">
          Showing {orders.length} orders
        </span>
        {isFetching && (
          <div className="flex items-center gap-2 text-[10px] font-bold text-blue-500 uppercase tracking-widest animate-pulse">
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
