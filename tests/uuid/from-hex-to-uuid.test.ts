import { describe, expect, it } from 'bun:test'
import { FROM_HEX_TO_UUID } from '../../ts/uuid/from-hex-to-uuid.util.js'

describe(
  'FROM_HEX_TO_UUID',
  () => {
    const testCases: Array<{ name: string, input: string, expected: string }> = [
      { name: 'formats 32 hex digits', input: '0123456789abcdef0123456789abcdef', expected: '01234567-89ab-cdef-0123-456789abcdef' },
      { name: 'strips a leading 0x', input: '0x0123456789abcdef0123456789abcdef', expected: '01234567-89ab-cdef-0123-456789abcdef' },
      { name: 'strips a leading 0X', input: '0X0123456789abcdef0123456789abcdef', expected: '01234567-89ab-cdef-0123-456789abcdef' },
      { name: 'lowercases upper case digits', input: '0123456789ABCDEF0123456789ABCDEF', expected: '01234567-89ab-cdef-0123-456789abcdef' },
      { name: 'left-pads short content with zeros', input: '0xFF', expected: '00000000-0000-0000-0000-0000000000ff' },
      { name: 'returns the NIL UUID for an empty string', input: '', expected: '00000000-0000-0000-0000-000000000000' },
      { name: 'keeps the first 32 of 33 digits', input: '0123456789abcdef0123456789abcdef9', expected: '01234567-89ab-cdef-0123-456789abcdef' },
      { name: 'returns the NIL UUID for a non-hex character', input: '0123456789abcdef0123456789abcdeg', expected: '00000000-0000-0000-0000-000000000000' },
    ]

    it.each(testCases)(
      '$name',
      ({ input, expected }) => {
        expect(FROM_HEX_TO_UUID(input)).toBe(expected)
      }
    )
  }
)
