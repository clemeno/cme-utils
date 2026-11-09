import { UUID_V7 } from './uuid-v7.util.js'

/**
 * Generate the hex string only of a given or new UUID v7
 * @param uuidv7 - The UUID v7 to convert, a new one is generated when omitted
 * @returns The UUID without hyphens
 * @example
 * ```typescript
 * UUID_V7_TO_HEX('01a1ab7d-6b25-71a5-8995-c794b5343b33') // returns '01a1ab7d6b2571a58995c794b5343b33'
 * UUID_V7_TO_HEX().length // returns 32
 * ```
 */
export function UUID_V7_TO_HEX (uuidv7?: string): string {
  return (uuidv7 ?? UUID_V7()).replace(/-/g, '')
}
