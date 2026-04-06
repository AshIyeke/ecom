"use client"

import AdminOrderList from "@/components/AdminOrderList"

export default function AdminOrdersPage() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">Orders Management</h2>
      </div>
      
      <AdminOrderList />
    </div>
  )
}
