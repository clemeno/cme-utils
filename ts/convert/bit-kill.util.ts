export const BIT_KILL = (_: { on: number, at: number }): number => {
  const mask = 1 << _.at
  return (_.on & ~mask) | ((0 << _.at) & mask)
}
