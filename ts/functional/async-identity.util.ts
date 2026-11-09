/**
 * Asynchronous identity function.
 * @param _ - The value to return
 * @returns A promise of the same value
 * @example
 * ```typescript
 * await ASYNC_IDENTITY(3) // returns 3
 * await ASYNC_IDENTITY(undefined) // returns undefined
 * ```
 */
export async function ASYNC_IDENTITY (_: unknown): Promise<unknown> {
  return _
}
