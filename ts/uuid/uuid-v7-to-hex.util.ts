import { UUID_V7 } from './uuid-v7.util.js'

/**
 * Generate the hex string only of a given or new UUID v7
 */
export const UUID_V7_TO_HEX = (uuidv7?: string): string => (uuidv7 ?? UUID_V7()).replace(/-/g, '')
