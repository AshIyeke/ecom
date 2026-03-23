import { createClient } from "@/lib/supabase/server";

export async function getProducts({
  category,
  search,
  isPublished = true,
  page = 1,
  limit = 8,
}: {
  category?: string;
  search?: string;
  isPublished?: boolean;
  page?: number;
  limit?: number;
} = {}) {
  const supabase = await createClient();

  const from = (page - 1) * limit;
  const to = from + limit - 1;

  let query = supabase
    .from("products")
    .select("*, categories(name)", { count: "exact" })
    .eq("is_published", isPublished);

  if (category) query = query.eq("category_id", category);
  if (search) query = query.ilike("name", `%${search}%`);

  const { data: products, error, count } = await query
    .order("created_at", { ascending: false })
    .range(from, to);

  if (error) {
    console.log("Error in getProducts query:", error);
    throw new Error(`Failed to load products: ${error.message}`);
  }
  return { products: products || [], count: count || 0 };
}

export async function getProductById(id: string) {
  const supabase = await createClient();
  const { data: product, error } = await supabase
    .from("products")
    .select("*, categories(name)")
    .eq("id", id)
    .single();

  if (error) {
    console.log("Error in getProductById query:", error);
    throw new Error(`Failed to fetch product: ${error.message}`);
  }
  return product;
}
