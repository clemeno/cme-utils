import { describe, expect, it } from 'bun:test'
import { SYMBOLS_BASE_256 } from '../../ts/constant/symbols-base-256.util.js'
import { SYMBOLS } from '../../ts/constant/symbols.util.js'

describe(
  'SYMBOLS_BASE_256',
  () => {
    it(
      'should be the first 256 characters of SYMBOLS',
      () => {
        expect(SYMBOLS_BASE_256).toBe(SYMBOLS.slice(0, 256))
        expect(SYMBOLS_BASE_256.length).toBe(256)
      }
    )

    it(
      'should be a string',
      () => {
        expect(typeof SYMBOLS_BASE_256).toBe('string')
        expect(SYMBOLS_BASE_256).toBeTruthy()
      }
    )

    it(
      'should start with the same characters as SYMBOLS',
      () => {
        expect(SYMBOLS_BASE_256).toBe(SYMBOLS.substring(0, 256))
        expect(SYMBOLS.startsWith(SYMBOLS_BASE_256)).toBe(true)
      }
    )
  }
)
