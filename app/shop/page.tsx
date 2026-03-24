import ProductList from "@/components/ProductList";
import { getCategories } from "@/lib/supabase/queries/categories";
import { Suspense } from "react";

export default async function ShopPage({
  searchParams,
}: {
  searchParams: Promise<{ category?: string; search?: string }>;
}) {
  const { category, search } = await searchParams;
  const categories = await getCategories();

  return (
    <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
      <div className="mb-12">
        <h1 className="text-4xl font-serif tracking-[0.1em] text-zinc-900 dark:text-zinc-50">THE COLLECTION</h1>
        <p className="text-zinc-500 dark:text-zinc-400 mt-2 font-medium tracking-widest text-[10px] uppercase">
          Explore our signature fragrances and premium products.
        </p>
      </div>
      
      <Suspense fallback={<div className="animate-pulse h-96 bg-zinc-100 dark:bg-zinc-800 rounded-2xl" />}>
        <ProductList 
          categories={categories} 
          initialCategory={category} 
          initialSearch={search} 
        />
      </Suspense>
    </div>
  );
}
