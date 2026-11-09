import { IS_UUID_STRING } from './is-uuid-string.util.js'

/**
 * Get the timestamp in milliseconds from a UUID v7
 * @param uuidv7 - The UUID v7, a lowercase hyphenated UUID string
 * @returns The timestamp in milliseconds encoded in the first 48 bits, 0 when `uuidv7` is not a UUID string
 * @example
 * ```typescript
 * UUID_V7_TO_TIMESTAMP_MS('00000000-0001-7000-8000-000000000000') // returns 1
 * UUID_V7_TO_TIMESTAMP_MS('not a uuid') // returns 0
 * UUID_V7_TO_TIMESTAMP_MS(undefined) // returns 0
 * Math.abs(UUID_V7_TO_TIMESTAMP_MS(UUID_V7()) - Date.now()) < 1000 // returns true
 * ```
 */
export function UUID_V7_TO_TIMESTAMP_MS (uuidv7?: string): number {
  let res = 0

  if (IS_UUID_STRING(uuidv7)) {
    const partList = uuidv7.split('-')
    res = Number(BigInt(`0x${partList[0]}${partList[1]}`).toString(10))
  }

  return res
}
