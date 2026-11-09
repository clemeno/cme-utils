// BIG base SMALL number input
export function PARSE_INT_FROM_CUSTOM_BASE (_: { input: string, base: string }): number {
  return _.base.indexOf(_.input)
}
