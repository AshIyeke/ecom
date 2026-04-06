"use client";

import { useGetProductQuery, useDeleteProductMutation } from "@/store/api/productApi";
import { useParams, useRouter } from "next/navigation";
import { Loader2, ArrowLeft, Pencil, Trash2, Globe, Lock, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { useState } from "react";
import EditProductForm from "@/components/EditProductForm";

export default function AdminProductDetailsPage() {
  const { id } = useParams();
  const router = useRouter();
  const [isEditing, setIsEditing] = useState(false);
  const { data: product, isLoading, error } = useGetProductQuery(id as string);
  const [deleteProduct, { isLoading: isDeleting }] = useDeleteProductMutation();

  const handleDelete = async () => {
    if (window.confirm("Are you sure you want to delete this product? This action cannot be undone.")) {
      try {
        await deleteProduct(id as string).unwrap();
        router.push("/admin/products");
      } catch (err) {
        console.error("Failed to delete product:", err);
        alert("Failed to delete product. Please try again.");
      }
    }
  };

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4">
        <Loader2 className="animate-spin text-zinc-400" size={40} />
        <p className="text-zinc-500 font-medium animate-pulse">Loading product details...</p>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="text-center py-20">
        <h3 className="text-xl font-bold text-zinc-900 dark:text-zinc-50 mb-2">Product Not Found</h3>
        <p className="text-zinc-500 mb-6">The product you're looking for doesn't exist or was removed.</p>
        <button 
          onClick={() => router.back()}
          className="inline-flex items-center gap-2 text-blue-600 hover:underline font-medium"
        >
          <ArrowLeft size={18} />
          Go Back
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto space-y-8 pb-20">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div className="space-y-1">
          <Link 
            href="/admin/products"
            className="inline-flex items-center gap-2 text-sm text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-50 transition-colors mb-2"
          >
            <ArrowLeft size={16} />
            Back to Products
          </Link>
          <h1 className="text-3xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">{product.name}</h1>
          <div className="flex items-center gap-3">
            <span className="text-sm font-medium text-zinc-500">{product.categories?.name}</span>
            <span className="w-1 h-1 rounded-full bg-zinc-300" />
            <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold uppercase ${
              product.is_published 
                ? 'bg-green-100 text-green-700 dark:bg-green-900/20 dark:text-green-400' 
                : 'bg-zinc-100 text-zinc-600 dark:bg-zinc-800 dark:text-zinc-400'
            }`}>
              {product.is_published ? <Globe size={10} /> : <Lock size={10} />}
              {product.is_published ? 'Live on Store' : 'Draft Mode'}
            </span>
          </div>
        </div>

        <div className="flex gap-3 w-full md:w-auto">
          <button 
            onClick={() => setIsEditing(!isEditing)}
            className={`flex-1 md:flex-none inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl border font-semibold text-sm transition-all ${
              isEditing 
                ? "bg-zinc-100 dark:bg-zinc-800 border-zinc-200 dark:border-zinc-700 text-zinc-900 dark:text-zinc-50" 
                : "border-zinc-200 dark:border-zinc-800 hover:bg-zinc-50 dark:hover:bg-zinc-800"
            }`}
          >
            {isEditing ? <X size={18} /> : <Pencil size={18} />}
            {isEditing ? "Cancel Editing" : "Edit Product"}
          </button>
          <button 
            onClick={handleDelete}
            disabled={isDeleting}
            className="flex-1 md:flex-none inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-red-50 dark:bg-red-900/10 text-red-600 dark:text-red-400 font-semibold text-sm hover:bg-red-100 dark:hover:bg-red-900/20 transition-all disabled:opacity-50"
          >
            {isDeleting ? <Loader2 className="animate-spin" size={18} /> : <Trash2 size={18} />}
            Delete
          </button>
        </div>
      </div>

      {isEditing ? (
        <div className="max-w-2xl mx-auto">
          <Card className="border-zinc-200 dark:border-zinc-800 shadow-xl overflow-hidden">
            <CardHeader className="bg-zinc-50 dark:bg-zinc-900/50 border-b border-zinc-100 dark:border-zinc-800">
              <CardTitle className="text-xl font-bold">Edit Product Information</CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <EditProductForm product={product} onSuccess={() => setIsEditing(false)} />
            </CardContent>
          </Card>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Image & Quick Stats */}
          <div className="lg:col-span-1 space-y-6">
            <Card className="overflow-hidden border-zinc-200 dark:border-zinc-800 shadow-sm">
              <div className="aspect-square relative bg-zinc-100 dark:bg-zinc-800">
                <Image
                  src={product.image_url}
                  alt={product.name}
                  fill
                  className="object-cover"
                />
              </div>
            </Card>

            <Card className="border-zinc-200 dark:border-zinc-800 shadow-sm">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-bold uppercase tracking-wider text-zinc-500">Quick Stats</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between items-center text-sm">
                  <span className="text-zinc-500">Price</span>
                  <span className="font-bold text-zinc-900 dark:text-zinc-50">${(product.price || 0).toFixed(2)}</span>
                </div>
                <Separator className="bg-zinc-100 dark:bg-zinc-800" />
                <div className="flex justify-between items-center text-sm">
                  <span className="text-zinc-500">Stock</span>
                  <span className={`font-bold ${product.stock <= 5 ? 'text-red-500' : 'text-green-600'}`}>
                    {product.stock} Units
                  </span>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Column - Full Details */}
          <div className="lg:col-span-2 space-y-6">
            <Card className="border-zinc-200 dark:border-zinc-800 shadow-sm h-full">
              <CardHeader>
                <CardTitle>Product Overview</CardTitle>
              </CardHeader>
              <CardContent className="space-y-8">
                <div className="space-y-3">
                  <h4 className="text-sm font-bold uppercase tracking-wider text-zinc-500">Description</h4>
                  <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed bg-zinc-50 dark:bg-zinc-900/50 p-4 rounded-xl border border-zinc-100 dark:border-zinc-800">
                    {product.description || "No description provided for this product."}
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-4">
                  <div className="space-y-3">
                    <h4 className="text-sm font-bold uppercase tracking-wider text-zinc-500">Information</h4>
                    <dl className="space-y-3">
                      <div className="flex flex-col">
                        <dt className="text-[10px] uppercase font-bold text-zinc-400">ID</dt>
                        <dd className="text-xs font-mono text-zinc-600 dark:text-zinc-300 truncate">{product.id}</dd>
                      </div>
                      <div className="flex flex-col">
                        <dt className="text-[10px] uppercase font-bold text-zinc-400">Created At</dt>
                        <dd className="text-sm font-medium text-zinc-600 dark:text-zinc-300">
                          {new Date(product.created_at).toLocaleDateString(undefined, { 
                            year: 'numeric', 
                            month: 'long', 
                            day: 'numeric',
                            hour: '2-digit',
                            minute: '2-digit'
                          })}
                        </dd>
                      </div>
                    </dl>
                  </div>

                  <div className="space-y-3">
                    <h4 className="text-sm font-bold uppercase tracking-wider text-zinc-500">Metadata</h4>
                    <dl className="space-y-3">
                      <div className="flex flex-col">
                        <dt className="text-[10px] uppercase font-bold text-zinc-400">Visibility</dt>
                        <dd className="text-sm font-medium text-zinc-600 dark:text-zinc-300">
                          {product.is_published ? 'Publicly Visible' : 'Hidden / Internal'}
                        </dd>
                      </div>
                    </dl>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      )}
    </div>
  );
}
