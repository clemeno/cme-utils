import { describe, expect, it } from 'bun:test'
import { SYMBOLS_BASE_256 } from '../../ts/constant/symbols-base-256.util.js'
import { SYMBOLS } from '../../ts/constant/symbols.util.js'

describe(
  'SYMBOLS_BASE_256',
  () => {
    it.each<{ name: string, input: unknown, expected: unknown }>([
      { name: 'is the first 256 characters of SYMBOLS (slice)', input: SYMBOLS_BASE_256, expected: SYMBOLS.slice(0, 256) },
      { name: 'is the first 256 characters of SYMBOLS (substring)', input: SYMBOLS_BASE_256, expected: SYMBOLS.substring(0, 256) },
      { name: 'is 256 characters long', input: SYMBOLS_BASE_256.length, expected: 256 },
      { name: 'is a prefix of SYMBOLS', input: SYMBOLS.startsWith(SYMBOLS_BASE_256), expected: true },
      { name: 'is a string', input: typeof SYMBOLS_BASE_256, expected: 'string' },
      { name: 'is truthy', input: Boolean(SYMBOLS_BASE_256), expected: true },
    ])(
      '$name',
      ({ input, expected }) => {
        expect(input).toBe(expected)
      }
    )
  }
)
