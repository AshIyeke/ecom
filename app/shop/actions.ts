"use server";

import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { getCategories as getCategoriesFromQueries } from "@/lib/supabase/queries/categories";

export async function getCategories() {
  return await getCategoriesFromQueries();
}

export async function addProduct(formData: FormData) {
  const supabase = await createClient();

  const name = formData.get("name") as string;
  const description = formData.get("description") as string;
  const price = parseFloat(formData.get("price") as string);
  const category_id = formData.get("category_id") as string;
  const file = formData.get("image") as File;

  let image_url = "";

  if (file && file.size > 0) {
    const fileExt = file.name.split(".").pop();
    const fileName = `${Math.random()}.${fileExt}`;
    const filePath = `products/${fileName}`;

    const { data, error: uploadError } = await supabase.storage
      .from("product-images")
      .upload(filePath, file);

    if (uploadError) {
      console.log("Error uploading image in addProduct action:", uploadError);
      throw new Error("Failed to upload image");
    }

    const { data: { publicUrl } } = supabase.storage
      .from("product-images")
      .getPublicUrl(filePath);
    
    image_url = publicUrl;
  }

  const { error } = await supabase
    .from("products")
    .insert([
      {
        name,
        description,
        price,
        category_id,
        image_url,
        is_published: true,
      },
    ]);

  if (error) {
    console.log("Error inserting product in addProduct action:", error);
    throw new Error("Failed to create product");
  }

  revalidatePath("/shop");
  redirect("/shop");
}

