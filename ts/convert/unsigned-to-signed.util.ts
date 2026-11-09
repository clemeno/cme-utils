/**
 * Converts an unsigned integer into its signed value on a number of bits (two's complement).
 * @param _ - The value and the bit width
 * @param _.value - The unsigned value
 * @param _.bits - The number of bits
 * @returns The signed value, unchanged when it fits in the positive half
 * @example
 * ```typescript
 * UNSIGNED_TO_SIGNED({ value: 255, bits: 8 }) // returns -1
 * UNSIGNED_TO_SIGNED({ value: 127, bits: 8 }) // returns 127
 * ```
 */
export function UNSIGNED_TO_SIGNED (_: { value: number, bits: number }): number {
  const maxUnsignedValue = Math.pow(2, _.bits)
  return (_.value > ((maxUnsignedValue / 2) - 1)) ? (_.value - maxUnsignedValue) : _.value
}
