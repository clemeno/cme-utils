import { UUID_V4 } from './uuid-v4.util.js'

/**
 * Generate the 0xhex string only of a given or new UUID v4
 */
export const UUID_V4_TO_0XHEX = (uuidv4?: string): string => `0x${(uuidv4 ?? UUID_V4()).replace(/-/g, '')}`
