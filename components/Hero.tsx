"use client";

import React from 'react';
import Image from 'next/image';
import { 
  ArrowRight, 
  Play, 
} from 'lucide-react';

/**
 * Hero Component
 * Featuring high-impact copy and a stylized product showcase.
 */
export default function Hero() {
  return (
    <section className="relative w-full min-h-[calc(100vh-80px)] bg-[#F9F8F6] flex flex-col lg:flex-row overflow-hidden">
      {/* Left Content Area */}
      <div className="flex-1 flex flex-col justify-center px-6 lg:px-20 py-12 lg:py-0 order-2 lg:order-1">
        <div className="max-w-xl">
          {/* Badge */}
          <div className="inline-block px-4 py-1.5 border border-gray-200 rounded-full mb-8">
            <span className="text-xs uppercase tracking-[0.2em] text-gray-500 font-medium">Only For You</span>
          </div>

          {/* Main Headline */}
          <h2 className="text-5xl md:text-6xl lg:text-7xl font-serif italic text-gray-900 leading-[1.1] mb-8">
            A Scent That <br />
            Stays Even After <br />
            You Leave!
          </h2>

          {/* Subtext */}
          <p className="text-gray-500 text-sm md:text-base leading-relaxed mb-12 max-w-sm">
            Inspired by moments that linger—warmth, closeness, confidence. 
            Crafted for the modern explorer of the senses.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
            <button className="group flex items-center bg-[#2D2D2D] text-white px-8 py-4 rounded-full hover:bg-black transition-all duration-300">
              <span className="font-medium mr-4">Buy Now</span>
              <div className="bg-white/10 p-1 rounded-full group-hover:translate-x-1 transition-transform">
                <ArrowRight size={18} className="text-white" />
              </div>
            </button>

            <button className="group flex items-center bg-gray-200/50 hover:bg-gray-200 text-gray-800 px-8 py-4 rounded-full transition-all duration-300">
              <span className="font-medium mr-4">Watch Video</span>
              <div className="border border-gray-400 p-1 rounded-full group-hover:scale-110 transition-transform">
                <Play size={14} fill="currentColor" className="text-gray-600" />
              </div>
            </button>
          </div>
        </div>
      </div>

      {/* Right Image/Visual Area */}
      <div className="flex-1 relative order-1 lg:order-2 flex items-center justify-center p-6 lg:p-12 bg-gray-50/50">
        {/* Stylized Image Container with rounded corners */}
        <div className="relative w-full aspect-square lg:aspect-auto lg:h-full max-h-[700px] rounded-[3rem] overflow-hidden shadow-2xl">
          {/* Main Background Image - Using a high quality placeholder for fragrance on rocks */}
          <Image 
            src="https://images.unsplash.com/photo-1594035910387-fea47794261f?auto=format&fit=crop&q=80&w=1200" 
            alt="Soar Fragrance Bottle"
            fill
            className="object-cover"
            priority
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 800px"
          />
          
          {/* Overlay to mimic the "SOAR" bottle badge in the photo
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="bg-black/80 backdrop-blur-sm border border-white/10 p-4 px-6 rounded-sm text-center transform scale-75 md:scale-100 hidden md:block">
              <h3 className="text-white font-serif tracking-widest text-lg">SOAR</h3>
              <p className="text-[8px] text-gray-400 tracking-[0.3em] mt-1">FRAGRANCE</p>
            </div>
          </div> */}
        </div>
      </div>
    </section>
  );
}
