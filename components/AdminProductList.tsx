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
    <div className="space-y-6">
      {/* Filters Header */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 p-4 bg-zinc-50 dark:bg-zinc-900/50 rounded-2xl border border-zinc-100 dark:border-zinc-800">
        {/* Search */}
        <div className="relative lg:col-span-2">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400" size={16} />
          <input
            type="text"
            placeholder="Search products..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-xl text-sm focus:ring-2 focus:ring-zinc-900 dark:focus:ring-zinc-50 outline-hidden transition-all"
          />
        </div>

        {/* Category Filter */}
        <div className="relative">
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="w-full pl-4 pr-10 py-2 bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-xl text-sm appearance-none focus:ring-2 focus:ring-zinc-900 dark:focus:ring-zinc-50 outline-hidden transition-all cursor-pointer"
          >
            <option value="all">All Categories</option>
            {categories.map((cat) => (
              <option key={cat.id} value={cat.id}>{cat.name}</option>
            ))}
          </select>
          <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-400 pointer-events-none" size={14} />
        </div>

        {/* Status Filter */}
        <div className="relative">
          <select
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
            className="w-full pl-4 pr-10 py-2 bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-xl text-sm appearance-none focus:ring-2 focus:ring-zinc-900 dark:focus:ring-zinc-50 outline-hidden transition-all cursor-pointer"
          >
            <option value="all">All Status</option>
            <option value="live">Live Only</option>
            <option value="draft">Drafts Only</option>
          </select>
          <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-400 pointer-events-none" size={14} />
        </div>

        {/* Stock Filter */}
        <div className="relative">
          <select
            value={selectedStock}
            onChange={(e) => setSelectedStock(e.target.value as any)}
            className={`w-full pl-4 pr-10 py-2 bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-xl text-sm appearance-none focus:ring-2 focus:ring-zinc-900 dark:focus:ring-zinc-50 outline-hidden transition-all cursor-pointer ${
              selectedStock !== "all" ? "text-red-500 font-bold" : ""
            }`}
          >
            <option value="all">All Stock</option>
            <option value="low">Low Stock (≤5)</option>
            <option value="out">Out of Stock (0)</option>
          </select>
          <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-400 pointer-events-none" size={14} />
        </div>
      </div>

      {/* Loading & Error States */}
      {isLoading ? (
        <div className="flex flex-col items-center justify-center py-20 gap-4">
          <Loader2 className="animate-spin text-zinc-900 dark:text-zinc-50" size={40} />
          <p className="text-zinc-500 font-medium animate-pulse text-sm">Refining results...</p>
        </div>
      ) : error ? (
        <div className="text-center py-12 bg-red-50 dark:bg-red-900/10 rounded-xl border border-red-100 dark:border-red-900/20 p-6">
          <AlertTriangle className="mx-auto text-red-500 mb-3" size={40} />
          <h3 className="text-red-800 dark:text-red-400 font-bold mb-1 text-sm">Query Failed</h3>
          <p className="text-red-600 dark:text-red-400/70 text-xs mb-4">
            {(error as any)?.data || "Something went wrong while filtering."}
          </p>
          <button 
            onClick={() => refetch()}
            className="inline-flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-lg text-xs font-bold hover:bg-red-700 transition-all"
          >
            <RefreshCw size={14} className={isFetching ? "animate-spin" : ""} />
            Retry Filter
          </button>
        </div>
      ) : products.length === 0 ? (
        <div className="text-center py-20 bg-zinc-50 dark:bg-zinc-900/50 rounded-2xl border border-dashed border-zinc-200 dark:border-zinc-800">
          <Package className="mx-auto text-zinc-300 mb-2" size={48} />
          <p className="text-zinc-500 font-medium text-sm">No products match your filters.</p>
          <button 
            onClick={() => {
              setSearchTerm("");
              setSelectedCategory("all");
              setSelectedStatus("all");
              setSelectedStock("all");
            }}
            className="text-blue-600 text-xs font-bold mt-2 hover:underline"
          >
            Clear all filters
          </button>
        </div>
      ) : (
        <div className="space-y-4">
          <div className="flex items-center justify-between px-2">
            <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest">
              Found {products.length} products
            </span>
            {isFetching && (
              <div className="flex items-center gap-2 text-[10px] font-bold text-blue-500 uppercase tracking-widest animate-pulse">
                <RefreshCw size={10} className="animate-spin" />
                Updating...
              </div>
            )}
          </div>
          
          {/* Desktop Table View */}
          <div className="hidden md:block overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-zinc-100 dark:border-zinc-800">
                  <th className="py-4 px-3 text-[10px] font-bold uppercase tracking-wider text-zinc-400">Product</th>
                  <th className="py-4 px-3 text-[10px] font-bold uppercase tracking-wider text-zinc-400">Category</th>
                  <th className="py-4 px-3 text-[10px] font-bold uppercase tracking-wider text-zinc-400">Stock</th>
                  <th className="py-4 px-3 text-[10px] font-bold uppercase tracking-wider text-zinc-400">Price</th>
                  <th className="py-4 px-3 text-[10px] font-bold uppercase tracking-wider text-zinc-400">Status</th>
                  <th className="py-4 px-3 text-[10px] font-bold uppercase tracking-wider text-zinc-400 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-50 dark:divide-zinc-800/50">
                {products.map((product) => (
                  <tr key={product.id} className="group hover:bg-zinc-50 dark:hover:bg-zinc-800/30 transition-colors">
                    <td className="py-4 px-3">
                      <div className="flex items-center gap-3">
                        <div className="relative w-10 h-10 rounded-lg overflow-hidden bg-zinc-100 dark:bg-zinc-800 flex-shrink-0 border border-zinc-200 dark:border-zinc-700">
                          <Image
                            src={product.image_url}
                            alt={product.name}
                            fill
                            className="object-cover"
                            sizes="40px"
                          />
                        </div>
                        <span className="font-semibold text-zinc-900 dark:text-zinc-50 text-sm truncate max-w-[120px]">
                          {product.name}
                        </span>
                      </div>
                    </td>
                    <td className="py-4 px-3 text-xs text-zinc-500 dark:text-zinc-400">
                      {product.categories?.name || "Uncategorized"}
                    </td>
                    <td className="py-4 px-3">
                      <span className={`text-xs font-bold ${product.stock <= 5 ? 'text-red-500' : 'text-zinc-600 dark:text-zinc-400'}`}>
                        {product.stock}
                      </span>
                    </td>
                    <td className="py-4 px-3 font-bold text-zinc-900 dark:text-zinc-50 text-sm">
                      ${product.price.toFixed(2)}
                    </td>
                    <td className="py-4 px-3">
                      <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-[9px] font-black uppercase tracking-tighter ${
                        product.is_published 
                          ? 'bg-green-100 text-green-700 dark:bg-green-900/20 dark:text-green-400' 
                          : 'bg-zinc-100 text-zinc-600 dark:bg-zinc-800 dark:text-zinc-400'
                      }`}>
                        {product.is_published ? 'Live' : 'Draft'}
                      </span>
                    </td>
                    <td className="py-4 px-3 text-right">
                      <div className="flex justify-end gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                        <Link 
                          href={`/admin/products/${product.id}`}
                          title="View Details"
                          className="p-1.5 rounded-lg text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-50 hover:bg-white dark:hover:bg-zinc-700 shadow-xs transition-all border border-transparent hover:border-zinc-200 dark:hover:border-zinc-600"
                        >
                          <Eye size={14} />
                        </Link>
                        <Link
                          href={`/admin/products/${product.id}`}
                          title="Edit Product"
                          className="p-1.5 rounded-lg text-zinc-400 hover:text-blue-600 hover:bg-white dark:hover:bg-zinc-700 shadow-xs transition-all border border-transparent hover:border-zinc-200 dark:hover:border-zinc-600"
                        >
                          <Pencil size={14} />
                        </Link>
                        <button 
                          onClick={() => handleDelete(product.id, product.name)}
                          title="Delete Product"
                          className="p-1.5 rounded-lg text-zinc-400 hover:text-red-600 hover:bg-white dark:hover:bg-zinc-700 shadow-xs transition-all border border-transparent hover:border-zinc-200 dark:hover:border-zinc-600"
                        >
                          <Trash2 size={14} />
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
                className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl p-4 space-y-4"
              >
                <div className="flex items-center gap-4">
                  <div className="relative w-16 h-16 rounded-lg overflow-hidden bg-zinc-100 dark:bg-zinc-800 flex-shrink-0 border border-zinc-200 dark:border-zinc-700">
                    <Image
                      src={product.image_url}
                      alt={product.name}
                      fill
                      className="object-cover"
                      sizes="64px"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="font-bold text-zinc-900 dark:text-zinc-50 truncate">{product.name}</h4>
                    <p className="text-xs text-zinc-500">{product.categories?.name || "Uncategorized"}</p>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-sm font-black text-zinc-900 dark:text-zinc-50">
                        ${product.price.toFixed(2)}
                      </span>
                      <span className={`inline-flex items-center px-1.5 py-0.5 rounded-full text-[8px] font-black uppercase tracking-tighter ${
                        product.is_published 
                          ? 'bg-green-100 text-green-700 dark:bg-green-900/20 dark:text-green-400' 
                          : 'bg-zinc-100 text-zinc-600 dark:bg-zinc-800 dark:text-zinc-400'
                      }`}>
                        {product.is_published ? 'Live' : 'Draft'}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-2 border-t border-zinc-100 dark:border-zinc-800">
                  <div className="flex flex-col">
                    <span className="text-[10px] uppercase font-bold text-zinc-400">Stock</span>
                    <span className={`text-sm font-bold ${product.stock <= 5 ? 'text-red-500' : 'text-zinc-900 dark:text-zinc-50'}`}>
                      {product.stock} Units
                    </span>
                  </div>
                  <div className="flex gap-2">
                    <Link 
                      href={`/admin/products/${product.id}`}
                      className="p-2 rounded-lg bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400"
                    >
                      <Eye size={18} />
                    </Link>
                    <Link
                      href={`/admin/products/${product.id}`}
                      className="p-2 rounded-lg bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400"
                    >
                      <Pencil size={18} />
                    </Link>
                    <button 
                      onClick={() => handleDelete(product.id, product.name)}
                      className="p-2 rounded-lg bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400"
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
