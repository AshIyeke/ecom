import Link from "next/link";
import { initiatePayment } from "@/app/checkout/action";
import { createClient } from "@/lib/supabase/server";
import CheckoutSubmitButton from "./CheckoutSubmitButton";

export default async function CheckoutButton() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    return (
      <Link
        href="/login"
        className="w-full mt-8 bg-zinc-900 text-white dark:bg-zinc-50 dark:text-zinc-900 py-4 rounded-full text-xs font-bold uppercase tracking-widest hover:opacity-90 transition-opacity shadow-lg inline-block text-center"
      >
        Login to Checkout
      </Link>
    );
  }

  // Fetch cart data on server to ensure it's accurate and secure
  const { data: cart } = await supabase
    .from('carts')
    .select(`
      id,
      cart_items (
        id,
        quantity,
        product_id,
        products (*)
      )
    `)
    .eq('user_id', user.id)
    .single();

  if (!cart || !cart.cart_items || cart.cart_items.length === 0) {
    return null;
  }

  const subtotal = cart.cart_items.reduce(
    (acc: number, item: any) => acc + item.products.price * item.quantity,
    0
  );
  const shipping = 10.0;
  const total = subtotal + shipping;

  const handleCheckout = initiatePayment.bind(null, cart.cart_items, total);

  return (
    <form action={handleCheckout}>
      <CheckoutSubmitButton />
    </form>
  );
}
