export function GET_BASE_URI (): string {
  let baseURI = ''

  try {
    // @ts-ignore
    baseURI = window.document.documentElement.baseURI.replace(/\/$/, '')
  } catch { }

  return baseURI
}
