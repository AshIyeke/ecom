"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ShoppingBag, Package, Clock, CheckCircle2, AlertCircle } from "lucide-react"
import { useGetOrdersQuery } from "@/store/api/orderApi"
import { format } from "date-fns"

export default function OrdersPage() {
  const { data: orders, isLoading, error } = useGetOrdersQuery()

  const getStatusIcon = (status: string) => {
    switch (status.toLowerCase()) {
      case 'paid':
        return <CheckCircle2 className="h-4 w-4 text-green-500" />
      case 'pending':
        return <Clock className="h-4 w-4 text-amber-500" />
      case 'failed':
        return <AlertCircle className="h-4 w-4 text-red-500" />
      default:
        return <Package className="h-4 w-4 text-blue-500" />
    }
  }

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
              <div key={i} className="h-20 bg-muted rounded mb-4" />
            ))}
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="flex flex-col gap-6">
      <h2 className="text-2xl font-bold">Your Orders</h2>
      <Card>
        <CardHeader>
          <CardTitle>Order History</CardTitle>
          <CardDescription>View and track your previous orders.</CardDescription>
        </CardHeader>
        <CardContent>
          {!orders || orders.length === 0 ? (
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
          ) : (
            <div className="space-y-6">
              {orders.map((order) => (
                <div 
                  key={order.id} 
                  className="flex flex-col md:flex-row md:items-center justify-between p-4 border rounded-lg hover:bg-zinc-50 dark:hover:bg-zinc-900/50 transition-colors gap-4"
                >
                  <div className="flex items-start gap-4">
                    <div className="bg-zinc-100 dark:bg-zinc-800 p-3 rounded-lg">
                      <Package className="h-6 w-6 text-zinc-600 dark:text-zinc-400" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <p className="font-bold text-sm uppercase tracking-wider">
                          Order #{order.id.slice(0, 8)}
                        </p>
                        <div className="flex items-center gap-1 bg-white dark:bg-zinc-950 px-2 py-0.5 rounded-full border border-zinc-200 dark:border-zinc-800 text-[10px] font-bold uppercase tracking-widest">
                          {getStatusIcon(order.status)}
                          <span className={
                            order.status === 'paid' ? 'text-green-600' : 
                            order.status === 'pending' ? 'text-amber-600' : 'text-zinc-600'
                          }>
                            {order.status}
                          </span>
                        </div>
                      </div>
                      <p className="text-xs text-zinc-500 mt-1">
                        {format(new Date(order.created_at), 'PPP')}
                      </p>
                      <div className="mt-2 flex -space-x-2 overflow-hidden">
                        {order.order_items?.map((item: any, idx: number) => (
                          <div key={idx} className="inline-block h-6 w-6 rounded-full ring-2 ring-white dark:ring-zinc-950 bg-zinc-200 dark:bg-zinc-800 overflow-hidden">
                            {item.products?.image_url ? (
                              <img src={item.products.image_url} alt={item.products.name} className="h-full w-full object-cover" />
                            ) : (
                              <div className="h-full w-full flex items-center justify-center text-[8px] font-bold uppercase">
                                {item.products?.name?.charAt(0)}
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-bold text-zinc-900 dark:text-zinc-50">
                      ${Number(order.total_amount).toFixed(2)}
                    </p>
                    <p className="text-[10px] text-zinc-500 uppercase tracking-widest mt-1">
                      {order.order_items?.length || 0} {order.order_items?.length === 1 ? 'Item' : 'Items'}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
