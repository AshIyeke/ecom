"use client";

import { useCart } from "@/store/useCart";
import { ShoppingCart } from "lucide-react";
import { ProductCardType } from "@/types/product";

interface AddToCartButtonProps {
  product: ProductCardType;
}

export default function AddToCartButton({ product }: AddToCartButtonProps) {
  const { addItem } = useCart();

  return (
    <button 
      onClick={() => addItem(product)}
      className="w-full md:w-auto flex items-center justify-center gap-3 bg-zinc-900 dark:bg-zinc-50 text-zinc-50 dark:text-zinc-900 py-4 px-8 rounded-xl font-bold hover:opacity-90 transition-all shadow-lg active:scale-[0.98]"
    >
      <ShoppingCart size={20} />
      Add to Cart
    </button>
  );
}
