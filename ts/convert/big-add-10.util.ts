import type { numeric } from '../numeric.js'

/**
 * Adds two big non-negative decimal integers, digit by digit, without losing precision.
 * @param _ - The two addends
 * @param _.x - The first addend, a digit string or a number
 * @param _.y - The second addend, a digit string or a number
 * @returns The sum as a decimal string
 * @example
 * ```typescript
 * BIG_ADD_10({ x: '999', y: '1' }) // returns '1000'
 * BIG_ADD_10({ x: 5, y: 7 }) // returns '12'
 * BIG_ADD_10({ x: '18446744073709551616', y: '18446744073709551616' }) // returns '36893488147419103232'
 * ```
 */
export function BIG_ADD_10 (_: { x: numeric, y: numeric }): string {
  let c = 0
  const r: number[] = []
  const x = `${_.x}`.split('').map(Number)
  const y = `${_.y}`.split('').map(Number)

  while ((x.length !== 0) || (y.length !== 0)) {
    const s = (x.pop() ?? 0) + (y.pop() ?? 0) + c

    const bSDecDigit = s < 10

    r.unshift(bSDecDigit ? s : s - 10)

    c = bSDecDigit ? 0 : 1
  }

  if (c !== 0) {
    r.unshift(c)
  }

  return r.join('')
}
