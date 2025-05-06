import { TO_STRING } from '../convert/to-string.util.js'

/** defaults to the string '00000000-0000-0000-0000-000000000000' (= the NIL UUID) */
export const FROM_BUFFER_TO_UUID_ALWAYS = (b: any): string => {
  let hex = ''
  try { hex = TO_STRING(b?.toString('hex')).padStart(32, '0') } catch { }

  return [hex.slice(0, 8), hex.slice(8, 12), hex.slice(12, 16), hex.slice(16, 20), hex.slice(20)].join('-')
}
