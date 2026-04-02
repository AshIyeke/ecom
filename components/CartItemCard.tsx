"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Minus, Plus, Trash2 } from "lucide-react";
import { useCart } from "@/store/useCart";
import { CartItem } from "@/types/cart";

interface CartItemCardProps {
  item: CartItem;
}

export default function CartItemCard({ item }: CartItemCardProps) {
  const { updateQuantity, removeItem } = useCart();
  const { products: product } = item;

  const handleDecrease = () => {
    if (item.quantity > 1) {
      updateQuantity(item.id, item.quantity - 1);
    } else {
      removeItem(item.id);
    }
  };

  const handleIncrease = () => {
    updateQuantity(item.id, item.quantity + 1);
  };

  return (
    <div className="flex items-center gap-4 py-6 border-b border-zinc-100 dark:border-zinc-800">
      {/* Product Image */}
      <Link href={`/shop/${product.id}`} className="relative w-24 h-24 rounded-xl overflow-hidden bg-zinc-50 dark:bg-zinc-900 flex-shrink-0 group">
        <Image
          src={product.image_url || "https://images.unsplash.com/photo-1541643600914-78b084683601?auto=format&fit=crop&q=80&w=200"}
          alt={product.name}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-500"
        />
      </Link>

      {/* Product Details */}
      <div className="flex-grow min-w-0">
        <Link href={`/shop/${product.id}`}>
          <h3 className="text-sm font-bold uppercase tracking-widest text-zinc-900 dark:text-zinc-50 truncate hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
            {product.name}
          </h3>
        </Link>
        <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-1">
          Fragrance Collection
        </p>
        <div className="mt-4 flex items-center justify-between">
          <div className="flex items-center gap-3 bg-zinc-50 dark:bg-zinc-950 p-1 rounded-lg border border-zinc-200 dark:border-zinc-800">
            <button
              onClick={handleDecrease}
              className="p-1 hover:bg-white dark:hover:bg-zinc-800 rounded-md transition-colors text-zinc-500 dark:text-zinc-400"
            >
              <Minus size={14} />
            </button>
            <span className="text-xs font-bold w-4 text-center text-zinc-900 dark:text-zinc-50">
              {item.quantity}
            </span>
            <button
              onClick={handleIncrease}
              className="p-1 hover:bg-white dark:hover:bg-zinc-800 rounded-md transition-colors text-zinc-500 dark:text-zinc-400"
            >
              <Plus size={14} />
            </button>
          </div>
          
          <button
            onClick={() => removeItem(item.id)}
            className="p-2 text-zinc-400 hover:text-red-500 transition-colors"
          >
            <Trash2 size={18} />
          </button>
        </div>
      </div>

      {/* Price */}
      <div className="text-right flex-shrink-0">
        <p className="text-sm font-bold text-zinc-900 dark:text-zinc-50">
          ${(product.price * item.quantity).toFixed(2)}
        </p>
        {item.quantity > 1 && (
          <p className="text-[10px] text-zinc-500 dark:text-zinc-400 mt-1">
            ${product.price.toFixed(2)} each
          </p>
        )}
      </div>
    </div>
  );
}
