'use server'

import { createClient } from "@/lib/supabase/server";
import { supabaseAdmin } from "@/lib/supabase/admin";

export async function getProducts({
  category,
  search,
  isPublished = true,
  page = 1,
  limit = 8,
  isAdmin = false,
  stockStatus,
}: {
  category?: string;
  search?: string;
  isPublished?: boolean | null;
  page?: number;
  limit?: number;
  isAdmin?: boolean;
  stockStatus?: "all" | "low" | "out";
} = {}) {
  const startTime = Date.now();
  try {
    // Use supabaseAdmin for speed in admin dashboard
    const supabase = isAdmin ? supabaseAdmin : await createClient();

    const from = (page - 1) * limit;
    const to = from + limit - 1;

    let query = supabase
      .from("products")
      .select("*, categories(name)", { count: "exact" });

    if (isPublished !== null && !isAdmin) {
      query = query.eq("is_published", isPublished);
    } else if (isPublished !== undefined && isPublished !== null) {
      query = query.eq("is_published", isPublished);
    }

    if (category) query = query.eq("category_id", category);
    if (search) query = query.ilike("name", `%${search}%`);

    // Stock Filters
    if (stockStatus === "out") {
      query = query.eq("stock", 0);
    } else if (stockStatus === "low") {
      query = query.gt("stock", 0).lte("stock", 5);
    }

    const { data: products, error, count } = await query
      .order("created_at", { ascending: false })
      .range(from, to);

    if (error) throw error;

    console.log(`[getProducts] Fetched ${products?.length} products in ${Date.now() - startTime}ms (isAdmin: ${isAdmin})`);
    
    return { products: products || [], count: count || 0 };
  } catch (error: any) {
    console.error("[getProducts] Error:", error.message);
    throw new Error(`Failed to load products: ${error.message}`);
  }
}

export async function getProduct(id: string) {
  try {
    const supabase = await createClient();
    const { data: product, error } = await supabase
      .from("products")
      .select("*, categories(name)")
      .eq("id", id)
      .single();

    if (error) throw error;
    return product;
  } catch (error: any) {
    console.error(`[getProduct] Error for ${id}:`, error.message);
    throw new Error(`Failed to fetch product: ${error.message}`);
  }
}

export async function uploadProductImage(file: File) {
  try {
    const fileExt = file.name.split(".").pop();
    const fileName = `${Math.random()}.${fileExt}`;
    const filePath = `products/${fileName}`;

    const { data, error: uploadError } = await supabaseAdmin.storage
      .from("product-images")
      .upload(filePath, file);

    if (uploadError) throw uploadError;

    const { data: { publicUrl } } = supabaseAdmin.storage
      .from("product-images")
      .getPublicUrl(filePath);

    return publicUrl;
  } catch (error: any) {
    console.error("[uploadProductImage] Error:", error.message);
    throw new Error(`Failed to upload image: ${error.message}`);
  }
}

export async function createProduct(productData: {
  name: string;
  description?: string;
  price: number;
  category_id: string;
  image_url: string;
  is_published?: boolean;
  stock: number;
}) {
  try {
    const { data, error } = await supabaseAdmin
      .from("products")
      .insert([
        {
          ...productData,
          is_published: productData.is_published ?? true,
        },
      ])
      .select()
      .single();

    if (error) throw error;
    return data;
  } catch (error: any) {
    console.error("[createProduct] Error:", error.message);
    throw new Error(`Failed to create product: ${error.message}`);
  }
}

export async function updateProduct(id: string, productData: {
  name?: string;
  description?: string;
  price?: number;
  category_id?: string;
  image_url?: string;
  is_published?: boolean;
  stock?: number;
}) {
  try {
    const { data, error } = await supabaseAdmin
      .from("products")
      .update(productData)
      .eq("id", id)
      .select()
      .single();

    if (error) throw error;
    return data;
  } catch (error: any) {
    console.error("[updateProduct] Error:", error.message);
    throw new Error(`Failed to update product: ${error.message}`);
  }
}

export async function deleteProduct(id: string) {
  try {
    const { error } = await supabaseAdmin
      .from("products")
      .delete()
      .eq("id", id);

    if (error) throw error;
    return { success: true };
  } catch (error: any) {
    console.error("[deleteProduct] Error:", error.message);
    throw new Error(`Failed to delete product: ${error.message}`);
  }
}
