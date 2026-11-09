/**
 * Clears (sets to 0) one bit of an integer.
 * @param _ - The integer and the bit position
 * @param _.on - The integer to change
 * @param _.at - The position of the bit to clear, 0 being the least significant
 * @returns The integer with that bit cleared
 * @example
 * ```typescript
 * BIT_KILL({ on: 0b1010, at: 1 }) // returns 8
 * // the bit is already clear
 * BIT_KILL({ on: 0b1000, at: 1 }) // returns 8
 * ```
 */
export function BIT_KILL (_: { on: number, at: number }): number {
  const mask = 1 << _.at
  return (_.on & ~mask) | ((0 << _.at) & mask)
}
