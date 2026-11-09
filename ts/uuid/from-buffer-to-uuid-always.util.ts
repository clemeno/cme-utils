import { TO_STRING } from '../convert/to-string.util.js'

/**
 * Converts a Buffer to a UUID string, defaults to the string '00000000-0000-0000-0000-000000000000' (= the NIL UUID)
 * @param b - The Buffer (anything with `toString('hex')`), shorter content is left-padded with zeros
 * @returns The UUID string, the NIL UUID when `b` has no hex form
 * @example
 * ```typescript
 * FROM_BUFFER_TO_UUID_ALWAYS(Buffer.from('0123456789abcdef0123456789abcdef', 'hex')) // returns '01234567-89ab-cdef-0123-456789abcdef'
 * FROM_BUFFER_TO_UUID_ALWAYS(Buffer.from('ff', 'hex')) // returns '00000000-0000-0000-0000-0000000000ff'
 * FROM_BUFFER_TO_UUID_ALWAYS(null) // returns '00000000-0000-0000-0000-000000000000'
 * ```
 */
export function FROM_BUFFER_TO_UUID_ALWAYS (b: any): string {
  let hex = ''
  try { hex = TO_STRING(b?.toString('hex')).padStart(32, '0') } catch { }

  return [hex.slice(0, 8), hex.slice(8, 12), hex.slice(12, 16), hex.slice(16, 20), hex.slice(20)].join('-')
}
