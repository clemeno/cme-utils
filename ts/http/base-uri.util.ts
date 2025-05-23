export const GET_BASE_URI = () => {
  const baseURI = ''

  try {
    // @ts-ignore
    baseURI = window.document.head.baseURI.replace(/\/$/, '')
  } catch { }

  return baseURI
}
