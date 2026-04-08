'use server'

import { createClient } from "@/lib/supabase/server";

export async function getProfile() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) return null;

  const { data, error } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", user.id)
    .single();

  if (error) {
    console.error("[getProfile] Error:", error.message);
    if (error.code === "PGRST116") return null;
    throw new Error(`Failed to fetch profile: ${error.message}`);
  }

  return data;
}

export async function updateProfile(profileData: any) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) throw new Error("Not authenticated");

  // Filter to only include known-safe columns to prevent "column does not exist" errors
  const safePayload: any = {};
  
  if ('full_name' in profileData) safePayload.full_name = profileData.full_name;
  if ('phone' in profileData) safePayload.phone = profileData.phone;
  if ('shipping_address' in profileData) safePayload.shipping_address = profileData.shipping_address;
  if ('billing_address' in profileData) safePayload.billing_address = profileData.billing_address;

  console.log("[updateProfile] Updating profile for user:", user.id, "with payload:", safePayload);

  const { data, error } = await supabase
    .from("profiles")
    .update(safePayload)
    .eq("id", user.id)
    .select()
    .single();

  if (error) {
    console.error("[updateProfile] DB Error:", error.message, error.code, error.details);
    throw new Error(error.message || "Database update failed");
  }

  return data;
}
