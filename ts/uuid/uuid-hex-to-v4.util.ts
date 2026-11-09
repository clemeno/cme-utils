/**
 * From hex string to UUID v4
 * @param hex - The hex string, with or without a '0x' prefix, shorter content is left-padded with zeros
 * @returns The UUID string with the version nibble set to 4 and the variant nibble set to 8
 * @example
 * ```typescript
 * UUID_HEX_TO_V4('0123456789abcdef0123456789abcdef') // returns '01234567-89ab-4def-8123-456789abcdef'
 * UUID_HEX_TO_V4('0xFF') // returns '00000000-0000-4000-8000-0000000000ff'
 * ```
 */
export function UUID_HEX_TO_V4 (hex: string): string {
  const cleanHex = hex.replace(/^0x/, '').toLowerCase().padStart(32, '0')
  // Set version to 4 (13th char = '4')
  const versionedHex = `${cleanHex.substring(0, 12)}4${cleanHex.substring(13)}`
  // Set variant to RFC 4122 (17th char = '8' to 'b')
  const variantHex = `${versionedHex.substring(0, 16)}8${versionedHex.substring(17)}`
  return variantHex.replace(/^([0-9a-f]{8})([0-9a-f]{4})([0-9a-f]{4})([0-9a-f]{4})([0-9a-f]{12})/, '$1-$2-$3-$4-$5')
}
