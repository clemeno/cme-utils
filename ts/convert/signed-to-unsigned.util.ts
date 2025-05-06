export const SIGNED_TO_UNSIGNED = (_: { value: number, bits: number }): number => {
  const maxUnsignedValue = Math.pow(2, _.bits)

  return (_.value < 0) ? (_.value + maxUnsignedValue) : _.value
}
