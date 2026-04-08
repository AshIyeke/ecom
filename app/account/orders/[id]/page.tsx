"use client"

import { useGetOrderByIdQuery } from "@/store/api/orderApi"
import { useParams, useRouter } from "next/navigation"
import { 
  Loader2, ArrowLeft, Package, Calendar, 
  CreditCard, ShoppingBag, Truck, CheckCircle2, 
  Clock, AlertCircle, Home, MapPin
} from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { format } from "date-fns"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"

export default function OrderDetailsPage() {
  const { id } = useParams()
  const router = useRouter()
  const { data: order, isLoading, error } = useGetOrderByIdQuery({ orderId: id as string, isAdmin: false })

  const getStatusIcon = (status: string) => {
    switch (status.toLowerCase()) {
      case 'paid':
        return <CheckCircle2 className="h-5 w-5 text-green-500" />
      case 'sent':
        return <Truck className="h-5 w-5 text-blue-500" />
      case 'pending':
        return <Clock className="h-5 w-5 text-amber-500" />
      case 'failed':
        return <AlertCircle className="h-5 w-5 text-red-500" />
      default:
        return <Package className="h-5 w-5 text-zinc-500" />
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

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4">
        <Loader2 className="animate-spin text-zinc-400" size={40} />
        <p className="text-zinc-500 font-medium animate-pulse">Loading order details...</p>
      </div>
    )
  }

  if (error || !order) {
    return (
      <div className="text-center py-20">
        <h3 className="text-xl font-bold text-zinc-900 dark:text-zinc-50 mb-2">Order Not Found</h3>
        <p className="text-zinc-500 mb-6">The order you're looking for doesn't exist or you don't have permission to view it.</p>
        <button 
          onClick={() => router.push('/account/orders')}
          className="inline-flex items-center gap-2 text-zinc-900 dark:text-zinc-50 hover:underline font-medium"
        >
          <ArrowLeft size={18} />
          Back to Your Orders
        </button>
      </div>
    )
  }

  return (
    <div className="max-w-4xl mx-auto space-y-8 pb-20">
      {/* Header */}
      <div className="flex flex-col gap-4">
        <Link 
          href="/account/orders"
          className="inline-flex items-center gap-2 text-sm text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-50 transition-colors"
        >
          <ArrowLeft size={16} />
          Back to Orders
        </Link>
        
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div className="space-y-1">
            <h1 className="text-3xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">Order Details</h1>
            <div className="flex items-center gap-3 flex-wrap">
              <span className="font-mono text-xs font-bold text-zinc-400">Order #{order.id.slice(0, 8)}</span>
              <span className="w-1 h-1 rounded-full bg-zinc-300" />
              <div className={`flex items-center gap-2 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest ${getStatusColorClass(order.status)}`}>
                {getStatusIcon(order.status)}
                {order.status}
              </div>
            </div>
          </div>
          
          <div className="text-right">
            <p className="text-xs text-zinc-500 uppercase tracking-widest font-bold mb-1">Placed on</p>
            <p className="font-bold text-zinc-900 dark:text-zinc-50">{format(new Date(order.created_at), 'PPP')}</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column - Shipping & Summary */}
        <div className="lg:col-span-1 space-y-6">
          <Card className="border-zinc-200 dark:border-zinc-800 shadow-sm overflow-hidden rounded-2xl">
            <CardHeader className="bg-zinc-50 dark:bg-zinc-900/50 border-b border-zinc-100 dark:border-zinc-800">
              <CardTitle className="text-sm font-bold uppercase tracking-widest text-zinc-500 flex items-center gap-2">
                <Truck size={16} /> Shipping Address
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              {typeof order.shipping_address === 'object' && order.shipping_address !== null ? (
                <div className="text-sm font-bold text-zinc-900 dark:text-zinc-50 space-y-1.5">
                  <p className="flex items-start gap-2">
                    <Home size={16} className="text-zinc-400 mt-0.5 shrink-0" /> 
                    <span>{order.shipping_address.street || "No street provided"}</span>
                  </p>
                  <p className="flex items-start gap-2">
                    <MapPin size={16} className="text-zinc-400 mt-0.5 shrink-0" />
                    <span>{order.shipping_address.city}, {order.shipping_address.state} {order.shipping_address.zip}</span>
                  </p>
                </div>
              ) : (
                <p className="text-sm font-bold text-zinc-900 dark:text-zinc-50 leading-relaxed">
                  {order.shipping_address || "No address provided"}
                </p>
              )}
            </CardContent>
          </Card>

          <Card className="border-zinc-200 dark:border-zinc-800 shadow-sm rounded-2xl overflow-hidden">
            <CardHeader className="bg-zinc-50 dark:bg-zinc-900/50 border-b border-zinc-100 dark:border-zinc-800">
              <CardTitle className="text-sm font-bold uppercase tracking-widest text-zinc-500 flex items-center gap-2">
                Order Summary
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6 space-y-4">
              <div className="flex justify-between items-center text-sm">
                <div className="flex items-center gap-2 text-zinc-500 font-medium">
                  <CreditCard size={14} /> Payment
                </div>
                <span className="font-bold text-zinc-900 dark:text-zinc-50 uppercase tracking-tighter">Paystack</span>
              </div>
              <Separator className="bg-zinc-100 dark:bg-zinc-800" />
              <div className="space-y-2">
                <div className="flex justify-between items-center text-sm">
                  <span className="text-zinc-500">Subtotal</span>
                  <span className="font-bold text-zinc-900 dark:text-zinc-50">${((order.total_amount || 0) - 10).toFixed(2)}</span>
                </div>
                <div className="flex justify-between items-center text-sm">
                  <span className="text-zinc-500">Shipping</span>
                  <span className="font-bold text-zinc-900 dark:text-zinc-50">$10.00</span>
                </div>
                <Separator className="bg-zinc-100 dark:bg-zinc-800 my-2" />
                <div className="flex justify-between items-center pt-2">
                  <span className="text-zinc-900 dark:text-zinc-50 font-bold">Total</span>
                  <span className="text-2xl font-black text-zinc-900 dark:text-zinc-50">
                    ${(order.total_amount || 0).toFixed(2)}
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right Column - Order Items */}
        <div className="lg:col-span-2 space-y-6">
          <Card className="border-zinc-200 dark:border-zinc-800 shadow-sm rounded-2xl overflow-hidden">
            <CardHeader className="flex flex-row items-center justify-between border-b border-zinc-100 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-900/50">
              <CardTitle className="text-sm font-bold uppercase tracking-widest text-zinc-500 flex items-center gap-2">
                <ShoppingBag size={16} /> Items in Order ({order.order_items?.length || 0})
              </CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <div className="divide-y divide-zinc-100 dark:divide-zinc-800">
                {order.order_items?.map((item: any) => (
                  <div key={item.id} className="flex items-center gap-4 p-4 sm:p-6 hover:bg-zinc-50/50 dark:hover:bg-zinc-900/30 transition-colors">
                    <div className="relative h-20 w-20 rounded-xl overflow-hidden bg-zinc-100 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 flex-shrink-0">
                      {item.products?.image_url ? (
                        <Image src={item.products.image_url} alt={item.products.name} fill className="object-cover" sizes="80px" />
                      ) : (
                        <div className="h-full w-full flex items-center justify-center text-lg font-bold text-zinc-400 uppercase">
                          {item.products?.name?.charAt(0)}
                        </div>
                      )}
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                        <div>
                          <h4 className="font-bold text-zinc-900 dark:text-zinc-50 text-base truncate">{item.products?.name}</h4>
                          <p className="text-xs text-zinc-500 mt-0.5">Quantity: {item.quantity}</p>
                        </div>
                        <div className="text-left sm:text-right">
                          <p className="font-black text-zinc-900 dark:text-zinc-50">
                            ${((item.price ?? item.products?.price ?? 0) * (item.quantity || 1)).toFixed(2)}
                          </p>
                          <p className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest mt-0.5">
                            ${(item.price ?? item.products?.price ?? 0).toFixed(2)} each
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {order.paystack_id && (
            <div className="flex items-center justify-center p-4 bg-zinc-50 dark:bg-zinc-900/50 rounded-xl border border-dashed border-zinc-200 dark:border-zinc-800">
               <p className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-400 mr-3">Payment Reference</p>
               <p className="font-mono text-xs font-bold text-zinc-500">{order.paystack_id}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
