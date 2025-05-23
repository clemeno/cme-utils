export const SET_DOCUMENT_GEO = (geo: string): void => {
  try {
    // @ts-ignore
    window.document.documentElement.setAttribute('geo', geo)
  } catch {}
}
