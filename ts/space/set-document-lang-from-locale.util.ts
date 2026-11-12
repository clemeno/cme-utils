import { SET_DOCUMENT_LANG } from './set-document-lang.util.js'

/**
 * Sets the lang attribute of the document element from a locale: the part before the first dash. Does nothing outside a browser (no window).
 * @param locale - The locale, for example 'fr-CA'
 * @returns Nothing
 * @example
 * ```typescript
 * SET_DOCUMENT_LANG_FROM_LOCALE('fr-CA') // in a browser, sets <html lang="fr">
 * SET_DOCUMENT_LANG_FROM_LOCALE('fr') // in a browser, sets <html lang="fr">
 * // outside a browser (no window), it does nothing
 * SET_DOCUMENT_LANG_FROM_LOCALE('fr-CA') // returns undefined
 * ```
 */
export function SET_DOCUMENT_LANG_FROM_LOCALE (locale: string): void {
  SET_DOCUMENT_LANG(locale.split('-').slice(0, 1).join('-'))
}
