/**
 * Formats a hexadecimal string into a lowercase UUID, left-padded with zeros to 32 digits.
 * @param base16 - The hexadecimal string
 * @returns The UUID string `xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx`
 * @example
 * ```typescript
 * FROM_BASE_16_TO_UUID('0123456789ABCDEF0123456789ABCDEF') // returns '01234567-89ab-cdef-0123-456789abcdef'
 * FROM_BASE_16_TO_UUID('ff') // returns '00000000-0000-0000-0000-0000000000ff'
 * FROM_BASE_16_TO_UUID('') // returns '00000000-0000-0000-0000-000000000000'
 * ```
 */
export function FROM_BASE_16_TO_UUID (base16: string): string {
  const hex = base16.padStart(32, '0').toLowerCase()
  return [hex.slice(0, 8), hex.slice(8, 12), hex.slice(12, 16), hex.slice(16, 20), hex.slice(20)].join('-')
}
