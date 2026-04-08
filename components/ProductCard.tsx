"use client";

import Image from "next/image";
import { ShoppingCart, Star } from "lucide-react";
import { useCart } from "@/store/useCart";
import Link from "next/link";
import { ProductCardType } from "@/types/product";

interface ProductCardProps {
  product: ProductCardType;
}

export default function ProductCard({ product }: ProductCardProps) {
  const { addItem } = useCart();

  return (
    <div className="group relative bg-card text-card-foreground border border-border rounded-2xl overflow-hidden shadow-xs hover:shadow-xl hover:-translate-y-1 transition-all duration-500">
      <Link href={`/shop/${product.id}`}>
        <div className="aspect-square relative overflow-hidden bg-muted">
          <Image
            src={product.image}
            alt={product.name}
            fill
            className="object-cover group-hover:scale-110 transition-transform duration-700 ease-in-out"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
          />
          <div className="absolute top-4 left-4">
            <span className="bg-background/80 backdrop-blur-md px-3 py-1.5 rounded-xl text-[10px] font-black uppercase tracking-[0.15em] text-foreground border border-border shadow-sm">
              {product.category}
            </span>
          </div>
        </div>
      </Link>
      
      <div className="p-5 space-y-3">
        <div className="flex items-center gap-1.5">
          <div className="flex items-center">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                size={12}
                className={`${
                  i < Math.floor(product.rating)
                    ? "fill-primary text-primary"
                    : "fill-muted text-muted-foreground/20"
                }`}
              />
            ))}
          </div>
          <span className="text-[10px] text-muted-foreground font-black tracking-widest">{product.rating.toFixed(1)}</span>
        </div>
        
        <Link href={`/shop/${product.id}`}>
          <h3 className="font-bold text-foreground line-clamp-1 group-hover:text-primary transition-colors text-base tracking-tight">
            {product.name}
          </h3>
        </Link>
        
        <div className="flex items-center justify-between pt-1">
          <p className="text-xl font-black text-foreground tracking-tighter">
            ${(product.price || 0).toFixed(2)}
          </p>
          <button 
            onClick={() => addItem(product)}
            className="cursor-pointer bg-primary text-primary-foreground p-2.5 rounded-xl hover:opacity-90 transition-all shadow-md shadow-primary/10 active:scale-[0.95]"
            aria-label="Add to cart"
          >
            <ShoppingCart size={18} strokeWidth={2.5} />
          </button>
        </div>
      </div>
    </div>
  );
}
