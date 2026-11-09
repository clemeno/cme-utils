const n2hh: string[] = []

for (let n = 0; n < 256; n += 1) {
  const hh = (n + 0x100).toString(16).slice(1)
  n2hh.push(hh)
}

/**
 * Converts a Uint8Array of 16 bytes to a UUID string formatted as 8-4-4-4-12 lowercase hexadecimal digits, separated by hyphens.
 * @param uint8Array - A Uint8Array of 16 bytes (128 bits) representing a UUID
 * @returns A UUID string in the format 'xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx'
 * @example
 * ```typescript
 * BYTE_ARRAY_TO_UUID(new Uint8Array([0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 255])) // returns '00010203-0405-0607-0809-0a0b0c0d0eff'
 * BYTE_ARRAY_TO_UUID(new Uint8Array(16)) // returns '00000000-0000-0000-0000-000000000000'
 * ```
 */
export function BYTE_ARRAY_TO_UUID (uint8Array: Uint8Array): string {
  const ah = Array.from(uint8Array).map(n => n2hh[n])
  const partList = [ah.slice(0, 4), ah.slice(4, 6), ah.slice(6, 8), ah.slice(8, 10), ah.slice(10, 16)]
  return partList.map(p => p.join('')).join('-').toLowerCase()
}
