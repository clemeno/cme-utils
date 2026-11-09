/**
 * From hex string to UUID
 * @param hex - The hex string, with or without a '0x' prefix, shorter content is left-padded with zeros
 * @returns The lowercase UUID string
 * @example
 * ```typescript
 * FROM_HEX_TO_UUID('0x0123456789ABCDEF0123456789abcdef') // returns '01234567-89ab-cdef-0123-456789abcdef'
 * FROM_HEX_TO_UUID('abc') // returns '00000000-0000-0000-0000-000000000abc'
 * FROM_HEX_TO_UUID('') // returns '00000000-0000-0000-0000-000000000000'
 * ```
 */
export function FROM_HEX_TO_UUID (hex: string): string {
  return hex
    .replace(/^0x/, '')
    .toLowerCase()
    .padStart(32, '0')
    .replace(/^([0-9a-f]{8})([0-9a-f]{4})([0-9a-f]{4})([0-9a-f]{4})([0-9a-f]{12})/, '$1-$2-$3-$4-$5')
}
