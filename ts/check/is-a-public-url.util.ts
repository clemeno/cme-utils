/** CHECK (is a URL `string` for public API routes) */
export const IS_A_PUBLIC_URL = (rawUrl?: string): boolean => {
  const url = `${rawUrl ?? ''}`

  // here we hardcode that root ( / ) and ( /public followed by _ or / ) paths are public
  return ['', '/', '/public_', '/public/'].includes(url.slice(0, 8))
}
