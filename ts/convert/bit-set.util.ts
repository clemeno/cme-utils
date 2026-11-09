/**
 * Sets one bit of an integer to 0 or 1.
 * @param _ - The integer, the bit position and the bit value
 * @param _.on - The integer to change
 * @param _.at - The position of the bit to set, 0 being the least significant
 * @param _.to - The new value of the bit, 0 or 1
 * @returns The integer with that bit set to the given value
 * @example
 * ```typescript
 * BIT_SET({ on: 0b1000, at: 1, to: 1 }) // returns 10
 * BIT_SET({ on: 0b1010, at: 1, to: 0 }) // returns 8
 * ```
 */
export function BIT_SET (_: { on: number, at: number, to: 0 | 1 }): number {
  const mask = 1 << _.at
  return (_.on & ~mask) | ((_.to << _.at) & mask)
}
