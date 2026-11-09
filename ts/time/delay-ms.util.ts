/**
 * Just wait for a specified number of milliseconds.
 * @param ms milliseconds to wait
 * @returns the promise is resolved
 */
export async function DELAY_MS (ms: number): Promise<any> {
  return await new Promise(resolve => setTimeout(resolve, ms))
}
