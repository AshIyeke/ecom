import React from 'react';
import Image from 'next/image';

/**
 * FragranceShowcase Component
 * Updated to include a large hero media section with rounded corners 
 * and custom video-style controls as shown in the reference.
 */
export default function FragranceShowcase() {
  const fragranceNotes = [
    {
      category: "Top Notes",
      description: "Sweet Opening"
    },
    {
      category: "Heart Notes",
      description: "Mild Aromatic with vanilla"
    },
    {
      category: "Base Notes",
      description: "Amber, Nuts & Powdery"
    }
  ];

  return (
    <div className="min-h-screen bg-[#F9F7F2] flex flex-col items-center py-12 px-6 md:px-12 font-sans text-[#333]">
      <div className="max-w-6xl w-full">
        
        {/* Top Section: Text Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-24 items-start mb-16">
          
          {/* Left Column: Branding & Copy */}
          <section className="space-y-6">
            <h1 className="text-5xl md:text-6xl font-serif italic leading-[1.1] tracking-tight">
              Fragrance That Leaves <br /> Your Presence Behind
            </h1>
            
            <p className="text-base md:text-lg text-gray-600 leading-relaxed max-w-md">
              Only For You is more than a scent, it's your signature. Crafted to 
              blend with your natural chemistry, it adapts uniquely to you. With 
              warm amber, soft vanilla, and deep aromatic woods, it leaves an 
              unforgettable trail wherever you go.
            </p>
          </section>

          {/* Right Column: Fragrance Notes */}
          <section className="pt-2">
            <h2 className="text-xs font-bold tracking-[0.2em] text-gray-500 uppercase mb-6">
              Fragrance Notes
            </h2>
            
            <div className="divide-y divide-gray-300">
              {fragranceNotes.map((note, index) => (
                <div key={index} className="py-5 first:pt-0">
                  <h3 className="text-base font-semibold mb-1">
                    {note.category}
                  </h3>
                  <p className="text-sm text-gray-600">
                    {note.description}
                  </p>
                </div>
              ))}
              <div className="border-t border-gray-300"></div>
            </div>
          </section>
        </div>

        {/* Bottom Section: Hero Media with Controls */}
        <div className="relative group w-full aspect-[16/9] md:aspect-[21/9] overflow-hidden rounded-[2rem] shadow-2xl">
          {/* Main Visual: Perfume Bottle Placeholder */}
          <Image 
            src="https://images.unsplash.com/photo-1541643600914-78b084683601?auto=format&fit=crop&q=80&w=2000" 
            alt="Fragrance bottle on volcanic rock"
            fill
            className="object-cover brightness-90 transition-transform duration-700 group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 100vw, 1200px"
          />

          {/* Video Controls Overlay
          <div className="absolute top-6 left-6 flex items-center gap-1 bg-black/20 backdrop-blur-md border border-white/20 rounded-lg p-1">
            <button className="p-2 hover:bg-white/20 rounded text-white transition-colors">
              <Maximize2 size={16} strokeWidth={2.5} />
            </button>
            <div className="w-[1px] h-4 bg-white/20 mx-1" />
            <button className="p-2 hover:bg-white/20 rounded text-white transition-colors">
              <Pause size={16} strokeWidth={2.5} fill="currentColor" />
            </button>
            <div className="w-[1px] h-4 bg-white/20 mx-1" />
            <button className="p-2 hover:bg-white/20 rounded text-white transition-colors">
              <Volume2 size={16} strokeWidth={2.5} />
            </button>
          </div> */}

          {/* Logo Overlay on Bottle (Mockup)
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="text-center">
              <span className="text-white text-4xl md:text-6xl font-serif tracking-widest opacity-80 mix-blend-overlay">
                SOAR
              </span>
            </div>
          </div> */}
        </div>

      </div>
    </div>
  );
};

