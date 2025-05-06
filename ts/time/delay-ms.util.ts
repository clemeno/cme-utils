/**
 * Just wait for a specified number of milliseconds.
 * @param ms milliseconds to wait
 * @returns the promise is resolved
 */
export const DELAY_MS = async (ms: number): Promise<any> => await new Promise(resolve => setTimeout(resolve, ms))
