export const SET_GEO = (geo: string): void => {
  try { document.documentElement.setAttribute('geo', geo) } catch {}
}
