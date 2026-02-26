import { describe, expect, it } from 'bun:test'
import { FROM_BASE_16_TO_CARD_SERIAL } from '../../ts/convert/from-base-16-to-card-serial.util.js'

describe(
  'FROM_BASE_16_TO_CARD_SERIAL',
  () => {
    const testCases = [
      { name: 'empty string returns empty', input: '', expected: '' },
      { name: '8-char hex padded to 16', input: 'aabbccdd', expected: '00000000 aabbccdd' },
      { name: '16-char hex no padding needed', input: '1122334455667788', expected: '11223344 55667788' },
      { name: '4-char hex', input: 'abcd', expected: '00000000 0000abcd' },
      { name: 'all zeros', input: '0000000000000000', expected: '00000000 00000000' },
      { name: 'all f', input: 'ffffffffffffffff', expected: 'ffffffff ffffffff' },
      { name: 'uppercase hex', input: 'DEADBEEFCAFEBABE', expected: 'DEADBEEF CAFEBABE' },
      { name: 'single digit padded', input: '1', expected: '00000000 00000001' },
    ]

    it.each(testCases)(
      '$name',
      ({ input, expected }) => {
        expect(FROM_BASE_16_TO_CARD_SERIAL(input)).toBe(expected)
      }
    )
  }
)
