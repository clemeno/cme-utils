import { UUID_V7 } from './uuid-v7.util.js'

/**
 * Generate the 0xhex string only of a given or new UUID v7
 */
export const UUID_V7_TO_0XHEX = (uuidv7?: string): string => `0x${(uuidv7 ?? UUID_V7()).replace(/-/g, '')}`
