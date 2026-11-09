import { UUID_V4 } from './uuid-v4.util.js'

/**
 * Generate the 0xhex string only of a given or new UUID v4
 * @param uuidv4 - The UUID v4 to convert, a new one is generated when omitted
 * @returns The UUID without hyphens, prefixed with '0x'
 * @example
 * ```typescript
 * UUID_V4_TO_0XHEX('3f2504e0-4f89-41d3-9a0c-0305e82c3301') // returns '0x3f2504e04f8941d39a0c0305e82c3301'
 * UUID_V4_TO_0XHEX().length // returns 34
 * ```
 */
export function UUID_V4_TO_0XHEX (uuidv4?: string): string {
  return `0x${(uuidv4 ?? UUID_V4()).replace(/-/g, '')}`
}
