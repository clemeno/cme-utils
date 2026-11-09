/**
 * Identity function.
 * @param _ - The value to return
 * @returns The same value
 * @example
 * ```typescript
 * IDENTITY(3) // returns 3
 * IDENTITY(null) // returns null
 * ```
 */
export function IDENTITY (_: unknown): unknown {
  return _
}
