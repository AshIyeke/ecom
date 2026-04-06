'use server'

import { createClient } from "@/lib/supabase/server";

export async function getCategories() {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("categories")
    .select("*")
    .order("name", { ascending: true });

  if (error) {
    console.log("Error in getCategories query:", error);
    throw new Error(`Failed to fetch categories: ${error.message}`);
  }
  return data || [];
}
