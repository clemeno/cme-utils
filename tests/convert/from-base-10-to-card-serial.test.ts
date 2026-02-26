import { describe, expect, it } from 'bun:test'
import { FROM_BASE_10_TO_CARD_SERIAL } from '../../ts/convert/from-base-10-to-card-serial.util.js'

describe(
  'FROM_BASE_10_TO_CARD_SERIAL',
  () => {
    const testCases = [
      { name: '0', input: '0', expected: '00000000 00000000' },
      { name: '255 → ff padded', input: '255', expected: '00000000 000000ff' },
      { name: '256 → 100 padded', input: '256', expected: '00000000 00000100' },
      { name: '4294967295 → ffffffff', input: '4294967295', expected: '00000000 ffffffff' },
      { name: 'numeric input 255', input: 255, expected: '00000000 000000ff' },
    ]

    it.each(testCases)(
      '$name',
      ({ input, expected }) => {
        expect(FROM_BASE_10_TO_CARD_SERIAL(input)).toBe(expected)
      }
    )
  }
)
