import { TO_NUMBER } from '../convert/to-number.util.js'

/**
 * Wait for a specified number of milliseconds and expect true.
 * @param ms milliseconds to wait
 * @returns expect true when the promise is resolved
 */
export async function WAIT_MS (ms: any): Promise<true> {
  const pTrue = new Promise<true>(resolve => setTimeout(() => { resolve(true) }, TO_NUMBER(ms)))
  const resTrue = await pTrue
  return resTrue
}
