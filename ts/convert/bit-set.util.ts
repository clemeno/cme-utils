export const BIT_SET = (_: { on: number, at: number, to: 0 | 1 }): number => {
  const mask = 1 << _.at
  return (_.on & ~mask) | ((_.to << _.at) & mask)
}
