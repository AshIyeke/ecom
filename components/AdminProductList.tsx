"use client";

import { useGetProductsQuery, useDeleteProductMutation } from "@/store/api/productApi";
import { 
  Loader2, Package, Eye, Pencil, Trash2, 
  AlertTriangle, RefreshCw, Search, Filter,
  ChevronDown
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState, useMemo, useEffect } from "react";
import { getCategories } from "@/app/shop/actions";
import { Category } from "@/types/product";

export default function AdminProductList() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [selectedStatus, setSelectedStatus] = useState<string>("all");
  const [selectedStock, setSelectedStock] = useState<"all" | "low" | "out">("all");

  const [deleteProduct] = useDeleteProductMutation();

  const handleDelete = async (id: string, name: string) => {
    if (window.confirm(`Are you sure you want to delete "${name}"?`)) {
      try {
        await deleteProduct(id).unwrap();
      } catch (err) {
        console.error("Failed to delete product:", err);
        alert("Failed to delete product.");
      }
    }
  };

  useEffect(() => {
    getCategories().then(setCategories).catch(console.error);
  }, []);

  // Stabilize query arguments
  const queryArgs = useMemo(() => {
    const args: any = { 
      isAdmin: true, 
      limit: 50,
      search: searchTerm || undefined,
      category: selectedCategory === "all" ? undefined : selectedCategory,
      stockStatus: selectedStock === "all" ? undefined : selectedStock,
    };

    if (selectedStatus === "live") args.isPublished = true;
    else if (selectedStatus === "draft") args.isPublished = false;
    else args.isPublished = null; // "all"

    return args;
  }, [searchTerm, selectedCategory, selectedStatus, selectedStock]);

  const { data, isLoading, error, refetch, isFetching } = useGetProductsQuery(queryArgs);
  
  const products = data?.products || [];

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      {/* Filters Header */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 p-5 bg-muted/50 rounded-2xl border border-border">
        {/* Search */}
        <div className="relative lg:col-span-2">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" size={16} />
          <input
            type="text"
            placeholder="Search products..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-11 pr-4 py-2.5 bg-background border border-border rounded-xl text-sm font-medium focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
          />
        </div>

        {/* Category Filter */}
        <div className="relative">
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="w-full pl-4 pr-10 py-2.5 bg-background border border-border rounded-xl text-sm font-bold appearance-none focus:ring-2 focus:ring-primary outline-none transition-all cursor-pointer"
          >
            <option value="all">All Categories</option>
            {categories.map((cat) => (
              <option key={cat.id} value={cat.id}>{cat.name}</option>
            ))}
          </select>
          <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none" size={14} />
        </div>

        {/* Status Filter */}
        <div className="relative">
          <select
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
            className="w-full pl-4 pr-10 py-2.5 bg-background border border-border rounded-xl text-sm font-bold appearance-none focus:ring-2 focus:ring-primary outline-none transition-all cursor-pointer"
          >
            <option value="all">All Status</option>
            <option value="live">Live Only</option>
            <option value="draft">Drafts Only</option>
          </select>
          <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none" size={14} />
        </div>

        {/* Stock Filter */}
        <div className="relative">
          <select
            value={selectedStock}
            onChange={(e) => setSelectedStock(e.target.value as any)}
            className={`w-full pl-4 pr-10 py-2.5 bg-background border border-border rounded-xl text-sm font-bold appearance-none focus:ring-2 focus:ring-primary outline-none transition-all cursor-pointer ${
              selectedStock !== "all" ? "text-destructive" : ""
            }`}
          >
            <option value="all">All Stock</option>
            <option value="low">Low Stock (≤5)</option>
            <option value="out">Out of Stock (0)</option>
          </select>
          <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none" size={14} />
        </div>
      </div>

      {/* Loading & Error States */}
      {isLoading ? (
        <div className="flex flex-col items-center justify-center py-20 gap-4">
          <Loader2 className="animate-spin text-primary" size={40} />
          <p className="text-muted-foreground font-black uppercase text-[10px] tracking-[0.2em] animate-pulse">Loading Products...</p>
        </div>
      ) : error ? (
        <div className="text-center py-12 bg-destructive/5 rounded-2xl border border-destructive/20 p-8">
          <AlertTriangle className="mx-auto text-destructive mb-4" size={48} />
          <h3 className="text-foreground font-black uppercase text-xs tracking-widest mb-2">Query Failed</h3>
          <p className="text-muted-foreground text-sm mb-6 max-w-xs mx-auto font-medium">
            {(error as any)?.data || "Something went wrong while filtering your collection."}
          </p>
          <button 
            onClick={() => refetch()}
            className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-xl text-xs font-black uppercase tracking-widest hover:opacity-90 transition-all shadow-lg shadow-primary/10"
          >
            <RefreshCw size={14} className={isFetching ? "animate-spin" : ""} />
            Retry Query
          </button>
        </div>
      ) : products.length === 0 ? (
        <div className="text-center py-24 bg-muted/30 rounded-[2rem] border border-dashed border-border">
          <Package className="mx-auto text-muted-foreground/30 mb-4" size={64} />
          <p className="text-foreground font-bold tracking-tight mb-2">No products found</p>
          <p className="text-muted-foreground text-sm mb-6 font-medium">Try adjusting your filters or search term.</p>
          <button 
            onClick={() => {
              setSearchTerm("");
              setSelectedCategory("all");
              setSelectedStatus("all");
              setSelectedStock("all");
            }}
            className="text-primary text-xs font-black uppercase tracking-widest hover:underline"
          >
            Reset all filters
          </button>
        </div>
      ) : (
        <div className="space-y-4">
          <div className="flex items-center justify-between px-2">
            <span className="text-[10px] font-black text-muted-foreground uppercase tracking-[0.2em]">
              {products.length} Products Found
            </span>
            {isFetching && (
              <div className="flex items-center gap-2 text-[10px] font-black text-primary uppercase tracking-[0.2em] animate-pulse">
                <RefreshCw size={10} className="animate-spin" />
                Synchronizing...
              </div>
            )}
          </div>
          
          {/* Desktop Table View */}
          <div className="hidden md:block overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-border">
                  <th className="py-5 px-4 text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground">Product</th>
                  <th className="py-5 px-4 text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground">Category</th>
                  <th className="py-5 px-4 text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground">Stock</th>
                  <th className="py-5 px-4 text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground">Price</th>
                  <th className="py-5 px-4 text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground">Status</th>
                  <th className="py-5 px-4 text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border/50">
                {products.map((product) => (
                  <tr key={product.id} className="group hover:bg-muted/30 transition-all duration-300">
                    <td className="py-5 px-4">
                      <div className="flex items-center gap-4">
                        <div className="relative w-12 h-12 rounded-xl overflow-hidden bg-muted flex-shrink-0 border border-border transition-transform group-hover:scale-105">
                          <Image
                            src={product.image_url}
                            alt={product.name}
                            fill
                            className="object-cover"
                            sizes="48px"
                          />
                        </div>
                        <span className="font-bold text-foreground text-sm tracking-tight truncate max-w-[180px]">
                          {product.name}
                        </span>
                      </div>
                    </td>
                    <td className="py-5 px-4 text-xs font-bold text-muted-foreground uppercase tracking-widest">
                      {product.categories?.name || "Global"}
                    </td>
                    <td className="py-5 px-4">
                      <span className={`text-sm font-black ${product.stock <= 5 ? 'text-destructive' : 'text-foreground'}`}>
                        {product.stock}
                      </span>
                    </td>
                    <td className="py-5 px-4 font-black text-foreground text-sm tracking-tighter">
                      ${(product.price || 0).toFixed(2)}
                    </td>
                    <td className="py-5 px-4">
                      <span className={`inline-flex items-center px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest border ${
                        product.is_published 
                          ? 'bg-green-50 text-green-700 border-green-100 dark:bg-green-900/20 dark:text-green-400 dark:border-green-900/30' 
                          : 'bg-muted text-muted-foreground border-border'
                      }`}>
                        {product.is_published ? 'Live' : 'Draft'}
                      </span>
                    </td>
                    <td className="py-5 px-4 text-right">
                      <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-x-2 group-hover:translate-x-0">
                        <Link 
                          href={`/admin/products/${product.id}`}
                          className="p-2 rounded-xl text-muted-foreground hover:text-foreground hover:bg-background border border-transparent hover:border-border shadow-xs transition-all"
                        >
                          <Eye size={16} />
                        </Link>
                        <Link
                          href={`/admin/products/${product.id}`}
                          className="p-2 rounded-xl text-muted-foreground hover:text-primary hover:bg-background border border-transparent hover:border-border shadow-xs transition-all"
                        >
                          <Pencil size={16} />
                        </Link>
                        <button 
                          onClick={() => handleDelete(product.id, product.name)}
                          className="p-2 rounded-xl text-muted-foreground hover:text-destructive hover:bg-background border border-transparent hover:border-border shadow-xs transition-all"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile Card View */}
          <div className="md:hidden space-y-4">
            {products.map((product) => (
              <div 
                key={product.id} 
                className="bg-card border border-border rounded-2xl p-5 space-y-5 shadow-xs"
              >
                <div className="flex items-center gap-4">
                  <div className="relative w-20 h-20 rounded-2xl overflow-hidden bg-muted flex-shrink-0 border border-border">
                    <Image
                      src={product.image_url}
                      alt={product.name}
                      fill
                      className="object-cover"
                      sizes="80px"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="font-bold text-foreground text-base tracking-tight truncate">{product.name}</h4>
                    <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground mt-0.5">{product.categories?.name || "Global"}</p>
                    <div className="flex items-center gap-3 mt-2">
                      <span className="text-lg font-black text-foreground tracking-tighter">
                        ${(product.price || 0).toFixed(2)}
                      </span>
                      <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-[8px] font-black uppercase tracking-widest border ${
                        product.is_published 
                          ? 'bg-green-50 text-green-700 border-green-100 dark:bg-green-900/20 dark:text-green-400 dark:border-green-900/30' 
                          : 'bg-muted text-muted-foreground border-border'
                      }`}>
                        {product.is_published ? 'Live' : 'Draft'}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-border">
                  <div className="flex flex-col">
                    <span className="text-[10px] uppercase font-black tracking-widest text-muted-foreground">Inventory</span>
                    <span className={`text-sm font-black ${product.stock <= 5 ? 'text-destructive' : 'text-foreground'}`}>
                      {product.stock} units
                    </span>
                  </div>
                  <div className="flex gap-2">
                    <Link 
                      href={`/admin/products/${product.id}`}
                      className="p-2.5 rounded-xl bg-muted text-foreground border border-border shadow-xs"
                    >
                      <Eye size={18} />
                    </Link>
                    <Link
                      href={`/admin/products/${product.id}`}
                      className="p-2.5 rounded-xl bg-primary/5 text-primary border border-primary/10 shadow-xs"
                    >
                      <Pencil size={18} />
                    </Link>
                    <button 
                      onClick={() => handleDelete(product.id, product.name)}
                      className="p-2.5 rounded-xl bg-destructive/5 text-destructive border border-destructive/10 shadow-xs"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
