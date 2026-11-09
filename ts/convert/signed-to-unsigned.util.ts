/**
 * Converts a signed integer into its unsigned value on a number of bits (two's complement).
 * @param _ - The value and the bit width
 * @param _.value - The signed value
 * @param _.bits - The number of bits
 * @returns The unsigned value, unchanged when the value is not negative
 * @example
 * ```typescript
 * SIGNED_TO_UNSIGNED({ value: -1, bits: 8 }) // returns 255
 * SIGNED_TO_UNSIGNED({ value: 5, bits: 8 }) // returns 5
 * ```
 */
export function SIGNED_TO_UNSIGNED (_: { value: number, bits: number }): number {
  const maxUnsignedValue = Math.pow(2, _.bits)

  return (_.value < 0) ? (_.value + maxUnsignedValue) : _.value
}
