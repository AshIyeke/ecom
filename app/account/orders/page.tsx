"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { useGetOrdersQuery } from "@/store/api/orderApi"
import OrderList from "../../../components/OrderList"

export default function OrdersPage() {
  const { data: orders, isLoading, error } = useGetOrdersQuery()

  if (isLoading) {
    return (
      <div className="flex flex-col gap-6 animate-pulse">
        <div className="h-8 w-48 bg-muted rounded" />
        <Card>
          <CardHeader>
            <div className="h-6 w-32 bg-muted rounded mb-2" />
            <div className="h-4 w-64 bg-muted rounded" />
          </CardHeader>
          <CardContent>
            {[...Array(3)].map((_, i) => (
              <div key={i} className="h-24 bg-muted/50 rounded-xl mb-4" />
            ))}
          </CardContent>
        </Card>
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex flex-col gap-6">
        <h2 className="text-2xl font-bold">Your Orders</h2>
        <Card className="border-red-100 dark:border-red-900/30">
          <CardContent className="pt-6">
            <div className="text-center py-10 space-y-3">
              <p className="text-red-500 font-medium">Failed to load orders. Please try again later.</p>
              <button 
                onClick={() => window.location.reload()}
                className="text-sm font-semibold text-zinc-900 dark:text-zinc-50 underline underline-offset-4"
              >
                Retry
              </button>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-zinc-900 dark:text-zinc-50">Your Orders</h2>
      </div>
      
      <Card className="border-zinc-200 dark:border-zinc-800 shadow-sm overflow-hidden rounded-2xl">
        <CardHeader className="bg-zinc-50/50 dark:bg-zinc-900/50 border-b border-zinc-200 dark:border-zinc-800">
          <CardTitle className="text-lg">Order History</CardTitle>
          <CardDescription>View and track your previous orders.</CardDescription>
        </CardHeader>
        <CardContent className="pt-6">
          <OrderList orders={orders || []} />
        </CardContent>
      </Card>
    </div>
  )
}
