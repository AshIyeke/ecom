"use client";

import Image from "next/image";
import { ShoppingCart, Star } from "lucide-react";
import { useCart } from "@/store/useCart";
import Link from "next/link";

export interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
  category: string;
  rating: number;
}

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const { addItem } = useCart();

  return (
    <div className="group relative bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300">
      <Link href={`/shop/${product.id}`}>
        <div className="aspect-square relative overflow-hidden bg-zinc-100 dark:bg-zinc-800">
          <Image
            src={product.image}
            alt={product.name}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-500"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
          />
          <div className="absolute top-3 left-3">
            <span className="bg-white/90 dark:bg-zinc-900/90 backdrop-blur-xs px-2.5 py-1 rounded-lg text-[10px] font-bold uppercase tracking-wider text-zinc-600 dark:text-zinc-400 border border-zinc-200/50 dark:border-zinc-800/50 shadow-sm">
              {product.category}
            </span>
          </div>
        </div>
      </Link>
      
      <div className="p-4 space-y-2">
        <div className="flex items-center gap-1">
          {[...Array(5)].map((_, i) => (
            <Star
              key={i}
              size={12}
              className={`${
                i < Math.floor(product.rating)
                  ? "fill-yellow-400 text-yellow-400"
                  : "text-zinc-300 dark:text-zinc-700"
              }`}
            />
          ))}
          <span className="text-xs text-zinc-500 font-medium ml-1">{product.rating}</span>
        </div>
        
        <Link href={`/shop/${product.id}`}>
          <h3 className="font-semibold text-zinc-800 dark:text-zinc-100 line-clamp-1 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
            {product.name}
          </h3>
        </Link>
        
        <div className="flex items-center justify-between pt-2">
          <p className="text-lg font-bold text-zinc-900 dark:text-zinc-50">
            ${product.price.toFixed(2)}
          </p>
          <button 
            onClick={() => addItem(product)}
            className="cursor-pointer bg-zinc-900 dark:bg-zinc-50 text-zinc-50 dark:text-zinc-900 p-2 rounded-lg hover:bg-zinc-700 dark:hover:bg-zinc-200 transition-colors shadow-sm"
            aria-label="Add to cart"
          >
            <ShoppingCart size={18} />
          </button>
        </div>
      </div>
    </div>
  );
}
