"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Sparkles,
  Wind,
  Leaf,
  ShieldCheck,
  ArrowRight,
  Droplets,
} from "lucide-react";
import { Button } from "@/components/ui/button";

export default function StoryPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section - Narrative Entry */}
      <section className="relative h-[80vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-zinc-950/40 z-10" />
          <Image
            src="https://i.pinimg.com/1200x/7a/4b/e4/7a4be4f056afdbd960701ad466fafc0c.jpg"
            alt="Artisanal perfume bottles on a marble surface"
            fill
            className="object-cover scale-105 animate-slow-zoom"
            priority
          />
        </div>

        <div className="relative z-20 text-center max-w-4xl px-6">
          <span className="inline-block px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-[0.4em] bg-white/10 backdrop-blur-md text-white border border-white/20 mb-8 animate-in fade-in slide-in-from-bottom-3 duration-500">
            Our Narrative
          </span>
          <h1 className="text-5xl md:text-8xl font-serif tracking-tight text-white mb-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
            The Art of <br />{" "}
            <span className="italic text-white/70">Invisible</span> Presence.
          </h1>
          <div className="bg-black/10 backdrop-blur-sm px-8 py-8 rounded-3xl border border-white/5 animate-in fade-in slide-in-from-bottom-5 duration-1000 max-w-3xl mx-auto">
            <p className="text-white/80 text-lg md:text-xl leading-relaxed font-medium">
              Opal Scents was born from a simple belief: that a fragrance is more
              than a scent—it is a signature of the soul, a silent story told to
              the world.
            </p>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20 animate-bounce">
          <div className="w-[1px] h-12 bg-gradient-to-b from-white/0 via-white to-white/0" />
        </div>
      </section>

      {/* Chapter 1: The Origin */}
      <section className="py-24 lg:py-40 max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          <div className="space-y-8 order-2 lg:order-1">
            <h2 className="text-[11px] font-black uppercase tracking-[0.4em] text-primary">
              Chapter I
            </h2>
            <h3 className="text-4xl md:text-5xl font-serif tracking-tight text-foreground">
              A Luminous Beginning.
            </h3>
            <div className="space-y-6 text-muted-foreground text-lg leading-relaxed font-medium">
              <p>
                Founded in a sun-drenched studio in the heart of New York, Opal
                Scents began as an experimental project by master perfumer
                Alexander Opal. Frustrated by the synthetic repetition of
                mass-market fragrances, he sought to return to the roots of
                traditional alchemy.
              </p>
              <p>
                Named after the opal stone—known for its "play of color"—our
                fragrances are designed to shift and evolve on the skin,
                revealing different facets of their personality throughout the
                day.
              </p>
            </div>
          </div>
          <div className="relative aspect-[4/5] rounded-3xl overflow-hidden shadow-2xl order-1 lg:order-2">
            <Image
              src="https://i.pinimg.com/736x/75/ca/1b/75ca1bf5aedb2187144e7bba2cb1ff98.jpg"
              alt="Perfumer at work"
              fill
              className="object-cover"
            />
          </div>
        </div>
      </section>

      {/* Section: The Process (Dark Aesthetic) */}
      <section className="bg-zinc-950 py-24 lg:py-40 text-white overflow-hidden relative">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/10 rounded-full blur-[120px] -z-0 opacity-30" />

        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="text-center max-w-3xl mx-auto mb-20 lg:mb-32">
            <h2 className="text-[11px] font-black uppercase tracking-[0.4em] text-primary mb-6">
              Chapter II
            </h2>
            <h3 className="text-4xl md:text-6xl font-serif tracking-tight mb-8">
              The Alchemy of Scent.
            </h3>
            <p className="text-zinc-400 text-lg leading-relaxed font-medium">
              We reject the industrial. We embrace the intentional. Every bottle
              of Opal Scents is a result of meticulous precision and patient
              aging.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <ProcessStep
              icon={<Droplets size={32} className="text-primary" />}
              title="Rare Extraction"
              description="We source botanical absolute oils and resins from sustainable small-hold farms across five continents."
            />
            <ProcessStep
              icon={<Wind size={32} className="text-primary" />}
              title="Small Batch Maceration"
              description="Our scents age in temperature-controlled glass for 90 days, allowing the notes to marry and deepen naturally."
            />
            <ProcessStep
              icon={<Sparkles size={32} className="text-primary" />}
              title="Hand-Numbered"
              description="Every bottle is hand-poured and individually numbered in our studio, a testament to its unique character."
            />
          </div>
        </div>
      </section>

      {/* Chapter 3: Our Philosophy */}
      <section className="py-24 lg:py-40 max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          <div className="relative aspect-square md:aspect-[16/10] lg:aspect-square rounded-3xl overflow-hidden shadow-xl">
            <Image
              src="https://images.unsplash.com/photo-1588514912908-8f5891714f8d?q=80&w=1169&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              alt="Natural botanical ingredients and dried flowers"
              fill
              className="object-cover"
            />
          </div>
          <div className="space-y-10">
            <h2 className="text-[11px] font-black uppercase tracking-[0.4em] text-primary">
              Chapter III
            </h2>
            <h3 className="text-4xl md:text-5xl font-serif tracking-tight text-foreground">
              Conscious Luxury.
            </h3>

            <div className="space-y-8">
              <ValueItem
                icon={<Leaf className="text-zinc-400" size={24} />}
                title="Sustainable Sourcing"
                description="We only partner with ethical suppliers who ensure the longevity of the ecosystems providing our ingredients."
              />
              <ValueItem
                icon={<ShieldCheck className="text-zinc-400" size={24} />}
                title="Clean Formulation"
                description="Zero phthalates, zero parabens, and zero animal testing. Pure fragrance, uncompromising quality."
              />
            </div>

            <Button
              asChild
              className="rounded-full px-8 h-14 text-xs font-black uppercase tracking-widest mt-4"
            >
              <Link href="/shop" className="flex items-center gap-2">
                Explore the Collection <ArrowRight size={16} />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Final Quote Section */}
      <section className="py-24 lg:py-40 bg-secondary/30 text-center px-6 border-y border-border">
        <div className="max-w-3xl mx-auto space-y-8">
          <div className="flex justify-center mb-8">
            <div className="w-12 h-1 bg-primary/20 rounded-full" />
          </div>
          <p className="text-3xl md:text-5xl font-serif italic text-foreground leading-tight">
            &ldquo;Scent is the most intense form of memory, and the most
            beautiful form of forgetfulness.&rdquo;
          </p>
          <div className="space-y-1">
            <p className="text-[10px] font-black uppercase tracking-[0.4em] text-muted-foreground">
              Alexander Opal
            </p>
            <p className="text-xs font-medium text-muted-foreground opacity-60 italic">
              Founder & Master Perfumer
            </p>
          </div>
        </div>
      </section>

      <style jsx global>{`
        @keyframes slow-zoom {
          from {
            transform: scale(1);
          }
          to {
            transform: scale(1.1);
          }
        }
        .animate-slow-zoom {
          animation: slow-zoom 20s infinite alternate ease-in-out;
        }
      `}</style>
    </div>
  );
}

function ProcessStep({
  icon,
  title,
  description,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
}) {
  return (
    <div className="p-10 rounded-3xl bg-white/5 border border-white/10 hover:border-primary/30 transition-all group">
      <div className="mb-6 group-hover:scale-110 transition-transform duration-500">
        {icon}
      </div>
      <h4 className="text-xl font-serif mb-4 text-white">{title}</h4>
      <p className="text-zinc-400 text-sm leading-relaxed font-medium">
        {description}
      </p>
    </div>
  );
}

function ValueItem({
  icon,
  title,
  description,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
}) {
  return (
    <div className="flex gap-6">
      <div className="mt-1">{icon}</div>
      <div className="space-y-2">
        <h4 className="text-sm font-black uppercase tracking-widest text-foreground">
          {title}
        </h4>
        <p className="text-muted-foreground text-base font-medium leading-relaxed">
          {description}
        </p>
      </div>
    </div>
  );
}
