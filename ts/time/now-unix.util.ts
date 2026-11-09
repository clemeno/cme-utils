import { TO_NUMBER } from '../convert/to-number.util.js'

/**
 * current unix timestamp in seconds `+Date/1e3`
 * @returns The current unix timestamp in whole seconds
 * @example
 * ```typescript
 * typeof NOW_UNIX() // returns 'number'
 * Number.isInteger(NOW_UNIX()) // returns true
 * // the current time in seconds
 * NOW_UNIX()
 * ```
 */
export function NOW_UNIX (): number {
  return Math.trunc(TO_NUMBER(new Date()) / 1e3)
}
