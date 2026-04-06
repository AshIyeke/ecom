"use client"

import { ShoppingBag } from "lucide-react"
import OrderItem from "./OrderItem"

interface OrderListProps {
  orders: any[]
}

export default function OrderList({ orders }: OrderListProps) {
  if (!orders || orders.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16 text-center gap-4 bg-zinc-50/50 dark:bg-zinc-900/20 rounded-2xl border border-dashed border-zinc-200 dark:border-zinc-800">
        <div className="bg-white dark:bg-zinc-900 p-5 rounded-2xl shadow-sm border border-zinc-100 dark:border-zinc-800">
          <ShoppingBag className="h-10 w-10 text-zinc-400" />
        </div>
        <div className="space-y-1.5">
          <p className="font-bold text-xl text-zinc-900 dark:text-zinc-100">No orders yet</p>
          <p className="text-sm text-zinc-500 dark:text-zinc-400 max-w-[280px] mx-auto">
            Your shopping journey hasn't started yet. Explore our collections and place your first order.
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      {orders.map((order) => (
        <OrderItem key={order.id} order={order} />
      ))}
    </div>
  )
}
