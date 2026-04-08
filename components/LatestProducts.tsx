"use client";

import { useEffect, useState } from "react";
import { getProducts } from "@/lib/supabase/queries/products";
import ProductCard from "./ProductCard";
import { Loader2, ArrowRight, Sparkles } from "lucide-react";
import Link from "next/link";

export default function LatestProducts() {
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchLatest() {
      try {
        const { products } = await getProducts({ limit: 5 });
        setProducts(products);
      } catch (err) {
        console.error("Failed to fetch latest products:", err);
      } finally {
        setLoading(false);
      }
    }
    fetchLatest();
  }, []);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-24 gap-4">
        <Loader2 className="animate-spin text-primary" size={40} />
        <p className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground animate-pulse">Curating Arrivals...</p>
      </div>
    );
  }

  if (products.length === 0) return null;

  return (
    <section className="py-24 px-6 bg-background">
      <div className="max-w-7xl mx-auto space-y-12">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/5 border border-primary/10 text-primary">
              <Sparkles size={12} fill="currentColor" />
              <span className="text-[10px] font-black uppercase tracking-widest">Just Arrived</span>
            </div>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif italic text-foreground tracking-tight leading-none">
              New Scent Stories
            </h2>
            <p className="text-muted-foreground text-sm font-medium max-w-md leading-relaxed">
              Discover our newest hand-blended creations, freshly added to our signature collection.
            </p>
          </div>
          
          <Link 
            href="/shop" 
            className="group inline-flex items-center gap-3 text-[11px] font-black uppercase tracking-[0.2em] text-foreground hover:opacity-70 transition-all"
          >
            Explore All 
            <div className="bg-secondary p-2 rounded-full group-hover:translate-x-1 transition-transform">
              <ArrowRight size={16} />
            </div>
          </Link>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
          {products.map((product) => (
            <ProductCard 
              key={product.id} 
              product={{
                id: product.id,
                name: product.name,
                price: product.price,
                image: product.image_url,
                category: product.categories?.name || "Signature",
                rating: 5 // Default for now
              }} 
            />
          ))}
        </div>
      </div>
    </section>
  );
}
