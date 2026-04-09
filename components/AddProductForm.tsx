"use client";

import { useState, useEffect } from "react";
import { useAddProductMutation } from "@/store/api/productApi";
import { getCategories } from "@/app/shop/actions";
import { Upload, Loader2, Plus, AlertCircle, CheckCircle2, Globe, Lock } from "lucide-react";
import { Category } from "@/types/product";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

export default function AddProductForm() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [preview, setPreview] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [isPublished, setIsPublished] = useState(true);

  const [addProduct, { isLoading: isPending, error: mutationError }] = useAddProductMutation();

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
      await addProduct({
        name,
        description,
        price,
        stock,
        category_id,
        image,
        is_published: isPublished,
      }).unwrap();
      
      setSuccess(true);
      setPreview(null);
      setIsPublished(true);
      (e.target as HTMLFormElement).reset();
      
      setTimeout(() => setSuccess(false), 3000);
    } catch (err: any) {
      console.error("Error adding product:", err);
    }
  }

  const error = mutationError ? (mutationError as any).data || "Something went wrong" : null;

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      {error && (
        <div className="flex items-start gap-3 p-4 text-sm bg-destructive/5 text-destructive rounded-2xl border border-destructive/10 animate-in fade-in slide-in-from-top-2">
          <AlertCircle size={18} className="mt-0.5 shrink-0" />
          <span className="font-medium leading-relaxed">{error}</span>
        </div>
      )}

      {success && (
        <div className="flex items-center gap-3 p-4 text-sm bg-green-500/5 text-green-600 dark:text-green-400 rounded-2xl border border-green-500/10 animate-in fade-in slide-in-from-top-2">
          <CheckCircle2 size={18} className="shrink-0" />
          <span className="font-medium">Product successfully added to catalog.</span>
        </div>
      )}

      <div className="space-y-8">
        {/* Section: Media */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <label className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-400">Visuals</label>
            {preview && (
              <button 
                type="button" 
                onClick={() => setPreview(null)}
                className="text-[10px] font-bold text-destructive uppercase tracking-widest hover:underline"
              >
                Remove
              </button>
            )}
          </div>
          <div className="relative group">
            <div className={`aspect-square sm:aspect-video w-full rounded-[2rem] border-2 border-dashed transition-all duration-500 flex flex-col items-center justify-center overflow-hidden ${
              preview 
                ? "border-primary/20 bg-muted/30" 
                : "border-zinc-200 dark:border-zinc-800 bg-background/50 hover:border-primary/40 hover:bg-primary/5"
            }`}>
              {preview ? (
                <img src={preview} alt="Preview" className="w-full h-full object-cover animate-in fade-in zoom-in-95 duration-500" />
              ) : (
                <div className="flex flex-col items-center p-8 text-center">
                  <div className="w-16 h-16 rounded-3xl bg-primary/5 flex items-center justify-center text-primary mb-4 group-hover:scale-110 transition-transform duration-500">
                    <Upload size={24} />
                  </div>
                  <span className="text-sm text-foreground font-bold mb-1">Click to upload product image</span>
                  <p className="text-xs text-muted-foreground font-medium">High resolution PNG or JPG preferred</p>
                </div>
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

        {/* Section: Basic Info */}
        <div className="space-y-6">
          <label className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-400">Basic Information</label>
          <div className="grid grid-cols-1 gap-6">
            <div className="space-y-2.5">
              <label htmlFor="name" className="text-xs font-bold text-foreground ml-1">Product Name</label>
              <Input
                id="name"
                name="name"
                type="text"
                required
                placeholder="e.g. Midnight Opal Eau de Parfum"
                className="h-14 rounded-2xl px-5 bg-background/50 border-zinc-200 dark:border-zinc-800 focus:ring-primary/20 transition-all font-medium"
              />
            </div>

            <div className="space-y-2.5">
              <label htmlFor="category_id" className="text-xs font-bold text-foreground ml-1">Category</label>
              <div className="relative">
                <select
                  id="category_id"
                  name="category_id"
                  required
                  className="w-full h-14 pl-5 pr-12 rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-background/50 focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all text-sm font-medium appearance-none cursor-pointer"
                >
                  <option value="">Select Category</option>
                  {categories.map((cat) => (
                    <option key={cat.id} value={cat.id}>{cat.name}</option>
                  ))}
                </select>
                <div className="absolute right-5 top-1/2 -translate-y-1/2 pointer-events-none text-muted-foreground">
                  <Plus size={16} />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Section: Inventory & Pricing */}
        <div className="space-y-6">
          <label className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-400">Inventory & Pricing</label>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2.5">
              <label htmlFor="price" className="text-xs font-bold text-foreground ml-1">Price ($)</label>
              <Input
                id="price"
                name="price"
                type="number"
                step="0.01"
                required
                placeholder="0.00"
                className="h-14 rounded-2xl px-5 bg-background/50 border-zinc-200 dark:border-zinc-800 focus:ring-primary/20 transition-all font-bold"
              />
            </div>

            <div className="space-y-2.5">
              <label htmlFor="stock" className="text-xs font-bold text-foreground ml-1">In Stock</label>
              <Input
                id="stock"
                name="stock"
                type="number"
                required
                placeholder="0"
                className="h-14 rounded-2xl px-5 bg-background/50 border-zinc-200 dark:border-zinc-800 focus:ring-primary/20 transition-all font-bold"
              />
            </div>
          </div>
        </div>

        {/* Section: Status */}
        <div className="space-y-4">
          <label className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-400">Publishing Status</label>
          <div className="flex p-1.5 bg-muted/50 rounded-2xl border border-zinc-200 dark:border-zinc-800">
            <button
              type="button"
              onClick={() => setIsPublished(true)}
              className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all duration-300 ${
                isPublished 
                  ? "bg-white dark:bg-zinc-900 text-primary shadow-sm ring-1 ring-zinc-200 dark:ring-zinc-800" 
                  : "bg-transparent text-muted-foreground hover:text-foreground"
              }`}
            >
              <Globe size={14} className={isPublished ? "text-primary" : ""} />
              Live Store
            </button>
            <button
              type="button"
              onClick={() => setIsPublished(false)}
              className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all duration-300 ${
                !isPublished 
                  ? "bg-white dark:bg-zinc-900 text-foreground shadow-sm ring-1 ring-zinc-200 dark:ring-zinc-800" 
                  : "bg-transparent text-muted-foreground hover:text-foreground"
              }`}
            >
              <Lock size={14} />
              Draft Mode
            </button>
          </div>
        </div>

        {/* Section: Detailed Description */}
        <div className="space-y-4">
          <label htmlFor="description" className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-400">Product Narrative</label>
          <Textarea
            id="description"
            name="description"
            rows={4}
            placeholder="Describe the scent profile, top notes, and the story behind this fragrance..."
            className="min-h-[160px] rounded-[2rem] p-6 bg-background/50 border-zinc-200 dark:border-zinc-800 focus:ring-primary/20 transition-all font-medium leading-relaxed resize-none"
          />
        </div>
      </div>

      <button
        type="submit"
        disabled={isPending}
        className="group relative w-full h-16 rounded-[2rem] bg-zinc-900 dark:bg-zinc-50 text-zinc-50 dark:text-zinc-900 font-black uppercase text-[11px] tracking-[0.3em] overflow-hidden transition-all hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 disabled:hover:scale-100 shadow-xl shadow-zinc-950/20"
      >
        <div className="absolute inset-0 bg-primary/20 translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
        <div className="relative flex items-center justify-center gap-3">
          {isPending ? (
            <>
              <Loader2 className="animate-spin" size={20} />
              Processing...
            </>
          ) : (
            <>
              <Plus size={18} />
              Create Product
            </>
          )}
        </div>
      </button>
    </form>
  );
}
