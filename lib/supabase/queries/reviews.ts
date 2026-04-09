'use server'

import { createClient } from "@/lib/supabase/server";

export async function getReviews(productId: string) {
  try {
    const supabase = await createClient();
    const { data: reviews, error } = await supabase
      .from("reviews")
      .select("*")
      .eq("product_id", productId)
      .order("created_at", { ascending: false });

    if (error) throw error;
    if (!reviews || reviews.length === 0) return [];

    // Fetch profiles for all unique user_ids to avoid join error
    const userIds = Array.from(new Set(reviews.map(r => r.user_id)));
    const { data: profiles, error: profileError } = await supabase
      .from("profiles")
      .select("id, full_name, avatar_url")
      .in("id", userIds);

    if (profileError) {
      console.warn("[getReviews] Failed to fetch profiles:", profileError.message);
      return reviews;
    }

    // Map profiles back to reviews
    const profileMap = new Map(profiles?.map(p => [p.id, p]));
    return reviews.map(r => ({
      ...r,
      profiles: profileMap.get(r.user_id) || null
    }));
  } catch (error: any) {
    console.error(`[getReviews] Error for product ${productId}:`, error.message);
    throw new Error(`Failed to load reviews: ${error.message}`);
  }
}

export async function createReview(reviewData: {
  product_id: string;
  rating: number;
  comment: string;
}) {
  try {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();
    
    if (!user) throw new Error("Unauthorized: You must be logged in to leave a review.");

    const { data: review, error } = await supabase
      .from("reviews")
      .insert([
        {
          ...reviewData,
          user_id: user.id,
        },
      ])
      .select("*")
      .single();

    if (error) throw error;

    // Fetch profile separately
    const { data: profile } = await supabase
      .from("profiles")
      .select("full_name, avatar_url")
      .eq("id", user.id)
      .single();

    return { ...review, profiles: profile };
  } catch (error: any) {
    console.error("[createReview] Error:", error.message);
    throw new Error(`Failed to create review: ${error.message}`);
  }
}

export async function updateReview(id: string, reviewData: {
  rating: number;
  comment: string;
}) {
  try {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();
    
    if (!user) throw new Error("Unauthorized");

    const { data: review, error } = await supabase
      .from("reviews")
      .update(reviewData)
      .eq("id", id)
      .eq("user_id", user.id)
      .select("*")
      .single();

    if (error) throw error;

    // Fetch profile separately
    const { data: profile } = await supabase
      .from("profiles")
      .select("full_name, avatar_url")
      .eq("id", user.id)
      .single();

    return { ...review, profiles: profile };
  } catch (error: any) {
    console.error("[updateReview] Error:", error.message);
    throw new Error(`Failed to update review: ${error.message}`);
  }
}

export async function deleteReview(id: string) {
  try {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();
    
    if (!user) throw new Error("Unauthorized");

    const { error } = await supabase
      .from("reviews")
      .delete()
      .eq("id", id)
      .eq("user_id", user.id); // Ensure only owner can delete

    if (error) throw error;
    return { success: true };
  } catch (error: any) {
    console.error("[deleteReview] Error:", error.message);
    throw new Error(`Failed to delete review: ${error.message}`);
  }
}
