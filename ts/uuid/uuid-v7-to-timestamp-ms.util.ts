import { IS_UUID_STRING } from './is-uuid-string.util.js'

/**
 * Get the timestamp in milliseconds from a UUID v7
 */
export const UUID_V7_TO_TIMESTAMP_MS = (uuidv7?: string): number => {
  let res = 0

  if (IS_UUID_STRING(uuidv7)) {
    const partList = uuidv7.split('-')
    res = Number(BigInt(`0x${partList[0]}${partList[1]}`).toString(10))
  }

  return res
}
