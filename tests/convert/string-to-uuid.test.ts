import { describe, expect, it } from 'bun:test'
import { STRING_TO_UUID } from '../../ts/convert/string-to-uuid.util.js'

describe(
  'STRING_TO_UUID',
  () => {
    const testCases = [
      {
        name: 'empty string produces nil UUID',
        input: '',
        expected: '00000000-0000-0000-0000-000000000000',
      },
      {
        name: 'short string padded with zeros',
        input: 'abc',
        expected: '00000000-0000-0000-0000-000000616263',
      },
      {
        name: 'hello',
        input: 'hello',
        expected: '00000000-0000-0000-0000-0068656c6c6f',
      },
      {
        name: 'exactly 16-char string fills full UUID',
        input: 'abcdefghijklmnop',
        expected: '61626364-6566-6768-696a-6b6c6d6e6f70',
      },
      {
        name: 'longer string is truncated to first 32 hex chars',
        input: 'abcdefghijklmnopqrstuvwxyz',
        expected: '61626364-6566-6768-696a-6b6c6d6e6f70',
      },
    ]

    it.each(testCases)(
      '$name',
      ({ input, expected }) => {
        expect(STRING_TO_UUID(input)).toBe(expected)
      }
    )
  }
)
