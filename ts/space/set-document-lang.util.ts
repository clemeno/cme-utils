/**
 * Sets the lang attribute of the document element. Does nothing outside a browser (no window).
 * @param lang - The lang, for example 'fr'
 * @returns Nothing
 * @example
 * ```typescript
 * SET_DOCUMENT_LANG('fr') // returns undefined
 * ```
 */
export function SET_DOCUMENT_LANG (lang: string): void {
  try {
    // @ts-ignore
    window.document.documentElement.setAttribute('lang', lang)
  } catch {}
}
