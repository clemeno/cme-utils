/**
 * set the global timezone to `Luxon` `Settings`
 * @param tz - The IANA timezone written on the `tz` attribute of the document element; nothing happens outside a browser
 * @returns Nothing
 * @example
 * ```typescript
 * SET_DOCUMENT_TZ('Europe/Paris') // returns undefined
 * // outside a browser there is no document: still no error
 * SET_DOCUMENT_TZ('') // returns undefined
 * ```
 */
export function SET_DOCUMENT_TZ (tz: string): void {
  try {
    // @ts-ignore
    window.document.documentElement.setAttribute('tz', tz)
  } catch {}
}
