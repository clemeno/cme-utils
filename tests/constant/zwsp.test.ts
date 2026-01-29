import { describe, expect, it } from 'bun:test'
import { ZWSP } from '../../ts/constant/zwsp.util.js'

describe(
  'ZWSP',
  () => {
    it(
      'should be the Unicode ZERO WIDTH SPACE character',
      () => {
        expect(ZWSP).toBe('\u200B')
        expect(ZWSP).toBe('​')
        expect(ZWSP.charCodeAt(0)).toBe(0x200B)
      }
    )

    it(
      'should be a zero-width character',
      () => {
        expect(ZWSP.length).toBe(1)
        expect(ZWSP).toBeTruthy()
        // Zero width space should not be visible but should exist
        expect(ZWSP.trim()).toBe(ZWSP) // trim() doesn't remove zero-width space
      }
    )

    it(
      'should be a string',
      () => {
        expect(typeof ZWSP).toBe('string')
      }
    )
  }
)
