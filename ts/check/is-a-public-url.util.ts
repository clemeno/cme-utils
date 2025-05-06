/** CHECK (is a URL `string` for public API routes) */
export const IS_A_PUBLIC_URL = (rawUrl?: string): boolean => {
  const url = `${rawUrl ?? ''}`

  // allow paths:
  const publicPathWhitelist: string[] = [
    // '/account_token'
  ]

  const bIsAPublicUrl = (
    // here we hardcode that root ( / ) and ( /public followed by _ or / ) paths are public
    ['', '/', '/public_', '/public/'].includes(url.slice(0, 8)) ||
    // double / can happen on loosely configured hostings, remove the "false &&" guard to enable this check
    // but the hosting should be strictly configured in the first place to form canonical urls (with single slashes)
    (false && ['//public_', '//public/'].includes(url.slice(0, 9))) ||
    publicPathWhitelist.some(path => url.split(/[#?]/)[0] === path)
  )

  // console.log({ url, bIsAPublicUrl })

  return bIsAPublicUrl
  // return true
}
