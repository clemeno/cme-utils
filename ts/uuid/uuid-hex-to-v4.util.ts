import { FROM_HEX_TO_UUID } from './from-hex-to-uuid.util.js'

/**
 * From hex string to UUID v4
 */
export const UUID_HEX_TO_V4 = (hex: string): string => FROM_HEX_TO_UUID(hex)
