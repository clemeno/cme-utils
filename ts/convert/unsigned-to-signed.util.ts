export const UNSIGNED_TO_SIGNED = (_: { value: number, bits: number }): number => {
  const maxUnsignedValue = Math.pow(2, _.bits)
  return (_.value > ((maxUnsignedValue / 2) - 1)) ? (_.value - maxUnsignedValue) : _.value
}
