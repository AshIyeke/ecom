import { createClient } from "@/lib/supabase/server";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get("code");
  // 'next' allows you to dynamic redirect if needed, default to home '/'
  const next = searchParams.get("next") ?? "/";

  if (code) {
    const supabase = await createClient();
    const { error } = await supabase.auth.exchangeCodeForSession(code);
    if (!error) {
      return NextResponse.redirect(`${origin}${next}`);
    }
  }

  // Return the user to an error page with instructions if something goes wrong
  return NextResponse.redirect(`${origin}/auth/auth-code-error`);
}

// import { type EmailOtpType } from "@supabase/supabase-js";
// import { redirect } from "next/navigation";
// import { createClient } from "@/lib/supabase/server";

// export async function GET(request: Request) {
//   const { searchParams } = new URL(request.url);

//   const token_hash = searchParams.get("token_hash");
//   const type = searchParams.get("type") as EmailOtpType | null;
//   const next =
//     searchParams.get("next") ?? "https://ecom-seven-pink.vercel.app/";

//   if (token_hash && type) {
//     const supabase = await createClient();
//     const { error } = await supabase.auth.verifyOtp({ type, token_hash });
//     console.log("verifyOtp error:", error);

//     if (!error) {
//       return redirect(next); // ✅ IMPORTANT: return here
//     }
//   }

//   redirect("/auth/auth-code-error");
// }
