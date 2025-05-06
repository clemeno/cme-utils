export const FROM_BASE_64_TO_UINT8_LIST = (base64: string): number[] => {
  let res = new Uint8Array(0)

  let bErr = false

  // * try server-side
  try { res = new Uint8Array(Buffer.from(base64, 'base64')) } catch { bErr = true }

  if (bErr) {
    // * try client-side
    try {
      const raw = atob(base64)

      const resList: number[] = []

      for (let charPos = 0; charPos < raw.length; charPos += 1) {
        resList.push(raw.charCodeAt(charPos))
      }

      res = new Uint8Array(resList)
    } catch {
      bErr = true
    }
  }

  return Array.from(res)
}
