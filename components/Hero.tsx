"use client";

import Image from 'next/image';
import { 
  ArrowRight, 
  Play, 
} from 'lucide-react';
import Link from 'next/link';

/**
 * Hero Component
 * Featuring high-impact copy and a stylized product showcase.
 */
export default function Hero() {
  return (
    <section className="relative w-full min-h-[calc(100vh-80px)] bg-background flex flex-col lg:flex-row overflow-hidden py-12 sm:py-20 lg:py-24">
      {/* Left Content Area */}
      <div className="flex-1 flex flex-col justify-center px-6 lg:px-20 py-12 lg:py-0 order-2 lg:order-1">
        <div className="max-w-xl">
          {/* Badge */}
          <div className="inline-block px-4 py-1.5 border border-border rounded-full mb-8 animate-in fade-in slide-in-from-left-4 duration-700">
            <span className="text-[10px] uppercase tracking-[0.3em] text-muted-foreground font-black">Exclusive Collection</span>
          </div>

          {/* Main Headline */}
          <h2 className="text-5xl md:text-6xl lg:text-8xl font-serif italic text-foreground leading-[1.05] mb-8 tracking-tighter animate-in fade-in slide-in-from-bottom-4 duration-700 delay-100">
            A Scent That <br />
            Stays Even After <br />
            You Leave!
          </h2>

          {/* Subtext */}
          <p className="text-muted-foreground text-sm md:text-base leading-relaxed mb-12 max-w-sm font-medium animate-in fade-in slide-in-from-bottom-4 duration-700 delay-200">
            Inspired by moments that linger—warmth, closeness, and timeless confidence. 
            Crafted for the modern explorer of the senses.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5 animate-in fade-in slide-in-from-bottom-4 duration-700 delay-300">
            <Link href="/shop" className="group flex items-center bg-primary text-primary-foreground px-10 py-5 rounded-full hover:opacity-90 transition-all duration-300 shadow-xl shadow-primary/10 active:scale-[0.98]">
              <span className="font-bold uppercase text-xs tracking-widest mr-4">Explore Shop</span>
              <div className="bg-white/10 p-1.5 rounded-full group-hover:translate-x-1 transition-transform">
                <ArrowRight size={18} />
              </div>
            </Link>

            <button className="group flex items-center bg-secondary hover:bg-secondary/80 text-foreground px-10 py-5 rounded-full transition-all duration-300 font-bold uppercase text-xs tracking-widest active:scale-[0.98]">
              <span className="mr-4">Our Story</span>
              <div className="border border-foreground/20 p-1.5 rounded-full group-hover:scale-110 transition-transform flex items-center justify-center">
                <Play size={14} fill="currentColor" className="ml-0.5" />
              </div>
            </button>
          </div>
        </div>
      </div>

      {/* Right Image/Visual Area */}
      <div className="flex-1 relative order-1 lg:order-2 flex items-center justify-center p-6 lg:p-12">
        {/* Stylized Image Container with rounded corners */}
        <div className="relative w-full aspect-square lg:aspect-auto lg:h-[85%] max-h-[800px] rounded-[3.5rem] overflow-hidden shadow-2xl animate-in fade-in zoom-in duration-1000">
          {/* Main Background Image */}
          <Image 
            src="https://images.unsplash.com/photo-1594035910387-fea47794261f?auto=format&fit=crop&q=80&w=1200" 
            alt="Opal Scents Fragrance Bottle"
            fill
            className="object-cover scale-105 hover:scale-100 transition-transform duration-1000"
            priority
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 800px"
          />
          
          <div className="absolute inset-0 bg-linear-to-t from-black/20 to-transparent pointer-events-none" />
        </div>
      </div>
    </section>
  );
}
