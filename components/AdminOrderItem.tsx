"use client"

import { useUpdateOrderStatusMutation } from "@/store/api/orderApi"
import { Package, CheckCircle2, Clock, AlertCircle, Truck, Loader2, ChevronDown, ChevronUp, Eye } from "lucide-react"
import { format } from "date-fns"
import { useState } from "react"
import Image from "next/image"
import Link from "next/link"

interface AdminOrderItemProps {
  order: any
}

export default function AdminOrderItem({ order }: AdminOrderItemProps) {
  const [isExpanded, setIsExpanded] = useState(false)
  const [updateStatus, { isLoading: isUpdating }] = useUpdateOrderStatusMutation()

  const handleStatusToggle = async () => {
    const newStatus = order.status === "sent" ? "pending" : "sent"
    try {
      await updateStatus({ orderId: order.id, status: newStatus }).unwrap()
    } catch (err) {
      console.error("Failed to update status:", err)
      alert("Failed to update status")
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status.toLowerCase()) {
      case 'paid':
        return <CheckCircle2 className="h-4 w-4 text-green-500" />
      case 'sent':
        return <Truck className="h-4 w-4 text-blue-500" />
      case 'pending':
        return <Clock className="h-4 w-4 text-amber-500" />
      case 'failed':
        return <AlertCircle className="h-4 w-4 text-red-500" />
      default:
        return <Package className="h-4 w-4 text-zinc-500" />
    }
  }

  const getStatusColorClass = (status: string) => {
    switch (status.toLowerCase()) {
      case 'paid':
        return 'bg-green-100 text-green-700 dark:bg-green-900/20 dark:text-green-400'
      case 'sent':
        return 'bg-blue-100 text-blue-700 dark:bg-blue-900/20 dark:text-blue-400'
      case 'pending':
        return 'bg-amber-100 text-amber-700 dark:bg-amber-900/20 dark:text-amber-400'
      case 'failed':
        return 'bg-red-100 text-red-700 dark:bg-red-900/20 dark:text-red-400'
      default:
        return 'bg-zinc-100 text-zinc-700 dark:bg-zinc-800 dark:text-zinc-400'
    }
  }

  return (
    <div className="bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-all">
      <div className="p-4 sm:p-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-3 flex-wrap">
              <span className="text-[10px] font-black uppercase tracking-widest text-zinc-400">Order ID</span>
              <Link 
                href={`/admin/orders/${order.id}`}
                className="font-mono text-xs font-bold text-zinc-900 dark:text-zinc-50 hover:text-blue-600 transition-colors truncate max-w-[120px] sm:max-w-none"
              >
                {order.id}
              </Link>
            </div>
            <p className="text-xs sm:text-sm text-zinc-500">
              Placed {format(new Date(order.created_at), 'PPP')}
            </p>
          </div>

          <div className="flex items-center gap-2 sm:gap-3">
            <Link 
              href={`/admin/orders/${order.id}`}
              className="p-2 rounded-lg bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-50 transition-all"
              title="View Details"
            >
              <Eye size={16} />
            </Link>
            <div className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-[9px] sm:text-xs font-bold uppercase tracking-wider ${getStatusColorClass(order.status)}`}>
              {getStatusIcon(order.status)}
              {order.status}
            </div>
            
            {(order.status === "pending" || order.status === "sent") && (
              <button
                onClick={handleStatusToggle}
                disabled={isUpdating}
                className="flex items-center justify-center gap-2 px-3 sm:px-4 py-1.5 rounded-full bg-zinc-900 dark:bg-zinc-50 text-zinc-50 dark:text-zinc-900 text-[9px] sm:text-[10px] font-black uppercase tracking-widest hover:opacity-90 transition-all disabled:opacity-50"
              >
                {isUpdating ? (
                  <Loader2 className="h-3 w-3 animate-spin" />
                ) : (
                  <Truck className="h-3 w-3" />
                )}
                <span className="hidden xs:inline">Mark {order.status === "sent" ? "Pending" : "Sent"}</span>
                <span className="xs:hidden">{order.status === "sent" ? "P" : "S"}</span>
              </button>
            )}
          </div>
        </div>

        <div className="mt-6 flex flex-row items-center justify-between gap-4 border-t border-zinc-100 dark:border-zinc-900 pt-6">
          <div className="flex items-center gap-4 sm:gap-8">
            <div>
              <p className="text-[9px] sm:text-[10px] font-black uppercase tracking-widest text-zinc-400 mb-0.5 sm:mb-1">Total</p>
              <p className="text-lg sm:text-xl font-black text-zinc-900 dark:text-zinc-50 tracking-tighter sm:tracking-normal">
                ${Number(order.total_amount).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </p>
            </div>
            <div>
              <p className="text-[9px] sm:text-[10px] font-black uppercase tracking-widest text-zinc-400 mb-0.5 sm:mb-1">Items</p>
              <p className="text-lg sm:text-xl font-black text-zinc-900 dark:text-zinc-50">
                {order.order_items?.length || 0}
              </p>
            </div>
          </div>

          <button 
            onClick={() => setIsExpanded(!isExpanded)}
            className="flex items-center gap-2 text-[10px] sm:text-xs font-black uppercase tracking-widest text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-50 transition-colors"
          >
            <span className="hidden sm:inline">{isExpanded ? 'Hide Details' : 'View Items'}</span>
            {isExpanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
          </button>
        </div>
      </div>

      {isExpanded && (
        <div className="bg-zinc-50 dark:bg-zinc-900/50 border-t border-zinc-100 dark:border-zinc-800 p-4 sm:p-6">
          <h4 className="text-[10px] font-black uppercase tracking-widest text-zinc-400 mb-4">Order Items</h4>
          <div className="grid gap-4">
            {order.order_items?.map((item: any) => (
              <div key={item.id} className="flex items-center gap-4 bg-white dark:bg-zinc-950 p-3 rounded-xl border border-zinc-100 dark:border-zinc-800 shadow-sm">
                <div className="relative h-12 w-12 rounded-lg overflow-hidden bg-zinc-100 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 flex-shrink-0">
                  {item.products?.image_url ? (
                    <Image src={item.products.image_url} alt={item.products.name} fill className="object-cover" sizes="48px" />
                  ) : (
                    <div className="h-full w-full flex items-center justify-center text-xs font-bold text-zinc-400">
                      {item.products?.name?.charAt(0)}
                    </div>
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-bold text-zinc-900 dark:text-zinc-50 text-sm truncate">{item.products?.name}</p>
                  <p className="text-xs text-zinc-500">Qty: {item.quantity}</p>
                </div>
                <div className="text-right">
                  <p className="font-bold text-zinc-900 dark:text-zinc-50 text-sm">
                    ${((item.price || 0) * (item.quantity || 1)).toFixed(2)}
                  </p>
                  <p className="text-[10px] text-zinc-400">${(item.price || 0).toFixed(2)} each</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
