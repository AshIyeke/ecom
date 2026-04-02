import { User } from "@supabase/supabase-js";

export interface AuthContextType {
  user: User | null;
  role: string | null;
  loading: boolean;
  signIn: (formData: FormData) => Promise<{ error?: string }>;
  signUp: (formData: FormData) => Promise<{ error?: string }>;
  signOut: () => Promise<void>;
}
