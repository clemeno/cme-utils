import { describe, expect, it } from 'bun:test'
import { SYMBOLS_LENGTH } from '../../ts/constant/symbols-length.util.js'
import { SYMBOLS } from '../../ts/constant/symbols.util.js'

describe(
  'SYMBOLS_LENGTH',
  () => {
    it(
      'should be the length of SYMBOLS',
      () => {
        expect(SYMBOLS_LENGTH).toBe(SYMBOLS.length)
        expect(SYMBOLS_LENGTH).toBeGreaterThanOrEqual(256)
      }
    )

    it(
      'should be a number',
      () => {
        expect(typeof SYMBOLS_LENGTH).toBe('number')
        expect(Number.isInteger(SYMBOLS_LENGTH)).toBe(true)
        expect(SYMBOLS_LENGTH).toBeGreaterThan(0)
      }
    )
  }
)
