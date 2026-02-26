import { describe, expect, it } from 'bun:test'
import { REBASE } from '../../ts/convert/rebase.util.js'

describe(
  'REBASE',
  () => {
    const testCases = [
      { name: '0 base 10 → base 16', from: '0', base: 10, toBase: 16, expected: '0' },
      { name: '10 base 10 → base 16 (a)', from: '10', base: 10, toBase: 16, expected: 'a' },
      { name: 'ff base 16 → base 10 (255)', from: 'ff', base: 16, toBase: 10, expected: '255' },
      { name: '10 base 16 → base 10 (16)', from: '10', base: 16, toBase: 10, expected: '16' },
      { name: '1111 base 2 → base 10 (15)', from: '1111', base: 2, toBase: 10, expected: '15' },
      { name: '15 base 10 → base 2 (1111)', from: '15', base: 10, toBase: 2, expected: '1111' },
      { name: '255 base 10 → base 16 (ff)', from: '255', base: 10, toBase: 16, expected: 'ff' },
      { name: 'a base 16 → base 10 (10)', from: 'a', base: 16, toBase: 10, expected: '10' },
    ]

    it.each(testCases)(
      '$name',
      ({ from, base, toBase, expected }) => {
        expect(REBASE({ from, base, toBase })).toBe(expected)
      }
    )

    it(
      'throws on invalid digit for the given base',
      () => {
        expect(() => REBASE({ from: 'g', base: 16, toBase: 10 })).toThrow()
      }
    )
  }
)
