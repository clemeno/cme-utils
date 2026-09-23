import { describe, expect, it } from 'bun:test'
import { SYMBOLS_LENGTH } from '../../ts/constant/symbols-length.util.js'
import { SYMBOLS } from '../../ts/constant/symbols.util.js'

describe(
  'SYMBOLS_LENGTH',
  () => {
    it.each<{ name: string, actual: unknown, expected: unknown }>([
      { name: 'is the length of SYMBOLS', actual: SYMBOLS_LENGTH, expected: SYMBOLS.length },
      { name: 'is exactly 256, one symbol per byte value', actual: SYMBOLS_LENGTH, expected: 256 },
      { name: 'is a number', actual: typeof SYMBOLS_LENGTH, expected: 'number' },
      { name: 'is an integer', actual: Number.isInteger(SYMBOLS_LENGTH), expected: true },
      { name: 'is positive', actual: SYMBOLS_LENGTH > 0, expected: true },
    ])(
      '$name',
      ({ actual, expected }) => {
        expect(actual).toBe(expected)
      }
    )
  }
)
