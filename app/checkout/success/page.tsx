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
    <div className="max-w-md w-full bg-card text-card-foreground rounded-[2rem] shadow-2xl border border-border p-10 text-center space-y-8 animate-in fade-in zoom-in duration-500">
      {/* Success Icon */}
      <div className="flex justify-center">
        <div className="w-24 h-24 bg-green-50 dark:bg-green-900/20 rounded-full flex items-center justify-center animate-bounce">
          <CheckCircle2 className="w-14 h-14 text-green-600 dark:text-green-400" />
        </div>
      </div>

      {/* Text Content */}
      <div className="space-y-3">
        <h1 className="text-4xl font-black text-foreground tracking-tighter">
          Payment Successful!
        </h1>
        <p className="text-muted-foreground font-medium leading-relaxed">
          Thank you for choosing <span className="text-foreground font-bold italic">Opal Scents</span>. Your order has been placed and is now being prepared with care.
        </p>
        {reference && (
          <div className="inline-block px-4 py-1.5 bg-muted rounded-full mt-4">
            <p className="text-[10px] font-black font-mono text-muted-foreground uppercase tracking-widest">
              Reference: {reference}
            </p>
          </div>
        )}
      </div>

      <div className="pt-4 space-y-4">
        <Button asChild className="w-full py-7 rounded-2xl text-lg font-bold group cursor-pointer shadow-lg shadow-primary/10">
          <Link href="/account/orders">
            View My Orders
            <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Link>
        </Button>
        
        <Button asChild variant="secondary" className="w-full py-7 rounded-2xl text-lg font-bold cursor-pointer">
          <Link href="/shop">
            <ShoppingBag className="mr-2 w-5 h-5" />
            Continue Shopping
          </Link>
        </Button>
      </div>

      {/* Order Info Note */}
      <p className="text-[10px] text-muted-foreground font-black uppercase tracking-[0.2em] pt-4 opacity-60">
        A confirmation will be sent shortly.
      </p>
    </div>
  )
}

export default function SuccessPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-6">
      <Suspense fallback={
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-primary/20 border-t-primary rounded-full animate-spin" />
          <p className="text-muted-foreground font-black uppercase text-[10px] tracking-widest">Verifying Payment...</p>
        </div>
      }>
        <SuccessContent />
      </Suspense>
    </div>
  )
}
