/**
 * From hex string to UUID
 */
export const FROM_HEX_TO_UUID = (hex: string): string => hex
  .replace(/^0x/, '')
  .toLowerCase()
  .padStart(32, '0')
  .replace(/^([0-9a-f]{8})([0-9a-f]{4})([0-9a-f]{4})([0-9a-f]{4})([0-9a-f]{12})/, '$1-$2-$3-$4-$5')
