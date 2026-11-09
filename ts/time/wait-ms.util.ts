import { TO_NUMBER } from '../convert/to-number.util.js'

/**
 * Wait for a specified number of milliseconds and expect true.
 * @param ms - Milliseconds to wait, converted with `TO_NUMBER`
 * @returns A promise resolved with `true` once the delay is over
 * @example
 * ```typescript
 * await WAIT_MS(10) // returns true
 * await WAIT_MS('5') // returns true
 * ```
 */
export async function WAIT_MS (ms: any): Promise<true> {
  const pTrue = new Promise<true>(resolve => setTimeout(() => { resolve(true) }, TO_NUMBER(ms)))
  const resTrue = await pTrue
  return resTrue
}
