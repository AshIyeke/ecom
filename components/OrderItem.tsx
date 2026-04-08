"use client"

import { Package, CheckCircle2, Clock, AlertCircle } from "lucide-react"
import { format } from "date-fns"
import Link from "next/link"

interface OrderItemProps {
  order: any
}

export default function OrderItem({ order }: OrderItemProps) {
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

  const getStatusColorClass = (status: string) => {
    switch (status.toLowerCase()) {
      case 'paid':
        return 'text-green-600'
      case 'pending':
        return 'text-amber-600'
      case 'failed':
        return 'text-red-600'
      default:
        return 'text-zinc-600'
    }
  }

  return (
    <Link 
      href={`/account/orders/${order.id}`}
      className="flex flex-col md:flex-row md:items-center justify-between p-4 border border-zinc-200 dark:border-zinc-800 rounded-xl hover:bg-zinc-50 dark:hover:bg-zinc-900/50 transition-all hover:shadow-sm gap-4 group"
    >
      <div className="flex items-start gap-4">
        <div className="bg-zinc-100 dark:bg-zinc-800 p-3 rounded-xl group-hover:bg-white dark:group-hover:bg-zinc-800 transition-colors">
          <Package className="h-6 w-6 text-zinc-600 dark:text-zinc-400" />
        </div>
        <div>
          <div className="flex items-center gap-2 flex-wrap">
            <p className="font-bold text-sm uppercase tracking-wider text-zinc-900 dark:text-zinc-100">
              Order #{order.id.slice(0, 8)}
            </p>
            <div className="flex items-center gap-1.5 bg-white dark:bg-zinc-950 px-2.5 py-1 rounded-full border border-zinc-200 dark:border-zinc-800 text-[10px] font-bold uppercase tracking-widest shadow-sm">
              {getStatusIcon(order.status)}
              <span className={getStatusColorClass(order.status)}>
                {order.status}
              </span>
            </div>
          </div>
          <p className="text-xs text-zinc-500 mt-1.5">
            {format(new Date(order.created_at), 'PPP')}
          </p>
          <div className="mt-3 flex -space-x-2 overflow-hidden">
            {order.order_items?.map((item: any, idx: number) => (
              <div key={idx} className="inline-block h-8 w-8 rounded-full ring-2 ring-white dark:ring-zinc-950 bg-zinc-100 dark:bg-zinc-800 overflow-hidden shadow-sm">
                {item.products?.image_url ? (
                  <img src={item.products.image_url} alt={item.products.name} className="h-full w-full object-cover" />
                ) : (
                  <div className="h-full w-full flex items-center justify-center text-[10px] font-bold uppercase text-zinc-400">
                    {item.products?.name?.charAt(0)}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="text-left md:text-right border-t md:border-t-0 pt-4 md:pt-0">
        <p className="text-lg font-bold text-zinc-900 dark:text-zinc-50">
          ${Number(order.total_amount).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
        </p>
        <p className="text-[10px] text-zinc-500 uppercase tracking-widest mt-1 font-semibold">
          {order.order_items?.length || 0} {order.order_items?.length === 1 ? 'Item' : 'Items'}
        </p>
      </div>
    </Link>
  )
}
