"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {  
  User, 
  ShoppingBag, 
  Menu, 
  X,
  LogOut
} from 'lucide-react';
import { useCart } from '@/store/useCart';
import { useAuth } from '@/store/AuthContext';

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user, role, signOut } = useAuth();
  const { items } = useCart();
  const itemCount = items.reduce((acc: number, item: any) => acc + item.quantity, 0);

  return (
    <nav className="w-full bg-background/80 backdrop-blur-md border-b border-border sticky top-0 z-50 transition-all">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between relative">
        {/* Left Side: Branding */}
        <Link href="/" className="flex flex-col items-start cursor-pointer group z-10">
          <h1 className="text-xl sm:text-2xl font-serif tracking-[0.3em] font-light text-foreground leading-tight group-hover:opacity-80 transition-opacity uppercase">Opal Scents</h1>
          <span className="text-[7px] sm:text-[9px] tracking-[0.5em] font-black text-muted-foreground -mt-0.5 group-hover:opacity-80 transition-opacity uppercase opacity-70">Signature Fragrance</span>
        </Link>

        {/* Center: Navigation Links (Desktop Only) */}
        <div className="hidden lg:flex items-center space-x-10 absolute left-1/2 -translate-x-1/2">
          <Link href="/shop" className="text-[11px] font-black uppercase tracking-[0.2em] text-muted-foreground hover:text-foreground transition-colors">Shop</Link>
          <Link href="/story" className="text-[11px] font-black uppercase tracking-[0.2em] text-muted-foreground hover:text-foreground transition-colors">Story</Link>
          <Link href="/contact" className="text-[11px] font-black uppercase tracking-[0.2em] text-muted-foreground hover:text-foreground transition-colors">Contact</Link>
        </div>

        {/* Right Side: Icons, Auth & Mobile Menu */}
        <div className="flex items-center space-x-1 lg:space-x-3 z-10">
          {user ? (
            <div className="flex items-center space-x-1">
              <Link 
                href={role === "admin" ? "/admin" : "/account"} 
                className="p-2.5 hover:bg-secondary rounded-full transition-colors text-foreground/80 hover:text-foreground"
                title={role === "admin" ? "Admin Panel" : "My Account"}
              >
                <User size={19} strokeWidth={1.5} />
              </Link>
              <button 
                onClick={() => signOut()}
                className="p-2.5 hover:bg-secondary rounded-full transition-colors text-foreground/80 hover:text-foreground"
                title="Sign Out"
              >
                <LogOut size={19} strokeWidth={1.5} />
              </button>
            </div>
          ) : (
            <div className="hidden sm:flex items-center space-x-2 mr-2">
              <Link 
                href="/login" 
                className="text-[11px] font-black uppercase tracking-widest text-muted-foreground hover:text-foreground px-4 py-2 transition-colors"
              >
                Login
              </Link>
              <Link 
                href="/signup" 
                className="text-[10px] font-black uppercase tracking-widest bg-primary text-primary-foreground px-5 py-2.5 rounded-full hover:opacity-90 transition-all shadow-sm active:scale-[0.98]"
              >
                Join
              </Link>
            </div>
          )}

          <Link href="/cart" className="p-2.5 hover:bg-secondary rounded-full transition-colors text-foreground/80 hover:text-foreground relative">
            <ShoppingBag size={19} strokeWidth={1.5} />
            {itemCount > 0 && (
              <span className="absolute top-1.5 right-1.5 bg-primary text-primary-foreground text-[8px] font-bold w-4 h-4 flex items-center justify-center rounded-full border-2 border-background animate-in zoom-in duration-300">
                {itemCount}
              </span>
            )}
          </Link>

          {/* Mobile Menu Toggle */}
          <button 
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="p-2.5 hover:bg-secondary rounded-full transition-colors lg:hidden text-foreground/80 hover:text-foreground ml-1"
          >
            {isMenuOpen ? <X size={20} strokeWidth={1.5} /> : <Menu size={20} strokeWidth={1.5} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {isMenuOpen && (
        <div className="lg:hidden absolute top-20 left-0 w-full bg-background shadow-2xl border-t border-border p-8 flex flex-col space-y-6 animate-in slide-in-from-top-4 duration-300">
          <Link href="/shop" onClick={() => setIsMenuOpen(false)} className="text-2xl font-serif tracking-tight text-foreground border-b border-border pb-4 flex justify-between items-center group">
            Shop <ChevronRight size={20} className="text-muted-foreground group-hover:translate-x-1 transition-transform" />
          </Link>
          <Link href="/story" onClick={() => setIsMenuOpen(false)} className="text-2xl font-serif tracking-tight text-foreground border-b border-border pb-4 flex justify-between items-center group">
            Story <ChevronRight size={20} className="text-muted-foreground group-hover:translate-x-1 transition-transform" />
          </Link>
          <Link href="/contact" onClick={() => setIsMenuOpen(false)} className="text-2xl font-serif tracking-tight text-foreground border-b border-border pb-4 flex justify-between items-center group">
            Contact <ChevronRight size={20} className="text-muted-foreground group-hover:translate-x-1 transition-transform" />
          </Link>
          
          {user ? (
            <div className="pt-6 flex flex-col space-y-3">
              <Link href="/account" onClick={() => setIsMenuOpen(false)} className="flex items-center justify-center space-x-2 text-sm font-bold uppercase tracking-widest text-foreground bg-secondary p-4 rounded-2xl">
                <User size={18} />
                <span>My Account</span>
              </Link>
              <button 
                onClick={() => {
                  signOut();
                  setIsMenuOpen(false);
                }} 
                className="flex items-center justify-center space-x-2 text-sm font-bold uppercase tracking-widest text-primary-foreground bg-primary p-4 rounded-2xl"
              >
                <LogOut size={18} />
                <span>Sign Out</span>
              </button>
            </div>
          ) : (
            <div className="pt-6 flex flex-col space-y-3">
              <Link href="/login" onClick={() => setIsMenuOpen(false)} className="text-sm font-bold uppercase tracking-widest text-foreground bg-secondary p-4 rounded-2xl text-center">Login</Link>
              <Link href="/signup" onClick={() => setIsMenuOpen(false)} className="text-sm font-bold uppercase tracking-widest text-primary-foreground bg-primary p-4 rounded-2xl text-center">Join Now</Link>
            </div>
          )}
        </div>
      )}
    </nav>
  );
}

// Helper icon for mobile menu
function ChevronRight({ size, className }: { size: number, className: string }) {
  return (
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      width={size} 
      height={size} 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      className={className}
    >
      <path d="m9 18 6-6-6-6"/>
    </svg>
  );
}
