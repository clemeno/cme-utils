import { describe, expect, it } from 'bun:test'
import { FROM_BASE_16_TO_UUID } from '../../ts/convert/from-base-16-to-uuid.util.js'

describe(
  'FROM_BASE_16_TO_UUID',
  () => {
    const testCases = [
      {
        name: 'empty string pads to nil UUID',
        input: '',
        expected: '00000000-0000-0000-0000-000000000000',
      },
      {
        name: 'full 32-char hex string',
        input: '12345678abcd1234abcd1234567890ab',
        expected: '12345678-abcd-1234-abcd-1234567890ab',
      },
      {
        name: 'uppercase hex is lowercased',
        input: '12345678ABCD1234ABCD1234567890AB',
        expected: '12345678-abcd-1234-abcd-1234567890ab',
      },
      {
        name: 'short hex is left-padded with zeros',
        input: '1',
        expected: '00000000-0000-0000-0000-000000000001',
      },
      {
        name: '32 zeros',
        input: '00000000000000000000000000000000',
        expected: '00000000-0000-0000-0000-000000000000',
      },
      {
        name: 'all f',
        input: 'ffffffffffffffffffffffffffffffff',
        expected: 'ffffffff-ffff-ffff-ffff-ffffffffffff',
      },
    ]

    it.each(testCases)(
      '$name',
      ({ input, expected }) => {
        expect(FROM_BASE_16_TO_UUID(input)).toBe(expected)
      }
    )
  }
)
