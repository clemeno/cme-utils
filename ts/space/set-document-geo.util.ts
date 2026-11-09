/**
 * Sets the geo attribute of the document element. Does nothing outside a browser (no window).
 * @param geo - The geo, for example 'CA'
 * @returns Nothing
 * @example
 * ```typescript
 * SET_DOCUMENT_GEO('CA') // in a browser, sets <html geo="CA">
 * // outside a browser (no window), it does nothing
 * SET_DOCUMENT_GEO('CA') // returns undefined
 * ```
 */
export function SET_DOCUMENT_GEO (geo: string): void {
  try {
    // @ts-ignore
    window.document.documentElement.setAttribute('geo', geo)
  } catch {}
}
