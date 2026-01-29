import { describe, expect, it } from 'bun:test'
import { SYMBOLS } from '../../ts/constant/symbols.util.js'

describe(
  'SYMBOLS',
  () => {
    it(
      'should be a string for base conversion',
      () => {
        expect(typeof SYMBOLS).toBe('string')
        expect(SYMBOLS.length).toBe(256)
        expect(SYMBOLS).toBeTruthy()
      }
    )

    it(
      'should start with standard alphanumeric characters',
      () => {
        expect(SYMBOLS.startsWith('0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ')).toBe(true)
      }
    )

    it(
      'should contain unique characters',
      () => {
        const chars = SYMBOLS.split('')
        const uniqueChars = new Set(chars)
        expect(uniqueChars.size).toBe(SYMBOLS.length)
      }
    )

    it(
      'should be suitable for base conversion',
      () => {
        // Should contain at least 62 standard characters (0-9, a-z, A-Z)
        expect(SYMBOLS.length).toBeGreaterThanOrEqual(62)
        // Should contain additional Unicode characters for higher bases
        expect(SYMBOLS.length).toBe(256)
      }
    )
  }
)
