"use client";

import { useState, useEffect } from "react";
import { addProduct, getCategories } from "@/app/shop/actions";
import { Upload, Loader2, Plus, AlertCircle } from "lucide-react";
import { Category } from "@/types/product";

export default function AddProductForm() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [preview, setPreview] = useState<string | null>(null);

  useEffect(() => {
    getCategories()
      .then(setCategories)
      .catch((error) => console.log("Error fetching categories in AddProductForm:", error));
  }, []);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setPreview(url);
    }
  };

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setIsPending(true);
    setError(null);

    const formData = new FormData(e.currentTarget);
    
    try {
      await addProduct(formData);
    } catch (err: any) {
      console.log("Error adding product in AddProductForm:", err);
      setError(err.message || "Something went wrong. Please try again.");
      setIsPending(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-2xl mx-auto space-y-8 bg-white dark:bg-zinc-900 p-8 rounded-2xl border border-zinc-200 dark:border-zinc-800 shadow-xl">
      <div className="space-y-2">
        <h2 className="text-2xl font-bold text-zinc-900 dark:text-zinc-50 tracking-tight">Add New Product</h2>
        <p className="text-zinc-500 dark:text-zinc-400">Fill in the details to list a new item in your store.</p>
      </div>

      {error && (
        <div className="flex items-center gap-2 p-4 text-sm bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 rounded-xl border border-red-100 dark:border-red-900/30">
          <AlertCircle size={18} />
          <span>{error}</span>
        </div>
      )}

      <div className="space-y-6">
        {/* Image Upload */}
        <div className="space-y-3">
          <label className="text-sm font-semibold text-zinc-700 dark:text-zinc-300">Product Image</label>
          <div className="relative group">
            <div className={`aspect-video w-full rounded-xl border-2 border-dashed transition-all flex flex-col items-center justify-center overflow-hidden bg-zinc-50 dark:bg-zinc-800/50 ${
              preview ? "border-zinc-300 dark:border-zinc-700" : "border-zinc-200 dark:border-zinc-800 hover:border-zinc-300 dark:hover:border-zinc-700"
            }`}>
              {preview ? (
                <img src={preview} alt="Preview" className="w-full h-full object-cover" />
              ) : (
                <>
                  <Upload className="w-8 h-8 text-zinc-400 mb-2" />
                  <span className="text-sm text-zinc-500 font-medium">Click to upload image</span>
                </>
              )}
              <input
                type="file"
                name="image"
                accept="image/*"
                onChange={handleImageChange}
                required
                className="absolute inset-0 opacity-0 cursor-pointer"
              />
            </div>
          </div>
        </div>

        {/* Basic Info */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label htmlFor="name" className="text-sm font-semibold text-zinc-700 dark:text-zinc-300">Product Name</label>
            <input
              id="name"
              name="name"
              type="text"
              placeholder="e.g. Wireless Headphones"
              required
              className="w-full px-4 py-2.5 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 focus:ring-2 focus:ring-blue-500 outline-hidden transition-all text-zinc-900 dark:text-zinc-50"
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="category_id" className="text-sm font-semibold text-zinc-700 dark:text-zinc-300">Category</label>
            <select
              id="category_id"
              name="category_id"
              required
              className="w-full px-4 py-2.5 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 focus:ring-2 focus:ring-blue-500 outline-hidden transition-all text-zinc-900 dark:text-zinc-50 appearance-none"
            >
              <option value="">Select a category</option>
              {categories.map((category) => (
                <option key={category.id} value={category.id}>{category.name}</option>
              ))}
            </select>
          </div>
        </div>

        <div className="space-y-2">
          <label htmlFor="price" className="text-sm font-semibold text-zinc-700 dark:text-zinc-300">Price (USD)</label>
          <div className="relative">
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400 font-medium">$</span>
            <input
              id="price"
              name="price"
              type="number"
              step="0.01"
              placeholder="0.00"
              required
              className="w-full pl-8 pr-4 py-2.5 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 focus:ring-2 focus:ring-blue-500 outline-hidden transition-all text-zinc-900 dark:text-zinc-50"
            />
          </div>
        </div>

        <div className="space-y-2">
          <label htmlFor="description" className="text-sm font-semibold text-zinc-700 dark:text-zinc-300">Description</label>
          <textarea
            id="description"
            name="description"
            rows={4}
            placeholder="Tell us about the product..."
            className="w-full px-4 py-2.5 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 focus:ring-2 focus:ring-blue-500 outline-hidden transition-all text-zinc-900 dark:text-zinc-50 resize-none"
          />
        </div>
      </div>

      <button
        type="submit"
        disabled={isPending}
        className="w-full flex items-center justify-center gap-2 py-3 px-6 rounded-xl bg-zinc-900 dark:bg-zinc-50 text-zinc-50 dark:text-zinc-900 font-bold hover:bg-zinc-700 dark:hover:bg-zinc-200 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-lg"
      >
        {isPending ? (
          <>
            <Loader2 className="animate-spin" size={20} />
            Creating Product...
          </>
        ) : (
          <>
            <Plus size={20} />
            Add Product
          </>
        )}
      </button>
    </form>
  );
}
