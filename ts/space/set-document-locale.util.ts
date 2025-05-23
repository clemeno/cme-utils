export const SET_DOCUMENT_LOCALE = (locale: string): void => {
  try {
    // @ts-ignore
    window.document.documentElement.setAttribute('locale', locale)
  } catch {}
}
