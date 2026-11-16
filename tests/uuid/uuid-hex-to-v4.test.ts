import { describe, expect, it } from 'bun:test'
import { UUID_HEX_TO_V4 } from '../../ts/uuid/uuid-hex-to-v4.util.js'

describe(
  'UUID_HEX_TO_V4',
  () => {
    const testCases: Array<{ name: string, input: string, expected: string }> = [
      { name: 'sets the version and variant nibbles of 32 hex digits', input: '0123456789abcdef0123456789abcdef', expected: '01234567-89ab-4def-8123-456789abcdef' },
      { name: 'strips 0x and left-pads short content', input: '0xFF', expected: '00000000-0000-4000-8000-0000000000ff' },
      { name: 'strips 0X', input: '0X0123456789ABCDEF0123456789ABCDEF', expected: '01234567-89ab-4def-8123-456789abcdef' },
      { name: 'returns the NIL UUID with version and variant set for non-hex input', input: 'xyz', expected: '00000000-0000-4000-8000-000000000000' },
      { name: 'keeps the first 32 of 33 digits', input: '0123456789abcdef0123456789abcdef9', expected: '01234567-89ab-4def-8123-456789abcdef' },
    ]

    it.each(testCases)(
      '$name',
      ({ input, expected }) => {
        expect(UUID_HEX_TO_V4(input)).toBe(expected)
      }
    )
  }
)
