/**
 * From hex string to UUID v4
 */
export const UUID_HEX_TO_V4 = (hex: string): string => {
  const cleanHex = hex.replace(/^0x/, '').toLowerCase().padStart(32, '0')
  // Set version to 4 (13th char = '4')
  const versionedHex = cleanHex.substring(0, 12) + '4' + cleanHex.substring(13)
  // Set variant to RFC 4122 (17th char = '8' to 'b')
  const variantHex = versionedHex.substring(0, 16) + '8' + versionedHex.substring(17)
  return variantHex.replace(/^([0-9a-f]{8})([0-9a-f]{4})([0-9a-f]{4})([0-9a-f]{4})([0-9a-f]{12})/, '$1-$2-$3-$4-$5')
}
