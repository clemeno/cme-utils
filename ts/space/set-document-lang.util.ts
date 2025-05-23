export const SET_DOCUMENT_LANG = (lang: string): void => {
  try {
    // @ts-ignore
    window.document.documentElement.setAttribute('lang', lang)
  } catch {}
}
