export const GET_BASE_URI = () => {
  let baseURI = ''

  try {
    // @ts-ignore
    baseURI = window.document.documentElement.baseURI.replace(/\/$/, '')
  } catch { }

  return baseURI
}
