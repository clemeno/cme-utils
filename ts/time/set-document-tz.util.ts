/** set the global timezone to `Luxon` `Settings` */
export const SET_DOCUMENT_TZ = (tz: string): void => {
  try {
    // @ts-ignore
    window.document.documentElement.setAttribute('tz', tz)
  } catch {}
}
