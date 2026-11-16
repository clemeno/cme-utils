/**
 * From hex string to UUID: the one hex to UUID formatter of the library
 * @param hex - The hex string, with or without a '0x' or '0X' prefix; dashes are ignored, so a UUID passes through lowercased; shorter content is left-padded with zeros, longer content keeps its first 32 digits
 * @returns The lowercase UUID string, the NIL UUID when `hex` holds a character other than a hex digit or a dash
 * @example
 * ```typescript
 * FROM_HEX_TO_UUID('0x0123456789ABCDEF0123456789abcdef') // returns '01234567-89ab-cdef-0123-456789abcdef'
 * FROM_HEX_TO_UUID('123E4567-E89B-12D3-A456-426614174000') // returns '123e4567-e89b-12d3-a456-426614174000'
 * FROM_HEX_TO_UUID('abc') // returns '00000000-0000-0000-0000-000000000abc'
 * FROM_HEX_TO_UUID('0123456789abcdef0123456789abcdef99') // returns '01234567-89ab-cdef-0123-456789abcdef'
 * FROM_HEX_TO_UUID('xyz') // returns '00000000-0000-0000-0000-000000000000'
 * FROM_HEX_TO_UUID('') // returns '00000000-0000-0000-0000-000000000000'
 * ```
 */
export function FROM_HEX_TO_UUID (hex: string): string {
  const digits = hex.toLowerCase().replace(/^0x/, '').replace(/-/g, '')

  const hex32 = (/^[0-9a-f]*$/.test(digits) ? digits : '').padStart(32, '0').slice(0, 32)

  return [hex32.slice(0, 8), hex32.slice(8, 12), hex32.slice(12, 16), hex32.slice(16, 20), hex32.slice(20)].join('-')
}
