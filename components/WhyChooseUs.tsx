import React from 'react';
import { Check, Clock, Wind, Banknote, RotateCcw } from 'lucide-react';

export default function WhyChooseUs() {
  return (
    <div className="min-h-screen bg-black text-white p-8 md:p-16 lg:p-24 font-sans selection:bg-white selection:text-black">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-y-24 items-start">
        
        {/* Top Left: Brand Story */}
        <div className="space-y-6">
          <h2 className="text-4xl md:text-5xl font-serif italic leading-tight">
            Born from Passion,<br />
            Crafted with Purpose.
          </h2>
          <p className="text-gray-400 text-sm md:text-base leading-relaxed max-w-md">
            We don't just create perfumes, we craft emotions that linger. Every 
            <span className="text-white font-bold mx-1">OPAL SCENTS</span> 
            bottle is hand-blended in small batches with globally sourced ingredients 
            for depth and uniqueness. From Bangladesh to the world, we make scent personal again.
          </p>
        </div>

        {/* Top Right: Quality Stats Box */}
        <div className="border border-zinc-800 rounded-3xl p-8 md:p-12 space-y-8 bg-zinc-900/20 backdrop-blur-sm self-start">
          <div className="flex items-start gap-4">
            <Check className="w-5 h-5 mt-1 text-zinc-400" />
            <div>
              <h3 className="text-3xl font-serif">100%</h3>
              <p className="text-zinc-500 text-xs mt-1">Hand-Blended</p>
            </div>
          </div>
          <div className="flex items-start gap-4">
            <Check className="w-5 h-5 mt-1 text-zinc-400" />
            <div>
              <h3 className="text-3xl font-serif">Small-Batch</h3>
              <p className="text-zinc-500 text-xs mt-1">Craftsmanship</p>
            </div>
          </div>
          <div className="flex items-start gap-4">
            <Check className="w-5 h-5 mt-1 text-zinc-400" />
            <div>
              <h3 className="text-3xl font-serif">Global</h3>
              <p className="text-zinc-500 text-xs mt-1">Sourced Ingredients</p>
            </div>
          </div>
        </div>

        {/* Bottom Left: Features Box */}
        <div className="border border-zinc-800 rounded-3xl p-8 md:p-12 space-y-10 bg-zinc-900/20 backdrop-blur-sm">
          <div className="flex items-start gap-5">
            <Clock className="w-6 h-6 text-zinc-400 mt-1" />
            <div>
              <h4 className="text-2xl font-serif">Long-lasting</h4>
              <p className="text-zinc-500 text-xs mt-1">1+ hour on skin, 6+ hours on clothes</p>
            </div>
          </div>
          <div className="flex items-start gap-5">
            <Wind className="w-6 h-6 text-zinc-400 mt-1" />
            <div>
              <h4 className="text-2xl font-serif">Balanced Aroma</h4>
              <p className="text-zinc-500 text-xs mt-1">Perfectly crafted for any occasion</p>
            </div>
          </div>
          <div className="flex items-start gap-5">
            <Banknote className="w-6 h-6 text-zinc-400 mt-1" />
            <div>
              <h4 className="text-2xl font-serif">Cash on Delivery</h4>
              <p className="text-zinc-500 text-xs mt-1">Rocket fast delivery all over Bangladesh</p>
            </div>
          </div>
          <div className="flex items-start gap-5">
            <RotateCcw className="w-6 h-6 text-zinc-400 mt-1" />
            <div>
              <h4 className="text-2xl font-serif">5 Day Return</h4>
              <p className="text-zinc-500 text-xs mt-1">Risk free guarantee on every purchase</p>
            </div>
          </div>
        </div>

        {/* Bottom Right: Value Proposition */}
        <div className="space-y-6 md:mt-24">
          <h2 className="text-4xl md:text-5xl font-serif italic leading-tight">
            Why Choose Opal Scents<br />
            Fragrance
          </h2>
          <p className="text-gray-400 text-sm md:text-base leading-relaxed max-w-md">
            From pure ingredients to ethical craftsmanship, every detail is 
            designed to give you a fragrance you'll love and trust.
          </p>
        </div>

      </div>
    </div>
  );
};
