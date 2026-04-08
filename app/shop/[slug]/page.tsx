import { getProduct } from "@/lib/supabase/queries/products";
import Image from "next/image";
import { Star, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";
import AddToCartButton from "@/components/AddToCartButton";

export default async function ProductDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  
  // Use slug as ID for fetching data
  let product;
  try {
    product = await getProduct(slug);
  } catch (error) {
    console.error("Error loading product:", error);
    return notFound();
  }

  if (!product) {
    return notFound();
  }

  return (
    <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
      <Link 
        href="/shop" 
        className="inline-flex items-center gap-2 text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-50 mb-8 transition-colors"
      >
        <ArrowLeft size={20} />
        Back to Shop
      </Link>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        {/* Image Section */}
        <div className="aspect-square relative rounded-2xl overflow-hidden bg-zinc-100 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-800 shadow-sm">
          {product.image_url ? (
            <Image
              src={product.image_url}
              alt={product.name}
              fill
              className="object-cover"
              priority
            />
          ) : (
            <div className="flex items-center justify-center h-full text-zinc-400 font-medium italic">
              No image available
            </div>
          )}
        </div>
        
        {/* Product Details Section */}
        <div className="space-y-8 flex flex-col justify-center">
          <div className="space-y-4">
            <div className="space-y-2">
              <span className="inline-block px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest bg-zinc-100 dark:bg-zinc-800 text-zinc-500 border border-zinc-200 dark:border-zinc-700">
                {product.categories?.name || "Uncategorized"}
              </span>
              <h1 className="text-4xl md:text-5xl font-bold text-zinc-900 dark:text-zinc-50 tracking-tight leading-tight">
                {product.name}
              </h1>
            </div>
            
            <div className="flex items-center gap-1.5">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  size={20}
                  className="fill-yellow-400 text-yellow-400"
                />
              ))}
              <span className="text-sm text-zinc-500 font-medium ml-2">5.0 (No reviews yet)</span>
            </div>
          </div>
          
          <div className="space-y-4">
            <p className="text-4xl font-bold text-zinc-900 dark:text-zinc-50">
              ${(product.price || 0).toFixed(2)}
            </p>
            
            <div className="prose prose-zinc dark:prose-invert max-w-none">
              <p className="text-zinc-600 dark:text-zinc-400 text-lg leading-relaxed">
                {product.description || "This premium product from Opal Scents combines quality craftsmanship with timeless design. Experience excellence in every detail."}
              </p>
            </div>
          </div>
          
          <div className="pt-8 border-t border-zinc-200 dark:border-zinc-800">
            <AddToCartButton product={{
              id: product.id,
              name: product.name,
              price: product.price,
              image: product.image_url || "",
              category: product.categories?.name || "Uncategorized",
              rating: 5
            }} />
          </div>
          
          <div className="grid grid-cols-2 gap-4 pt-4">
            <div className="p-4 rounded-xl bg-zinc-50 dark:bg-zinc-900 border border-zinc-100 dark:border-zinc-800">
              <p className="text-[10px] font-bold uppercase tracking-widest text-zinc-500 mb-1">Shipping</p>
              <p className="text-sm font-medium text-zinc-900 dark:text-zinc-50">Free Standard Delivery</p>
            </div>
            <div className="p-4 rounded-xl bg-zinc-50 dark:bg-zinc-900 border border-zinc-100 dark:border-zinc-800">
              <p className="text-[10px] font-bold uppercase tracking-widest text-zinc-500 mb-1">Returns</p>
              <p className="text-sm font-medium text-zinc-900 dark:text-zinc-50">30-Day Policy</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
