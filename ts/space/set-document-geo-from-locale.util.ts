export const SET_DOCUMENT_GEO_FROM_LOCALE = (locale: string): void => {
  try {
    // @ts-ignore
    window.document.documentElement.setAttribute('geo', locale.split('-').slice(1).join('-'))
  } catch {}
}
