/**
 * CHECK (is a URL `string` for public API routes)
 * @param rawUrl - The URL path to check
 * @returns `true` when the path is empty, `/`, or starts with `/public_` or `/public/`; `false` otherwise
 * @example
 * ```typescript
 * IS_A_PUBLIC_URL('/') // returns true
 * IS_A_PUBLIC_URL('/public/logo.png') // returns true
 * IS_A_PUBLIC_URL('/users/1') // returns false
 * IS_A_PUBLIC_URL(undefined) // returns true
 * ```
 */
export function IS_A_PUBLIC_URL (rawUrl?: string): boolean {
  const url = `${rawUrl ?? ''}`

  // here we hardcode that root ( / ) and ( /public followed by _ or / ) paths are public
  return ['', '/', '/public_', '/public/'].includes(url.slice(0, 8))
}
