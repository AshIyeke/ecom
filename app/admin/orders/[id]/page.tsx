"use client"

import { useGetOrderByIdQuery, useUpdateOrderStatusMutation } from "@/store/api/orderApi"
import { useParams, useRouter } from "next/navigation"
import { 
  Loader2, ArrowLeft, Package, User, 
  Mail, Calendar, CreditCard, ShoppingBag,
  Truck, CheckCircle2, Clock, AlertCircle, Home
} from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { format } from "date-fns"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"

export default function AdminOrderDetailsPage() {
  const { id } = useParams()
  const router = useRouter()
  const { data: order, isLoading, error } = useGetOrderByIdQuery({ orderId: id as string, isAdmin: true })
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
        <p className="text-zinc-500 mb-6">The order you're looking for doesn't exist or was removed.</p>
        <button 
          onClick={() => router.back()}
          className="inline-flex items-center gap-2 text-blue-600 hover:underline font-medium"
        >
          <ArrowLeft size={18} />
          Go Back
        </button>
      </div>
    )
  }

  return (
    <div className="max-w-5xl mx-auto space-y-8 pb-20">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div className="space-y-1">
          <Link 
            href="/admin/orders"
            className="inline-flex items-center gap-2 text-sm text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-50 transition-colors mb-2"
          >
            <ArrowLeft size={16} />
            Back to Orders
          </Link>
          <h1 className="text-3xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">Order Details</h1>
          <div className="flex items-center gap-3 flex-wrap">
            <span className="font-mono text-xs font-bold text-zinc-400">ID: {order.id}</span>
            <span className="w-1 h-1 rounded-full bg-zinc-300" />
            <div className={`flex items-center gap-2 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest ${getStatusColorClass(order.status)}`}>
              {getStatusIcon(order.status)}
              {order.status}
            </div>
          </div>
        </div>

        <div className="flex gap-3 w-full md:w-auto">
          {(order.status === "pending" || order.status === "sent") && (
            <button
              onClick={handleStatusToggle}
              disabled={isUpdating}
              className="flex-1 md:flex-none inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-xl bg-zinc-900 dark:bg-zinc-50 text-zinc-50 dark:text-zinc-900 font-bold text-sm hover:opacity-90 transition-all disabled:opacity-50 shadow-lg"
            >
              {isUpdating ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <Truck className="h-4 w-4" />
              )}
              Mark as {order.status === "sent" ? "Pending" : "Sent"}
            </button>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column - User & Order Info */}
        <div className="lg:col-span-1 space-y-6">
          <Card className="border-zinc-200 dark:border-zinc-800 shadow-sm overflow-hidden">
            <CardHeader className="bg-zinc-50 dark:bg-zinc-900/50 border-b border-zinc-100 dark:border-zinc-800">
              <CardTitle className="text-sm font-bold uppercase tracking-widest text-zinc-500 flex items-center gap-2">
                <Truck size={16} /> Shipping Details
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6 space-y-4">
              <div className="space-y-1">
                <p className="text-[10px] font-black uppercase tracking-widest text-zinc-400">Address</p>
                {typeof order.shipping_address === 'object' && order.shipping_address !== null ? (
                  <div className="text-sm font-bold text-zinc-900 dark:text-zinc-50 space-y-0.5">
                    <p className="flex items-center gap-2"><Home size={12} className="text-zinc-400" /> {order.shipping_address.street || "No street provided"}</p>
                    <p className="pl-5">{order.shipping_address.city}, {order.shipping_address.state} {order.shipping_address.zip}</p>
                  </div>
                ) : (
                  <p className="text-sm font-bold text-zinc-900 dark:text-zinc-50 leading-relaxed">
                    {order.shipping_address || "No address provided"}
                  </p>
                )}
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <p className="text-[10px] font-black uppercase tracking-widest text-zinc-400">Profile City</p>
                  <p className="text-sm font-bold text-zinc-900 dark:text-zinc-50">
                    {order.profiles?.city || "N/A"}
                  </p>
                </div>
                <div className="space-y-1">
                  <p className="text-[10px] font-black uppercase tracking-widest text-zinc-400">Phone</p>
                  <p className="text-sm font-bold text-zinc-900 dark:text-zinc-50">
                    {order.profiles?.phone || order.phone || "N/A"}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-zinc-200 dark:border-zinc-800 shadow-sm overflow-hidden">
            <CardHeader className="bg-zinc-50 dark:bg-zinc-900/50 border-b border-zinc-100 dark:border-zinc-800">
              <CardTitle className="text-sm font-bold uppercase tracking-widest text-zinc-500 flex items-center gap-2">
                <User size={16} /> Customer Profile
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6 space-y-4">
              <div className="flex items-center gap-4">
                <div className="h-12 w-12 rounded-full bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center text-zinc-400 font-bold border border-zinc-200 dark:border-zinc-700">
                  {order.profiles?.full_name?.charAt(0) || <User size={20} />}
                </div>
                <div>
                  <p className="font-bold text-zinc-900 dark:text-zinc-50">{order.profiles?.full_name || "Guest Customer"}</p>
                  <p className="text-xs text-zinc-500 flex items-center gap-1 mt-0.5">
                    <Mail size={12} /> {order.profiles?.email || "No email available"}
                  </p>
                </div>
              </div>
              <Separator className="bg-zinc-100 dark:bg-zinc-800" />
              <div className="space-y-3">
                <div className="flex justify-between items-center text-xs">
                  <span className="text-zinc-500 font-medium">Customer ID</span>
                  <span className="font-mono text-zinc-400 truncate max-w-[120px]">{order.user_id}</span>
                </div>
                <div className="flex justify-between items-center text-xs">
                  <span className="text-zinc-500 font-medium">Username</span>
                  <span className="font-bold text-zinc-900 dark:text-zinc-50">@{order.profiles?.username || "guest"}</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-zinc-200 dark:border-zinc-800 shadow-sm">
            <CardHeader className="pb-2">
              <CardTitle className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-400">Order Summary</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between items-center text-sm">
                <div className="flex items-center gap-2 text-zinc-500 font-medium">
                  <Calendar size={14} /> Date
                </div>
                <span className="font-bold text-zinc-900 dark:text-zinc-50">
                  {format(new Date(order.created_at), 'PP')}
                </span>
              </div>
              <Separator className="bg-zinc-100 dark:bg-zinc-800" />
              <div className="flex justify-between items-center text-sm">
                <div className="flex items-center gap-2 text-zinc-500 font-medium">
                  <CreditCard size={14} /> Method
                </div>
                <span className="font-bold text-zinc-900 dark:text-zinc-50 uppercase tracking-tighter">Paystack</span>
              </div>
              <Separator className="bg-zinc-100 dark:bg-zinc-800" />
              <div className="space-y-2">
                <div className="flex justify-between items-center text-sm">
                  <span className="text-zinc-500 font-medium">Subtotal</span>
                  <span className="font-bold text-zinc-900 dark:text-zinc-50">${((order.total_amount || 0) - 10).toFixed(2)}</span>
                </div>
                <div className="flex justify-between items-center text-sm">
                  <span className="text-zinc-500 font-medium">Shipping</span>
                  <span className="font-bold text-zinc-900 dark:text-zinc-50">$10.00</span>
                </div>
              </div>
              <Separator className="bg-zinc-100 dark:bg-zinc-800" />
              <div className="flex justify-between items-center">
                <span className="text-zinc-900 dark:text-zinc-50 font-bold">Total Amount</span>
                <span className="text-2xl font-black text-zinc-900 dark:text-zinc-50">
                  ${(order.total_amount || 0).toFixed(2)}
                </span>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right Column - Order Items */}
        <div className="lg:col-span-2 space-y-6">
          <Card className="border-zinc-200 dark:border-zinc-800 shadow-sm">
            <CardHeader className="flex flex-row items-center justify-between border-b border-zinc-100 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-900/50">
              <CardTitle className="text-sm font-bold uppercase tracking-widest text-zinc-500 flex items-center gap-2">
                <ShoppingBag size={16} /> Order Items ({order.order_items?.length || 0})
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
                          <p className="text-xs text-zinc-500 mt-0.5">ID: {item.product_id}</p>
                        </div>
                        <div className="text-left sm:text-right">
                          <p className="font-black text-zinc-900 dark:text-zinc-50">
                            ${((item.price ?? item.products?.price ?? 0) * (item.quantity || 1)).toFixed(2)}
                          </p>
                          <p className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest mt-0.5">
                            ${(item.price ?? item.products?.price ?? 0).toFixed(2)} × {item.quantity}
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
            <Card className="border-zinc-200 dark:border-zinc-800 shadow-sm border-dashed bg-zinc-50/30 dark:bg-zinc-900/10">
              <CardContent className="p-4">
                <div className="flex items-center justify-between gap-4">
                  <span className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-400">Payment Reference</span>
                  <span className="font-mono text-xs font-bold text-zinc-500">{order.paystack_id}</span>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  )
}
