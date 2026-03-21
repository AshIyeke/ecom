"use client";

import { useAuth } from "@/store/AuthContext";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useEffect } from "react";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const { user, role, loading, signOut } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && role !== "admin") {
      router.push("/");
    }
  }, [role, loading, router]);

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  if (role !== "admin") {
    return null;
  }

  return (
    <div className="flex h-screen">
      <aside className="w-64 bg-gray-900 text-white p-6 flex flex-col justify-between">
        <nav>
          <h2 className="text-xl font-bold mb-6">Admin Panel</h2>
          <Link href="/admin/products" className="block py-2 hover:text-gray-300">Products</Link>
          <Link href="/admin/orders" className="block py-2 hover:text-gray-300">Orders</Link>
        </nav>
        
        <button 
          onClick={() => signOut()}
          className="w-full text-left py-2 text-red-400 hover:text-red-300 transition-colors"
        >
          Logout
        </button>
      </aside>
      <main className="flex-1 p-8 overflow-auto">{children}</main>
    </div>
  );
}
