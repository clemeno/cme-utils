import { TO_NUMBER } from '../convert/to-number.util.js'

/**
 * current timestamp in milliseconds `+Date`
 * @returns The current timestamp in milliseconds
 * @example
 * ```typescript
 * typeof NOW_MS() // returns 'number'
 * Number.isInteger(NOW_MS()) // returns true
 * // the current time in ms
 * NOW_MS()
 * ```
 */
export function NOW_MS (): number {
  return TO_NUMBER(new Date())
}
