import { NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase/admin'
import crypto from 'crypto'

export async function POST(req: Request) {
  const body = await req.text()
  
  // 1. Verify the signature to prove the request is from Paystack
  const hash = crypto
    .createHmac('sha512', process.env.PAYSTACK_SECRET_KEY!)
    .update(body)
    .digest('hex')

  if (hash !== req.headers.get('x-paystack-signature')) {
    return new NextResponse('Unauthorized', { status: 401 })
  }

  const event = JSON.parse(body)

  // 2. Handle 'charge.success'
  if (event.event === 'charge.success') {
    // Paystack might return metadata as a string or object depending on the library version
    const metadata = typeof event.data.metadata === 'string' 
      ? JSON.parse(event.data.metadata) 
      : event.data.metadata;
    
    const orderId = metadata?.orderId;
    const reference = event.data.reference;

    console.log(`DEBUG: Paystack Webhook Received. OrderID: ${orderId}, Ref: ${reference}`);

    if (!orderId) {
      console.error('ERROR: No OrderID found in Paystack metadata');
      return new NextResponse('No Order ID', { status: 400 });
    }

    // Use service role client (supabaseAdmin) to bypass RLS and update status
    // We add .select() to verify the update actually occurred
    const { data, error } = await supabaseAdmin
      .from('orders')
      .update({ 
        status: 'paid',
        stripe_payment_intent_id: reference // Make sure this column exists in your DB!
      })
      .eq('id', orderId)
      .select();

    if (error) {
      console.error('DATABASE ERROR:', error.message);
      return new NextResponse(`Database Error: ${error.message}`, { status: 500 });
    }

    if (!data || data.length === 0) {
      console.error(`UPDATE FAILED: No order found with ID: ${orderId}`);
      return new NextResponse('Order Not Found', { status: 404 });
    }
    
    console.log(`SUCCESS: Order ${orderId} updated to 'paid'.`);
  }

  return new NextResponse('OK', { status: 200 })
}