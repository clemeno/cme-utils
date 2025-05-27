export const FROM_BASE_64_TO_UINT8_LIST = <TypeofBuffer = any> (_: {
  Buffer?: TypeofBuffer
  base64: string
}): number[] => {
  let res = new Uint8Array(0)

  let bErr = false

  // * provide Buffer
  try { res = new Uint8Array((_.Buffer as any).from(_.base64, 'base64')) } catch { bErr = true }

  if (bErr) {
    try {
      const raw = atob(_.base64)

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
