/**
 * Just wait for a specified number of milliseconds.
 * @param ms - Milliseconds to wait
 * @returns A promise resolved with `undefined` once the delay is over
 * @example
 * ```typescript
 * await DELAY_MS(10) // returns undefined
 * await DELAY_MS(0) // returns undefined
 * ```
 */
export async function DELAY_MS (ms: number): Promise<any> {
  return await new Promise(resolve => setTimeout(resolve, ms))
}
