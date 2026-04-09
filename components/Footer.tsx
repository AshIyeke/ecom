"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  Instagram, 
  Twitter, 
  Facebook, 
  Mail, 
  MapPin, 
  Phone,
  ArrowRight
} from "lucide-react";

export default function Footer() {
  const pathname = usePathname();
  
  // Hide footer on admin and account routes
  const hideFooter = pathname?.startsWith("/admin") || pathname?.startsWith("/account");
  
  if (hideFooter) return null;

  return (
    <footer className="bg-background border-t border-border mt-20">
      <div className="max-w-7xl mx-auto px-6 py-16 lg:py-24">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
          
          {/* Brand Column */}
          <div className="space-y-6">
            <Link href="/" className="flex flex-col items-start group">
              <h2 className="text-2xl font-serif tracking-[0.2em] font-light text-foreground uppercase">Opal Scents</h2>
              <span className="text-[8px] tracking-[0.4em] font-black text-muted-foreground -mt-1 uppercase opacity-70">Signature Fragrance</span>
            </Link>
            <p className="text-muted-foreground text-sm leading-relaxed max-w-xs font-medium">
              Elevating the art of scent. We craft hand-blended, small-batch fragrances designed to leave a lasting impression.
            </p>
            <div className="flex items-center gap-4">
              <Link href="#" className="p-2 rounded-full bg-secondary text-foreground/70 hover:text-foreground transition-colors">
                <Instagram size={18} />
              </Link>
              <Link href="#" className="p-2 rounded-full bg-secondary text-foreground/70 hover:text-foreground transition-colors">
                <Twitter size={18} />
              </Link>
              <Link href="#" className="p-2 rounded-full bg-secondary text-foreground/70 hover:text-foreground transition-colors">
                <Facebook size={18} />
              </Link>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-6">
            <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-foreground">Collection</h3>
            <ul className="space-y-4">
              <li>
                <Link href="/shop" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">All Fragrances</Link>
              </li>
              <li>
                <Link href="/story" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">Our Story</Link>
              </li>
              <li>
                <Link href="#" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">Best Sellers</Link>
              </li>
              <li>
                <Link href="#" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">Gift Sets</Link>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div className="space-y-6">
            <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-foreground">Support</h3>
            <ul className="space-y-4">
              <li>
                <Link href="#" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">Shipping Policy</Link>
              </li>
              <li>
                <Link href="#" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">Returns & Exchanges</Link>
              </li>
              <li>
                <Link href="#" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">FAQs</Link>
              </li>
              <li>
                <Link href="/contact" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">Contact Us</Link>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div className="space-y-6">
            <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-foreground">Newsletter</h3>
            <p className="text-sm text-muted-foreground font-medium">
              Join our list for exclusive releases and scent stories.
            </p>
            <form className="relative group">
              <input 
                type="email" 
                placeholder="Email Address" 
                className="w-full bg-secondary border border-transparent focus:border-border rounded-xl px-4 py-3.5 text-sm font-medium outline-none transition-all pr-12"
              />
              <button 
                type="submit"
                className="absolute right-2 top-1/2 -translate-y-1/2 p-2 bg-primary text-primary-foreground rounded-lg hover:opacity-90 transition-all"
              >
                <ArrowRight size={16} strokeWidth={3} />
              </button>
            </form>
          </div>
        </div>

        <div className="mt-16 lg:mt-24 pt-8 border-t border-border flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground opacity-60">
            © 2024 Opal Scents. All Rights Reserved.
          </p>
          <div className="flex items-center gap-8">
            <Link href="#" className="text-[9px] font-black uppercase tracking-widest text-muted-foreground hover:text-foreground transition-colors">Privacy Policy</Link>
            <Link href="#" className="text-[9px] font-black uppercase tracking-widest text-muted-foreground hover:text-foreground transition-colors">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
