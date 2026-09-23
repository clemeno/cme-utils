import { describe, expect, it } from 'bun:test'
import { ZWSP } from '../../ts/constant/zwsp.util.js'

describe(
  'ZWSP',
  () => {
    it.each<{ name: string, actual: unknown, expected: unknown }>([
      { name: 'is the Unicode ZERO WIDTH SPACE escape sequence U+200B', actual: ZWSP, expected: '\u200B' },
      { name: 'is the literal ZERO WIDTH SPACE character', actual: ZWSP, expected: '​' },
      { name: 'has the char code 0x200B', actual: ZWSP.charCodeAt(0), expected: 0x200B },
      { name: 'is a single zero-width character', actual: ZWSP.length, expected: 1 },
      { name: 'is truthy', actual: Boolean(ZWSP), expected: true },
      // Zero width space should not be visible but should exist: trim() doesn't remove it
      { name: 'is not removed by trim()', actual: ZWSP.trim(), expected: '\u200B' },
      { name: 'is a string', actual: typeof ZWSP, expected: 'string' },
    ])(
      '$name',
      ({ actual, expected }) => {
        expect(actual).toBe(expected)
      }
    )
  }
)
