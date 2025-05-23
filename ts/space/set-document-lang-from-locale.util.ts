export const SET_DOCUMENT_LANG_FROM_LOCALE = (locale: string): void => {
  try {
    // @ts-ignore
    window.document.documentElement.setAttribute('lang', locale.split('-').slice(0, 1).join('-'))
  } catch {}
}
