'use client'

import Link from 'next/link'
import { CheckCircle2, ShoppingBag, ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useSearchParams } from 'next/navigation'
import { Suspense } from 'react'

function SuccessContent() {
  const searchParams = useSearchParams()
  const reference = searchParams.get('reference') || searchParams.get('trxref')

  return (
    <div className="max-w-md w-full bg-white dark:bg-zinc-900 rounded-3xl shadow-xl border border-zinc-200 dark:border-zinc-800 p-8 text-center space-y-6">
      {/* Success Icon */}
      <div className="flex justify-center">
        <div className="w-20 h-20 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center animate-bounce">
          <CheckCircle2 className="w-12 h-12 text-green-600 dark:text-green-400" />
        </div>
      </div>

      {/* Text Content */}
      <div className="space-y-2">
        <h1 className="text-3xl font-bold text-zinc-900 dark:text-zinc-50">
          Payment Successful!
        </h1>
        <p className="text-zinc-500 dark:text-zinc-400">
          Thank you for your purchase. Your order has been placed successfully and is being processed.
        </p>
        {reference && (
          <p className="text-sm font-mono text-zinc-400 pt-2">
            Ref: {reference}
          </p>
        )}
      </div>

      <div className="pt-4 space-y-3">
        <Button asChild className="w-full py-6 rounded-xl text-lg font-semibold group cursor-pointer">
          <Link href="/account/orders">
            View My Orders
            <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Link>
        </Button>
        
        <Button asChild variant="outline" className="w-full py-6 rounded-xl text-lg font-semibold cursor-pointer">
          <Link href="/shop">
            <ShoppingBag className="mr-2 w-5 h-5" />
            Continue Shopping
          </Link>
        </Button>
      </div>

      {/* Order Info Note */}
      <p className="text-xs text-zinc-400 dark:text-zinc-500 pt-4">
        A confirmation email will be sent to your registered address shortly.
      </p>
    </div>
  )
}

export default function SuccessPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-zinc-50 dark:bg-zinc-950 p-4">
      <Suspense fallback={<div>Loading...</div>}>
        <SuccessContent />
      </Suspense>
    </div>
  )
}
