"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {  
  User, 
  ShoppingBag, 
  Menu, 
  X,
  LogOut,
  ChevronRight
} from 'lucide-react';
import { useCart } from '@/store/useCart';
import { useAuth } from '@/store/AuthContext';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetClose
} from "@/components/ui/sheet";

export default function Navbar() {
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

          {/* Mobile Menu Toggle with Sheet */}
          <Sheet>
            <SheetTrigger asChild>
              <button 
                className="p-2.5 hover:bg-secondary rounded-full transition-colors lg:hidden text-foreground/80 hover:text-foreground ml-1"
                aria-label="Open Menu"
              >
                <Menu size={20} strokeWidth={1.5} />
              </button>
            </SheetTrigger>
            <SheetContent side="top" className="h-auto p-0 pt-20 border-b border-border shadow-2xl">
              <SheetHeader className="sr-only">
                <SheetTitle>Navigation Menu</SheetTitle>
              </SheetHeader>
              <div className="p-8 flex flex-col space-y-6 bg-background animate-in slide-in-from-top-4 duration-300">
                <SheetClose asChild>
                  <Link href="/shop" className="text-2xl font-serif tracking-tight text-foreground border-b border-border pb-4 flex justify-between items-center group">
                    Shop <ChevronRight size={20} className="text-muted-foreground group-hover:translate-x-1 transition-transform" />
                  </Link>
                </SheetClose>
                <SheetClose asChild>
                  <Link href="/story" className="text-2xl font-serif tracking-tight text-foreground border-b border-border pb-4 flex justify-between items-center group">
                    Story <ChevronRight size={20} className="text-muted-foreground group-hover:translate-x-1 transition-transform" />
                  </Link>
                </SheetClose>
                <SheetClose asChild>
                  <Link href="/contact" className="text-2xl font-serif tracking-tight text-foreground border-b border-border pb-4 flex justify-between items-center group">
                    Contact <ChevronRight size={20} className="text-muted-foreground group-hover:translate-x-1 transition-transform" />
                  </Link>
                </SheetClose>
                
                {user ? (
                  <div className="pt-6 flex flex-col space-y-3">
                    <SheetClose asChild>
                      <Link href="/account" className="flex items-center justify-center space-x-2 text-sm font-bold uppercase tracking-widest text-foreground bg-secondary p-4 rounded-2xl">
                        <User size={18} />
                        <span>My Account</span>
                      </Link>
                    </SheetClose>
                    <SheetClose asChild>
                      <button 
                        onClick={() => signOut()} 
                        className="flex items-center justify-center space-x-2 text-sm font-bold uppercase tracking-widest text-primary-foreground bg-primary p-4 rounded-2xl"
                      >
                        <LogOut size={18} />
                        <span>Sign Out</span>
                      </button>
                    </SheetClose>
                  </div>
                ) : (
                  <div className="pt-6 flex flex-col space-y-3">
                    <SheetClose asChild>
                      <Link href="/login" className="text-sm font-bold uppercase tracking-widest text-foreground bg-secondary p-4 rounded-2xl text-center">Login</Link>
                    </SheetClose>
                    <SheetClose asChild>
                      <Link href="/signup" className="text-sm font-bold uppercase tracking-widest text-primary-foreground bg-primary p-4 rounded-2xl text-center">Join Now</Link>
                    </SheetClose>
                  </div>
                )}
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </nav>
  );
}
