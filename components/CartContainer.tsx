"use client";

import React from "react";
import Link from "next/link";
import { ShoppingBag } from "lucide-react";
import { useCart } from "@/store/useCart";
import CartItemCard from "@/components/CartItemCard";

interface CartContainerProps {
  children: React.ReactNode;
}

export default function CartContainer({ children }: CartContainerProps) {
  const { items, isLoading } = useCart();

  const subtotal = items.reduce(
    (acc: number, item: any) => acc + item.products.price * item.quantity,
    0
  );
  const shipping = items.length > 0 ? 10.0 : 0;
  const total = subtotal + shipping;

  if (isLoading) {
    return (
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="animate-pulse space-y-8">
          <div className="h-8 bg-zinc-100 dark:bg-zinc-800 rounded w-48" />
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            <div className="lg:col-span-2 space-y-4">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="h-32 bg-zinc-100 dark:bg-zinc-800 rounded-2xl" />
              ))}
            </div>
            <div className="h-64 bg-zinc-100 dark:bg-zinc-800 rounded-2xl" />
          </div>
        </div>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="text-center py-20 bg-zinc-50 dark:bg-zinc-900/50 rounded-2xl border border-dashed border-zinc-200 dark:border-zinc-800">
        <ShoppingBag size={48} className="mx-auto text-zinc-300 dark:text-zinc-700 mb-4" />
        <p className="text-zinc-500 dark:text-zinc-400 font-medium italic">
          Your cart is currently empty.
        </p>
        <Link
          href="/shop"
          className="inline-block mt-6 px-8 py-3 bg-zinc-900 text-white dark:bg-zinc-50 dark:text-zinc-900 rounded-full text-xs font-bold uppercase tracking-widest hover:opacity-90 transition-opacity"
        >
          Start Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
      {/* Cart Items List */}
      <div className="lg:col-span-2 space-y-2">
        <div className="border-t border-zinc-100 dark:border-zinc-800">
          {items.map((item: any) => (
            <CartItemCard key={item.id} item={item} />
          ))}
        </div>
      </div>

      {/* Order Summary */}
      <div className="lg:col-span-1">
        <div className="bg-white dark:bg-zinc-900 p-8 rounded-2xl border border-zinc-200 dark:border-zinc-800 shadow-sm sticky top-32">
          <h2 className="text-sm font-bold uppercase tracking-widest text-zinc-900 dark:text-zinc-50 mb-6">
            Order Summary
          </h2>
          
          <div className="space-y-4">
            <div className="flex justify-between text-sm">
              <span className="text-zinc-500 dark:text-zinc-400">Subtotal</span>
              <span className="font-bold text-zinc-900 dark:text-zinc-50">
                ${subtotal.toFixed(2)}
              </span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-zinc-500 dark:text-zinc-400">Shipping</span>
              <span className="font-bold text-zinc-900 dark:text-zinc-50">
                ${shipping.toFixed(2)}
              </span>
            </div>
            <div className="pt-4 border-t border-zinc-100 dark:border-zinc-800 flex justify-between">
              <span className="text-sm font-bold uppercase tracking-widest text-zinc-900 dark:text-zinc-50">
                Total
              </span>
              <span className="text-lg font-bold text-zinc-900 dark:text-zinc-50">
                ${total.toFixed(2)}
              </span>
            </div>
          </div>

          {children}
          
          <p className="text-[10px] text-center text-zinc-400 mt-4 uppercase tracking-[0.2em]">
            Secure Payment Powered by Paystack
          </p>
        </div>
      </div>
    </div>
  );
}
