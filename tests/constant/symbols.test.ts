import { describe, expect, it } from 'bun:test'
import { SYMBOLS } from '../../ts/constant/symbols.util.js'

describe(
  'SYMBOLS',
  () => {
    it.each<{ name: string, actual: unknown, expected: unknown }>([
      { name: 'should be a string for base conversion', actual: typeof SYMBOLS, expected: 'string' },
      // 256 symbols: one per byte value, so any Buffer can be serialized (covers the ">= 62 standard characters" need)
      { name: 'should be suitable for base conversion (256 symbols)', actual: SYMBOLS.length, expected: 256 },
      { name: 'should start with standard alphanumeric characters', actual: SYMBOLS.slice(0, 62), expected: '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ' },
      { name: 'should contain unique characters', actual: new Set(SYMBOLS.split('')).size, expected: SYMBOLS.length },
    ])(
      '$name',
      ({ actual, expected }) => {
        expect(actual).toBe(expected)
      }
    )
  }
)
