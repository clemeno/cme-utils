import { UUID_V4 } from './uuid-v4.util.js'

/**
 * Generate the hex string only of a given or new UUID v4
 * @param uuidv4 - The UUID v4 to convert, a new one is generated when omitted
 * @returns The UUID without hyphens
 * @example
 * ```typescript
 * UUID_V4_TO_HEX('3f2504e0-4f89-41d3-9a0c-0305e82c3301') // returns '3f2504e04f8941d39a0c0305e82c3301'
 * UUID_V4_TO_HEX().length // returns 32
 * ```
 */
export function UUID_V4_TO_HEX (uuidv4?: string): string {
  return (uuidv4 ?? UUID_V4()).replace(/-/g, '')
}
