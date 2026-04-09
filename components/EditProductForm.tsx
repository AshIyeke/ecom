"use client";

import { useState, useEffect } from "react";
import { useUpdateProductMutation } from "@/store/api/productApi";
import { getCategories } from "@/app/shop/actions";
import { Upload, Loader2, Save, AlertCircle, CheckCircle2, Globe, Lock } from "lucide-react";
import { Category } from "@/types/product";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

interface EditProductFormProps {
  product: any;
  onSuccess?: () => void;
}

export default function EditProductForm({ product, onSuccess }: EditProductFormProps) {
  const [categories, setCategories] = useState<Category[]>([]);
  const [preview, setPreview] = useState<string | null>(product.image_url);
  const [success, setSuccess] = useState(false);
  const [isPublished, setIsPublished] = useState(product.is_published);

  const [updateProduct, { isLoading: isPending, error: mutationError }] = useUpdateProductMutation();

  useEffect(() => {
    getCategories()
      .then(setCategories)
      .catch((error) => console.log("Error fetching categories in EditProductForm:", error));
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
    setSuccess(false);

    const formData = new FormData(e.currentTarget);
    const name = formData.get("name") as string;
    const description = formData.get("description") as string;
    const priceStr = formData.get("price") as string;
    const price = parseFloat(priceStr);
    const stockStr = formData.get("stock") as string;
    const stock = parseInt(stockStr, 10);
    const category_id = formData.get("category_id") as string;
    const image = formData.get("image") as File;

    if (isNaN(price)) {
      alert("Please enter a valid price");
      return;
    }

    if (isNaN(stock)) {
      alert("Please enter a valid stock");
      return;
    }
    
    try {
      await updateProduct({
        id: product.id,
        productData: {
          name,
          description,
          price,
          stock,
          category_id,
          image: image.size > 0 ? image : undefined,
          is_published: isPublished,
        },
      }).unwrap();
      
      setSuccess(true);
      if (onSuccess) onSuccess();
      
      setTimeout(() => setSuccess(false), 3000);
    } catch (err: any) {
      console.error("Error updating product:", err);
    }
  }

  const error = mutationError ? (mutationError as any).data || "Something went wrong" : null;

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {error && (
        <div className="flex items-center gap-2 p-4 text-sm bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 rounded-xl border border-red-100 dark:border-red-900/30">
          <AlertCircle size={18} />
          <span>{error}</span>
        </div>
      )}

      {success && (
        <div className="flex items-center gap-2 p-4 text-sm bg-green-50 dark:bg-green-900/20 text-green-600 dark:text-green-400 rounded-xl border border-green-100 dark:border-green-900/30">
          <CheckCircle2 size={18} />
          <span>Product updated successfully!</span>
        </div>
      )}

      <div className="space-y-6">
        {/* Image Upload */}
        <div className="space-y-3">
          <label className="text-sm font-semibold text-zinc-700 dark:text-zinc-300">Product Image</label>
          <div className="relative group">
            <div className={`aspect-video w-full rounded-xl border-2 border-dashed transition-all flex flex-col items-center justify-center overflow-hidden bg-background/50 ${
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
                className="absolute inset-0 opacity-0 cursor-pointer"
              />
            </div>
            <p className="text-[10px] text-zinc-500 mt-1">Leave empty to keep current image</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <label htmlFor="name" className="text-sm font-semibold text-zinc-700 dark:text-zinc-300">Product Name</label>
            <Input
              id="name"
              name="name"
              type="text"
              required
              defaultValue={product.name}
              placeholder="Product name"
              className="h-11 rounded-xl px-4"
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="category_id" className="text-sm font-semibold text-zinc-700 dark:text-zinc-300">Category</label>
            <select
              id="category_id"
              name="category_id"
              required
              defaultValue={product.category_id}
              className="w-full h-11 px-4 rounded-xl border border-input bg-background/50 focus:ring-2 focus:ring-primary/20 focus:border-primary outline-hidden transition-all text-sm appearance-none"
            >
              <option value="">Select Category</option>
              {categories.map((cat) => (
                <option key={cat.id} value={cat.id}>{cat.name}</option>
              ))}
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <label htmlFor="price" className="text-sm font-semibold text-zinc-700 dark:text-zinc-300">Price ($)</label>
            <Input
              id="price"
              name="price"
              type="number"
              step="0.01"
              required
              defaultValue={product.price}
              placeholder="0.00"
              className="h-11 rounded-xl px-4"
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="stock" className="text-sm font-semibold text-zinc-700 dark:text-zinc-300">Stock</label>
            <Input
              id="stock"
              name="stock"
              type="number"
              required
              defaultValue={product.stock}
              placeholder="0"
              className="h-11 rounded-xl px-4"
            />
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-semibold text-zinc-700 dark:text-zinc-300">Status</label>
          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => setIsPublished(true)}
              className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl border text-xs font-bold uppercase transition-all ${
                isPublished 
                  ? "bg-zinc-900 text-white border-zinc-900 dark:bg-zinc-50 dark:text-zinc-900 dark:border-zinc-50" 
                  : "bg-background/50 text-zinc-500 border-zinc-200 dark:border-zinc-800"
              }`}
            >
              <Globe size={14} />
              Live
            </button>
            <button
              type="button"
              onClick={() => setIsPublished(false)}
              className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl border text-xs font-bold uppercase transition-all ${
                !isPublished 
                  ? "bg-zinc-900 text-white border-zinc-900 dark:bg-zinc-50 dark:text-zinc-900 dark:border-zinc-50" 
                  : "bg-background/50 text-zinc-500 border-zinc-200 dark:border-zinc-800"
              }`}
            >
              <Lock size={14} />
              Draft
            </button>
          </div>
        </div>

        <div className="space-y-2">
          <label htmlFor="description" className="text-sm font-semibold text-zinc-700 dark:text-zinc-300">Description</label>
          <Textarea
            id="description"
            name="description"
            rows={3}
            defaultValue={product.description}
            placeholder="Product description..."
            className="min-h-[120px] resize-none"
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
            Saving Changes...
          </>
        ) : (
          <>
            <Save size={20} />
            Update Product
          </>
        )}
      </button>
    </form>
  );
}
