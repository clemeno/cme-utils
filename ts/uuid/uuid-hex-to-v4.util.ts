import { FROM_HEX_TO_UUID } from './from-hex-to-uuid.util.js'

/**
 * From hex string to UUID v4
 * @param hex - The hex string, formatted as `FROM_HEX_TO_UUID` does: with or without a '0x' prefix, left-padded with zeros, cut to 32 digits
 * @returns The UUID string with the version nibble set to 4 and the variant nibble set to 8
 * @example
 * ```typescript
 * UUID_HEX_TO_V4('0123456789abcdef0123456789abcdef') // returns '01234567-89ab-4def-8123-456789abcdef'
 * UUID_HEX_TO_V4('0xFF') // returns '00000000-0000-4000-8000-0000000000ff'
 * ```
 */
export function UUID_HEX_TO_V4 (hex: string): string {
  const uuid = FROM_HEX_TO_UUID(hex)
  // version 4 is the 13th digit, the RFC 4122 variant ('8' to 'b') the 17th
  return `${uuid.slice(0, 14)}4${uuid.slice(15, 19)}8${uuid.slice(20)}`
}
