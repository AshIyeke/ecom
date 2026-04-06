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
    // If profile doesn't exist, we might want to return a default or null
    if (error.code === "PGRST116") return null;
    throw new Error(`Failed to fetch profile: ${error.message}`);
  }

  return data;
}

export async function updateProfile(profileData: {
  full_name?: string;
  shipping_address?: string;
  billing_address?: string;
  phone?: string;
  city?: string;
}) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) throw new Error("Not authenticated");

  const { data, error } = await supabase
    .from("profiles")
    .update(profileData)
    .eq("id", user.id)
    .select()
    .single();

  if (error) {
    console.error("[updateProfile] Error:", error.message);
    throw new Error(`Failed to update profile: ${error.message}`);
  }

  return data;
}
