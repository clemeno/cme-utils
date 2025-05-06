const n2hh: string[] = []

for (let n = 0; n < 256; n += 1) {
  const hh = (n + 0x100).toString(16).slice(1)
  n2hh.push(hh)
}

/**
 *
 * @param uint8Array - A Uint8Array of 16 bytes (128 bits) representing a UUID
 * @description Converts a Uint8Array to a UUID string.
 * The UUID string is formatted as 8-4-4-4-12 hexadecimal digits, separated by hyphens.
 * @returns A UUID string in the format 'xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx'
 */
export const BYTE_ARRAY_TO_UUID = (uint8Array: Uint8Array) => {
  const ah = Array.from(uint8Array).map(n => n2hh[n])
  const partList = [ah.slice(0, 4), ah.slice(4, 6), ah.slice(6, 8), ah.slice(8, 10), ah.slice(10, 16)]
  return partList.map(p => p.join('')).join('-').toLowerCase()
}
