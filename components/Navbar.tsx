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
    <nav className="w-full bg-[#F9F8F6] border-b border-gray-100 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between relative">
        {/* Left Side: Branding */}
        <Link href="/" className="flex flex-col items-start cursor-pointer group z-10">
          <h1 className="text-2xl sm:text-3xl font-serif tracking-[0.2em] font-light text-gray-900 leading-tight group-hover:opacity-80 transition-opacity">SOAR</h1>
          <span className="text-[8px] sm:text-[10px] tracking-[0.4em] font-medium text-gray-500 -mt-1 group-hover:opacity-80 transition-opacity">FRAGRANCE</span>
        </Link>

        {/* Center: Navigation Links (Desktop Only) */}
        <div className="hidden lg:flex items-center space-x-8 absolute left-1/2 -translate-x-1/2">
          <Link href="/shop" className="text-[10px] font-bold uppercase tracking-widest text-zinc-500 hover:text-zinc-900 transition-colors">Shop</Link>
          <Link href="#" className="text-[10px] font-bold uppercase tracking-widest text-zinc-500 hover:text-zinc-900 transition-colors">Story</Link>
          <Link href="#" className="text-[10px] font-bold uppercase tracking-widest text-zinc-500 hover:text-zinc-900 transition-colors">Contact</Link>
        </div>

        {/* Right Side: Icons, Auth & Mobile Menu */}
        <div className="flex items-center space-x-2 lg:space-x-4 z-10">
          {user ? (
            <div className="flex items-center space-x-2">
              <Link 
                href={role === "admin" ? "/admin" : "/account"} 
                className="p-2 hover:bg-gray-200 rounded-full transition-colors text-gray-700"
                title={role === "admin" ? "Admin Panel" : "My Account"}
              >
                <User size={20} strokeWidth={1.5} />
              </Link>
              <button 
                onClick={() => signOut()}
                className="p-2 hover:bg-gray-200 rounded-full transition-colors text-gray-700"
                title="Sign Out"
              >
                <LogOut size={20} strokeWidth={1.5} />
              </button>
            </div>
          ) : (
            <div className="hidden sm:flex items-center space-x-2">
              <Link 
                href="/login" 
                className="text-xs font-semibold uppercase tracking-widest text-zinc-600 hover:text-zinc-900 px-3 py-2 transition-colors"
              >
                Login
              </Link>
              <Link 
                href="/signup" 
                className="text-[10px] font-bold uppercase tracking-widest bg-zinc-900 text-white px-4 py-2 rounded-full hover:bg-zinc-800 transition-colors"
              >
                Join
              </Link>
            </div>
          )}

          <Link href="/cart" className="p-2 hover:bg-gray-200 rounded-full transition-colors text-gray-700 relative">
            <ShoppingBag size={20} strokeWidth={1.5} />
            {itemCount > 0 && (
              <span className="absolute top-1 right-1 bg-red-500 text-white text-[8px] w-3.5 h-3.5 flex items-center justify-center rounded-full border border-white">
                {itemCount}
              </span>
            )}
          </Link>

          {/* Mobile Menu Toggle - Only visible on mobile/tablet */}
          <button 
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="p-2 hover:bg-gray-200 rounded-full transition-colors lg:hidden text-gray-700"
          >
            {isMenuOpen ? <X size={20} strokeWidth={1.5} /> : <Menu size={20} strokeWidth={1.5} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {isMenuOpen && (
        <div className="lg:hidden absolute top-20 left-0 w-full bg-[#F9F8F6] shadow-xl border-t border-gray-100 p-6 flex flex-col space-y-4 animate-in slide-in-from-top-2 duration-200">
          <Link href="/shop" onClick={() => setIsMenuOpen(false)} className="text-lg font-medium text-gray-800 border-b border-gray-100 pb-2">Shop</Link>
          <Link href="#" onClick={() => setIsMenuOpen(false)} className="text-lg font-medium text-gray-800 border-b border-gray-100 pb-2">Story</Link>
          <Link href="#" onClick={() => setIsMenuOpen(false)} className="text-lg font-medium text-gray-800 border-b border-gray-100 pb-2">Contact</Link>
          {user ? (
            <div className="pt-4 flex flex-col space-y-2">
              <button 
                onClick={() => {
                  signOut();
                  setIsMenuOpen(false);
                }} 
                className="flex items-center justify-center space-x-2 text-lg font-bold text-white bg-zinc-900 p-3 rounded-lg text-center"
              >
                <LogOut size={20} strokeWidth={2} />
                <span>Sign Out</span>
              </button>
            </div>
          ) : (
            <div className="pt-4 flex flex-col space-y-2">
              <Link href="/login" onClick={() => setIsMenuOpen(false)} className="text-lg font-medium text-zinc-900 bg-zinc-100 p-3 rounded-lg text-center">Login</Link>
              <Link href="/signup" onClick={() => setIsMenuOpen(false)} className="text-lg font-bold text-white bg-zinc-900 p-3 rounded-lg text-center">Join Now</Link>
            </div>
          )}
        </div>
      )}
    </nav>
  );
}
