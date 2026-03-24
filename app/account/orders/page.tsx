"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ShoppingBag } from "lucide-react"

export default function OrdersPage() {
  return (
    <div className="flex flex-col gap-6">
      <h2 className="text-2xl font-bold">Your Orders</h2>
      <Card>
        <CardHeader>
          <CardTitle>Order History</CardTitle>
          <CardDescription>View and track your previous orders.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col items-center justify-center py-10 text-center gap-4">
            <div className="bg-muted p-4 rounded-full">
              <ShoppingBag className="h-8 w-8 text-muted-foreground" />
            </div>
            <div className="space-y-1">
              <p className="font-medium text-lg">No orders yet</p>
              <p className="text-sm text-muted-foreground max-w-xs mx-auto">
                You haven't placed any orders with us yet. When you do, they'll appear here.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
