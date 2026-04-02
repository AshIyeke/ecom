"use client";

import { useFormStatus } from "react-dom";

export default function CheckoutSubmitButton() {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      disabled={pending}
      className={`w-full mt-8 bg-zinc-900 text-white dark:bg-zinc-50 dark:text-zinc-900 py-4 rounded-full text-xs font-bold uppercase tracking-widest hover:opacity-90 transition-opacity shadow-lg ${
        pending ? "opacity-50 cursor-not-allowed" : ""
      }`}
    >
      {pending ? "Processing..." : "Checkout Now"}
    </button>
  );
}
