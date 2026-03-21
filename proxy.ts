import { type NextRequest } from 'next/server'
import { updateSessionProxy } from '@/lib/supabase/proxy'

/**
 * Next.js 16 Proxy Function
 * Replaces the deprecated 'middleware' convention.
 */
export async function proxy(request: NextRequest) {
  return await updateSessionProxy(request)
}

// Ensure compatibility with both named and default exports
export default proxy

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
}
