"use client";

import { useGetProductsQuery } from "@/store/api/productApi";
import ProductCard from "./ProductCard";
import { useState } from "react";
import { Search, ChevronLeft, ChevronRight } from "lucide-react";
import { Category } from "@/types/product";

interface ProductListProps {
  categories: Category[];
  initialCategory?: string;
  initialSearch?: string;
}

const ITEMS_PER_PAGE = 8;

export default function ProductList({
  categories,
  initialCategory = "",
  initialSearch = "",
}: ProductListProps) {
  const [selectedCategory, setSelectedCategory] = useState(initialCategory);
  const [searchQuery, setSearchQuery] = useState(initialSearch);
  const [currentPage, setCurrentPage] = useState(1);

  const { data, isLoading, error } = useGetProductsQuery({
    category: selectedCategory || undefined,
    search: searchQuery || undefined,
    page: currentPage,
    limit: ITEMS_PER_PAGE,
  });

  const products = data?.products || [];
  const totalCount = data?.count || 0;
  const totalPages = Math.ceil(totalCount / ITEMS_PER_PAGE);

  return (
    <div className="space-y-8">
      {/* Search and Filter UI */}
      <div className="flex flex-col lg:flex-row gap-6 justify-between items-start lg:items-center bg-white dark:bg-zinc-900 p-6 rounded-2xl border border-zinc-200 dark:border-zinc-800 shadow-sm">
        {/* Category Tabs */}
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => {
              setSelectedCategory("");
              setCurrentPage(1);
            }}
            className={`px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-widest transition-all cursor-pointer ${
              selectedCategory === ""
                ? "bg-zinc-900 text-white dark:bg-zinc-50 dark:text-zinc-900 shadow-md"
                : "bg-zinc-100 text-zinc-500 hover:bg-zinc-200 dark:bg-zinc-800 dark:text-zinc-400 dark:hover:bg-zinc-700"
            }`}
            >
            All Collections
            </button>
            {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => {
                setSelectedCategory(category.id);
                setCurrentPage(1);
              }}
              className={`px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-widest transition-all cursor-pointer ${
                selectedCategory === category.id
                  ? "bg-zinc-900 text-white dark:bg-zinc-50 dark:text-zinc-900 shadow-md"
                  : "bg-zinc-100 text-zinc-500 hover:bg-zinc-200 dark:bg-zinc-800 dark:text-zinc-400 dark:hover:bg-zinc-700"
              }`}
            >
              {category.name}
            </button>
          ))}
        </div>

        {/* Search Input */}
        <div className="relative w-full lg:w-72">
          <Search
            className="absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-400"
            size={16}
          />
          <input
            type="text"
            placeholder="Search products..."
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              setCurrentPage(1);
            }}
            className="w-full pl-10 pr-4 py-2.5 bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-zinc-900 dark:focus:ring-zinc-50 transition-all text-zinc-900 dark:text-zinc-50"
          />
        </div>
      </div>

      {/* Product Grid */}
      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {[...Array(8)].map((_, i) => (
            <div
              key={i}
              className="h-80 bg-zinc-100 dark:bg-zinc-800 animate-pulse rounded-2xl"
            />
          ))}
        </div>
      ) : error ? (
        <div className="text-center py-20 bg-zinc-50 dark:bg-zinc-900/50 rounded-2xl border border-dashed border-zinc-200 dark:border-zinc-800">
          <p className="text-red-500 font-medium">
            Failed to load products. Please try again later.
          </p>
        </div>
      ) : products.length === 0 ? (
        <div className="text-center py-20 bg-zinc-50 dark:bg-zinc-900/50 rounded-2xl border border-dashed border-zinc-200 dark:border-zinc-800">
          <p className="text-zinc-500 dark:text-zinc-400 font-medium italic">
            No products found matching your criteria.
          </p>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {products.map((product: any) => (
              <ProductCard
                key={product.id}
                product={{
                  id: product.id,
                  name: product.name,
                  price: product.price,
                  image: product.image_url,
                  category: product.categories?.name || "Uncategorized",
                  rating: 5,
                }}
              />
            ))}
          </div>

          {/* Pagination UI */}
          {totalPages > 1 && (
            <div className="flex justify-center items-center gap-2 pt-8">
              <button
                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
                className="p-2 rounded-xl border border-zinc-200 dark:border-zinc-800 disabled:opacity-30 disabled:cursor-not-allowed hover:bg-zinc-50 dark:hover:bg-zinc-800 transition-colors"
              >
                <ChevronLeft size={20} />
              </button>

              <div className="flex gap-1">
                {[...Array(totalPages)].map((_, i) => (
                  <button
                    key={i + 1}
                    onClick={() => setCurrentPage(i + 1)}
                    className={`w-10 h-10 rounded-xl text-sm font-bold transition-all ${
                      currentPage === i + 1
                        ? "bg-zinc-900 text-white dark:bg-zinc-50 dark:text-zinc-900"
                        : "hover:bg-zinc-100 dark:hover:bg-zinc-800"
                    }`}
                  >
                    {i + 1}
                  </button>
                ))}
              </div>

              <button
                onClick={() =>
                  setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                }
                disabled={currentPage === totalPages}
                className="p-2 rounded-xl border border-zinc-200 dark:border-zinc-800 disabled:opacity-30 disabled:cursor-not-allowed hover:bg-zinc-50 dark:hover:bg-zinc-800 transition-colors"
              >
                <ChevronRight size={20} />
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
}
