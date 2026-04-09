"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import AddProductForm from "@/components/AddProductForm";
import AdminProductList from "@/components/AdminProductList";
import { Plus, X, LayoutGrid } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function AdminProductsPage() {
  const [showAddForm, setShowAddForm] = useState(false);

  return (
    <div className="space-y-8 pb-24 md:pb-12 max-w-7xl mx-auto">
      {/* Header Area */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6 bg-white dark:bg-zinc-900/50 p-8 rounded-[2.5rem] border border-zinc-200 dark:border-zinc-800 shadow-xl shadow-zinc-900/5 relative overflow-hidden group">
        <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-[80px] -translate-y-1/2 translate-x-1/2" />

        <div className="relative z-10 space-y-2">
          <h2 className="text-3xl md:text-4xl font-serif tracking-tight text-zinc-900 dark:text-zinc-50 flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center text-primary">
              <LayoutGrid size={24} />
            </div>
            Catalog
          </h2>
          <div className="flex items-center gap-3">
            <p className="text-[10px] font-black uppercase tracking-[0.4em] text-muted-foreground opacity-60">
              Inventory Management
            </p>
            <span className="w-1 h-1 rounded-full bg-zinc-300" />
            <p className="text-[10px] font-black uppercase tracking-[0.4em] text-primary">
              Admin Suite
            </p>
          </div>
        </div>

        <Button
          onClick={() => setShowAddForm(!showAddForm)}
          className="relative z-10 w-full sm:w-auto rounded-2xl h-14 px-8 text-xs font-black uppercase tracking-widest gap-3 shadow-2xl shadow-primary/20 hover:shadow-primary/30 active:scale-95 transition-all duration-300"
        >
          {showAddForm ? (
            <>
              <X size={18} /> Close Editor
            </>
          ) : (
            <>
              <Plus size={18} /> New Product
            </>
          )}
        </Button>
      </div>

      <div className="grid gap-10 lg:grid-cols-12 items-start">
        {/* Add Product Form - Collapsible on all screen sizes */}
        <div
          className={`${showAddForm ? "block animate-in slide-in-from-left-4 fade-in" : "hidden"} lg:col-span-4 xl:col-span-4 sticky top-8 transition-all duration-500`}
        >
          <Card className="border-zinc-200 dark:border-zinc-800 shadow-2xl bg-white dark:bg-zinc-900/50 overflow-hidden rounded-[3rem] border-t-8 border-t-primary/10">
            <CardHeader className="border-b border-zinc-100 dark:border-zinc-800 bg-zinc-50/30 dark:bg-zinc-900/30 p-8">
              <CardTitle className="text-xl font-serif tracking-tight flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-primary/5 flex items-center justify-center text-primary">
                  <Plus size={20} />
                </div>
                Create Entry
              </CardTitle>
              <p className="text-xs text-muted-foreground font-medium mt-1">
                Add a new fragrance to your collection
              </p>
            </CardHeader>
            <CardContent className="p-8">
              <AddProductForm />
            </CardContent>
          </Card>
        </div>

        {/* Product Catalog - Main View */}
        <div
          className={`${showAddForm ? "lg:col-span-8 xl:col-span-8" : "lg:col-span-12 xl:col-span-12"} transition-all duration-700`}
        >
          <Card className="border-zinc-200 dark:border-zinc-800 shadow-xl bg-white dark:bg-zinc-900/50 rounded-[3rem] overflow-hidden">
            <CardHeader className="p-8 border-b border-zinc-100 dark:border-zinc-800 flex flex-col sm:flex-row items-center sm:items-start justify-between text-center sm:text-left gap-4">
              <div>
                <CardTitle className="text-xl font-serif tracking-tight">
                  Active Inventory
                </CardTitle>
                <p className="text-xs text-muted-foreground font-medium mt-1">
                  Monitor and edit your product listings
                </p>
              </div>
            </CardHeader>
            <CardContent className="p-6 sm:p-8">
              <AdminProductList />
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
