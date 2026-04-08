"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { useGetProfileQuery } from "@/store/api/profileApi"
import { useCart } from "@/store/useCart"
import { initiatePayment } from "./action"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { 
  Loader2, MapPin, CreditCard, ChevronRight, 
  CheckCircle2, ShoppingBag, ArrowLeft, Home, User
} from "lucide-react"
import Link from "next/link"
import Image from "next/image"

export default function CheckoutPage() {
  const router = useRouter()
  const { data: profile, isLoading: isProfileLoading } = useGetProfileQuery()
  const { items, isLoading: isCartLoading } = useCart()
  
  const [isSubmitting, setIsSubmitting] = useState(false)

  const isLoading = isProfileLoading || isCartLoading

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4">
        <Loader2 className="animate-spin text-zinc-400" size={40} />
        <p className="text-zinc-500 font-medium">Preparing your checkout...</p>
      </div>
    )
  }

  if (!items || items.length === 0) {
    router.push("/cart")
    return null
  }

  const subtotal = items.reduce(
    (acc: number, item: any) => acc + item.products.price * item.quantity,
    0
  )
  const shipping = 10.0
  const total = subtotal + shipping

  const shippingAddress = profile?.shipping_address
  const billingAddress = profile?.billing_address

  const handleCheckout = async () => {
    if (!shippingAddress || !shippingAddress.street) {
      alert("Please add a shipping address in your profile first")
      router.push("/account/profile")
      return
    }

    setIsSubmitting(true)
    try {
      const result = await initiatePayment(items, total, shippingAddress, billingAddress)
      if (result?.error) {
        alert(result.error)
        setIsSubmitting(false)
      } else if (result?.url) {
        window.location.href = result.url
      } else {
        throw new Error("No redirection URL received")
      }
    } catch (err: any) {
      console.error("Checkout failed:", err)
      alert(err.message || "Something went wrong. Please try again.")
      setIsSubmitting(false)
    }
  }

  return (
    <div className="max-w-6xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
      <div className="mb-8">
        <Link 
          href="/cart"
          className="inline-flex items-center gap-2 text-sm text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-50 transition-colors"
        >
          <ArrowLeft size={16} />
          Back to Cart
        </Link>
        <h1 className="text-3xl font-bold mt-4 tracking-tight">Checkout</h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        <div className="lg:col-span-2 space-y-8">
          {/* Shipping Address Review */}
          <section className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-bold flex items-center gap-2">
                <MapPin className="text-zinc-400" /> Shipping Address
              </h2>
              <Link href="/account/profile">
                <Button variant="ghost" size="sm" className="text-blue-600 font-bold uppercase text-[10px] tracking-widest">
                  Edit in Profile
                </Button>
              </Link>
            </div>

            <Card className="border-zinc-100 dark:border-zinc-800 shadow-sm overflow-hidden">
              <CardContent className="p-6">
                {shippingAddress?.street ? (
                  <div className="flex items-start gap-4">
                    <div className="p-3 bg-zinc-50 dark:bg-zinc-900 rounded-xl">
                      <Home className="text-zinc-400" size={20} />
                    </div>
                    <div>
                      <p className="font-bold text-lg">{shippingAddress.street}</p>
                      <p className="text-zinc-500">{shippingAddress.city}, {shippingAddress.state} {shippingAddress.zip}</p>
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-4">
                    <p className="text-zinc-500 italic mb-4">No shipping address found.</p>
                    <Button asChild variant="outline">
                      <Link href="/account/profile">Add Address to Profile</Link>
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          </section>

          {/* Billing Address Review */}
          <section className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-bold flex items-center gap-2">
                <CreditCard className="text-zinc-400" /> Payment Method
              </h2>
              <Link href="/account/profile">
                <Button variant="ghost" size="sm" className="text-blue-600 font-bold uppercase text-[10px] tracking-widest">
                  Edit in Profile
                </Button>
              </Link>
            </div>

            <Card className="border-zinc-100 dark:border-zinc-800 shadow-sm overflow-hidden">
              <CardContent className="p-6">
                {billingAddress?.cardholder_name ? (
                  <div className="flex items-start gap-4">
                    <div className="p-3 bg-zinc-50 dark:bg-zinc-900 rounded-xl">
                      <CreditCard className="text-zinc-400" size={20} />
                    </div>
                    <div>
                      <p className="font-bold text-lg">{billingAddress.cardholder_name}</p>
                      <p className="text-zinc-500 font-mono">•••• {billingAddress.card_number?.slice(-4) || '****'}</p>
                      <p className="text-[10px] text-zinc-400 mt-1 uppercase tracking-widest">Exp: {billingAddress.expiry_date}</p>
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-4">
                    <p className="text-zinc-500 italic mb-4">No payment method found.</p>
                    <Button asChild variant="outline">
                      <Link href="/account/profile">Add Payment Info to Profile</Link>
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          </section>
        </div>

        {/* Order Summary Sidebar */}
        <div className="lg:col-span-1">
          <Card className="sticky top-32 border-zinc-200 dark:border-zinc-800 shadow-xl overflow-hidden rounded-3xl">
            <CardHeader className="bg-zinc-50 dark:bg-zinc-900/50 border-b border-zinc-100 dark:border-zinc-800">
              <CardTitle className="text-sm font-bold uppercase tracking-widest text-zinc-500">Order Summary</CardTitle>
            </CardHeader>
            <CardContent className="p-6 space-y-6">
              <div className="max-h-60 overflow-y-auto space-y-4 pr-2 custom-scrollbar">
                {items.map((item: any) => (
                  <div key={item.id} className="flex gap-3">
                    <div className="relative h-12 w-12 rounded-lg overflow-hidden flex-shrink-0 bg-zinc-100 dark:bg-zinc-800">
                      {item.products.image_url ? (
                        <Image 
                          src={item.products.image_url} 
                          alt={item.products.name} 
                          fill 
                          className="object-cover"
                        />
                      ) : (
                        <div className="h-full w-full flex items-center justify-center bg-zinc-100 text-zinc-400 font-bold uppercase text-[10px]">
                          {item.products.name.charAt(0)}
                        </div>
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-bold truncate">{item.products.name}</p>
                      <p className="text-xs text-zinc-500">{item.quantity} × ${(item.products.price || 0).toFixed(2)}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="space-y-2 pt-4 border-t border-zinc-100 dark:border-zinc-800">
                <div className="flex justify-between text-sm">
                  <span className="text-zinc-500">Subtotal</span>
                  <span className="font-bold">${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-zinc-500">Shipping</span>
                  <span className="font-bold">${shipping.toFixed(2)}</span>
                </div>
                <div className="flex justify-between items-center pt-4 border-t border-zinc-100 dark:border-zinc-800">
                  <span className="text-base font-bold">Total</span>
                  <span className="text-2xl font-black">${total.toFixed(2)}</span>
                </div>
              </div>

              <Button 
                onClick={handleCheckout} 
                disabled={isSubmitting || !shippingAddress?.street}
                className="w-full py-6 rounded-2xl text-lg font-bold shadow-lg"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                    Processing...
                  </>
                ) : (
                  <>
                    Pay with Paystack
                    <ChevronRight className="ml-2 h-5 w-5" />
                  </>
                )}
              </Button>
              
              <p className="text-[10px] text-center text-zinc-400 uppercase tracking-widest leading-relaxed">
                By clicking "Pay with Paystack", you agree to our Terms & Conditions and Privacy Policy.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
