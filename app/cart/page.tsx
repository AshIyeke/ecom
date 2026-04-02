import React from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import CartContainer from "@/components/CartContainer";
import CheckoutButton from "@/components/CheckoutButton";

export default function CartPage() {
  return (
    <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8 min-h-[calc(100vh-80px)]">
      <div className="mb-12">
        <Link 
          href="/shop" 
          className="inline-flex items-center text-xs font-bold uppercase tracking-widest text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-50 transition-colors gap-2"
        >
          <ArrowLeft size={16} />
          Back to Shop
        </Link>
        <h1 className="text-4xl font-serif tracking-[0.1em] text-zinc-900 dark:text-zinc-50 mt-6">
          YOUR CART
        </h1>
      </div>

      <CartContainer>
        <CheckoutButton />
      </CartContainer>
    </div>
  );
}
