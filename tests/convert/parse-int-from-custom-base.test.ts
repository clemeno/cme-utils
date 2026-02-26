import { describe, expect, it } from 'bun:test'
import { PARSE_INT_FROM_CUSTOM_BASE } from '../../ts/convert/parse-int-from-custom-base.util.js'

describe(
  'PARSE_INT_FROM_CUSTOM_BASE',
  () => {
    const hex = '0123456789abcdef'

    const testCases = [
      { name: '"0" in hex base', input: '0', base: hex, expected: 0 },
      { name: '"9" in hex base', input: '9', base: hex, expected: 9 },
      { name: '"a" in hex base', input: 'a', base: hex, expected: 10 },
      { name: '"f" in hex base', input: 'f', base: hex, expected: 15 },
      { name: 'not found returns -1', input: 'z', base: hex, expected: -1 },
    ]

    it.each(testCases)(
      '$name',
      ({ input, base, expected }) => {
        expect(PARSE_INT_FROM_CUSTOM_BASE({ input, base })).toBe(expected)
      }
    )

    it(
      'works with a binary base',
      () => {
        expect(PARSE_INT_FROM_CUSTOM_BASE({ input: '1', base: '01' })).toBe(1)
        expect(PARSE_INT_FROM_CUSTOM_BASE({ input: '0', base: '01' })).toBe(0)
        expect(PARSE_INT_FROM_CUSTOM_BASE({ input: '2', base: '01' })).toBe(-1)
      }
    )
  }
)
