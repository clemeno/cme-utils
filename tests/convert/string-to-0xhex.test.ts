import { describe, expect, it } from 'bun:test'
import { STRING_TO_0XHEX } from '../../ts/convert/string-to-0xhex.util.js'

describe(
  'STRING_TO_0XHEX',
  () => {
    it(
      'should convert ASCII characters to 0x prefixed hex',
      () => {
        expect(STRING_TO_0XHEX('A')).toBe('0x41')
        expect(STRING_TO_0XHEX('B')).toBe('0x42')
        expect(STRING_TO_0XHEX('a')).toBe('0x61')
        expect(STRING_TO_0XHEX('0')).toBe('0x30')
        expect(STRING_TO_0XHEX('9')).toBe('0x39')
      }
    )

    it(
      'should convert multiple characters',
      () => {
        expect(STRING_TO_0XHEX('AB')).toBe('0x4142')
        expect(STRING_TO_0XHEX('Hello')).toBe('0x48656c6c6f')
        expect(STRING_TO_0XHEX('123')).toBe('0x313233')
      }
    )

    it(
      'should handle empty string',
      () => {
        expect(STRING_TO_0XHEX('')).toBe('0x')
      }
    )

    it(
      'should handle special characters',
      () => {
        expect(STRING_TO_0XHEX('!')).toBe('0x21')
        expect(STRING_TO_0XHEX(' ')).toBe('0x20')
        expect(STRING_TO_0XHEX('\n')).toBe('0xa')
        expect(STRING_TO_0XHEX('\t')).toBe('0x9')
      }
    )

    it(
      'should handle Unicode characters',
      () => {
        expect(STRING_TO_0XHEX('©')).toBe('0xa9')
        expect(STRING_TO_0XHEX('€')).toBe('0x20ac')
        expect(STRING_TO_0XHEX('🚀')).toBe('0xd83dde80')
      }
    )
  }
)
