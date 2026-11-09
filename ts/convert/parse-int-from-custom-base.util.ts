/**
 * Parses one symbol of a custom base: its value is its position in the base string (BIG base, SMALL number input).
 * @param _ - The symbol and the base
 * @param _.input - The symbol to look up
 * @param _.base - The string of the base symbols, in value order
 * @returns The position of the symbol in the base, -1 when the symbol is not in the base
 * @example
 * ```typescript
 * PARSE_INT_FROM_CUSTOM_BASE({ input: 'c', base: 'abc' }) // returns 2
 * PARSE_INT_FROM_CUSTOM_BASE({ input: 'z', base: 'abc' }) // returns -1
 * ```
 */
export function PARSE_INT_FROM_CUSTOM_BASE (_: { input: string, base: string }): number {
  return _.base.indexOf(_.input)
}
