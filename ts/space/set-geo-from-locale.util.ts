export const SET_GEO_FROM_LOCALE = (locale: string): void => {
  try { document.documentElement.setAttribute('geo', locale.split('-').slice(1).join('-')) } catch {}
}
