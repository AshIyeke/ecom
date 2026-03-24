"use client";

import { useAuth } from "@/store/AuthContext";
import Link from "next/link";
import { useState, use } from "react";

export default function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string; message?: string }>;
}) {
  const { signIn } = useAuth();
  const [error, setError] = useState<string | null>(null);
  const resolvedParams = use(searchParams);
  const urlError = resolvedParams.error;
  const message = resolvedParams.message;

  const handleSubmit = async (formData: FormData) => {
    setError(null);
    const result = await signIn(formData);
    if (result.error) {
      setError(result.error);
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 py-12">
      <div className="max-w-md w-full space-y-8 bg-white dark:bg-zinc-900 p-8 rounded-2xl border border-zinc-200 dark:border-zinc-800 shadow-sm">
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">
            Welcome back
          </h1>
          <p className="text-zinc-500 dark:text-zinc-400">
            Sign in to your account to continue
          </p>
        </div>

        {/* Display Message */}
        {message && (
          <div className="bg-blue-50 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-900/50 p-3 rounded-lg flex items-center gap-2 text-sm text-blue-600 dark:text-blue-400">
            {message}
          </div>
        )}

        {/* Display Error Message */}
        {(error || urlError) && (
          <div className="bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-900/50 p-3 rounded-lg flex items-center gap-2 text-sm text-red-600 dark:text-red-400">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
            {error || urlError}
          </div>
        )}

        <form action={handleSubmit} className="space-y-6">
          <div className="space-y-4">
            <div className="space-y-2">
              <label 
                htmlFor="email" 
                className="text-sm font-medium text-zinc-700 dark:text-zinc-300"
              >
                Email Address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                className="w-full px-4 py-2 bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-lg focus:ring-2 focus:ring-zinc-900 dark:focus:ring-zinc-50 outline-none transition-all text-zinc-900 dark:text-zinc-50"
                placeholder="you@example.com"
              />
            </div>

            <div className="space-y-2">
              <label 
                htmlFor="password" 
                className="text-sm font-medium text-zinc-700 dark:text-zinc-300"
              >
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                required
                className="w-full px-4 py-2 bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-lg focus:ring-2 focus:ring-zinc-900 dark:focus:ring-zinc-50 outline-none transition-all text-zinc-900 dark:text-zinc-50"
                placeholder="••••••••"
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-2.5 bg-zinc-900 dark:bg-zinc-50 text-zinc-50 dark:text-zinc-900 font-semibold rounded-lg hover:opacity-90 transition-opacity active:scale-[0.98]"
          >
            Sign In
          </button>
        </form>

        <div className="pt-6 text-center text-sm">
          <p className="text-zinc-500 dark:text-zinc-400">
            Don't have an account?{" "}
            <Link href="/signup" className="font-semibold text-zinc-900 dark:text-zinc-50 hover:underline">
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
