import { UUID_V4 } from './uuid-v4.util.js'

/**
 * Generate the hex string only of a given or new UUID v4
 */
export function UUID_V4_TO_HEX (uuidv4?: string): string {
  return (uuidv4 ?? UUID_V4()).replace(/-/g, '')
}
