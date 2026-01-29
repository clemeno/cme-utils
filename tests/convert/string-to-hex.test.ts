import { describe, expect, it } from 'bun:test'
import { STRING_TO_HEX } from '../../ts/convert/string-to-hex.util.js'

describe(
  'STRING_TO_HEX',
  () => {
    it(
      'should convert ASCII characters to hex',
      () => {
        expect(STRING_TO_HEX('A')).toBe('41')
        expect(STRING_TO_HEX('B')).toBe('42')
        expect(STRING_TO_HEX('a')).toBe('61')
        expect(STRING_TO_HEX('0')).toBe('30')
        expect(STRING_TO_HEX('9')).toBe('39')
      }
    )

    it(
      'should convert multiple characters to concatenated hex',
      () => {
        expect(STRING_TO_HEX('AB')).toBe('4142')
        expect(STRING_TO_HEX('Hello')).toBe('48656c6c6f')
        expect(STRING_TO_HEX('123')).toBe('313233')
      }
    )

    it(
      'should handle empty string',
      () => {
        expect(STRING_TO_HEX('')).toBe('')
      }
    )

    it(
      'should handle special characters',
      () => {
        expect(STRING_TO_HEX('!')).toBe('21')
        expect(STRING_TO_HEX('@')).toBe('40')
        expect(STRING_TO_HEX(' ')).toBe('20')
        expect(STRING_TO_HEX('\n')).toBe('a')
        expect(STRING_TO_HEX('\t')).toBe('9')
      }
    )

    it(
      'should handle Unicode characters',
      () => {
        expect(STRING_TO_HEX('©')).toBe('a9')
        expect(STRING_TO_HEX('€')).toBe('20ac')
        expect(STRING_TO_HEX('🚀')).toBe('d83dde80')
      }
    )
  }
)
