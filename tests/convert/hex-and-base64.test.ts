import { describe, expect, it } from 'bun:test'
import { BASE64_TO_HEX } from '../../ts/convert/base64-to-hex.util.js'
import { HEX_TO_BASE64 } from '../../ts/convert/hex-to-base64.util.js'

describe(
  'HEX_TO_BASE64 (fallback — no Buffer)',
  () => {
    const testCases = [
      { name: 'empty hex', hex: '', expected: '' },
      { name: 'hex for "Hello"', hex: '48656c6c6f', expected: 'SGVsbG8=' },
      { name: 'single zero byte', hex: '00', expected: 'AA==' },
      { name: 'single ff byte', hex: 'ff', expected: '/w==' },
    ]

    it.each(testCases)(
      '$name → "$expected"',
      ({ hex, expected }) => {
        expect(HEX_TO_BASE64({ Buffer: undefined, hex })).toBe(expected)
      }
    )
  }
)

describe(
  'BASE64_TO_HEX (fallback — no Buffer)',
  () => {
    const testCases = [
      { name: 'empty base64', base64: '', expected: '' },
      { name: 'base64 of "Hello"', base64: 'SGVsbG8=', expected: '48656c6c6f' },
      { name: 'single zero byte', base64: 'AA==', expected: '00' },
      { name: 'single ff byte', base64: '/w==', expected: 'ff' },
    ]

    it.each(testCases)(
      '$name → "$expected"',
      ({ base64, expected }) => {
        expect(BASE64_TO_HEX({ Buffer: undefined, base64 })).toBe(expected)
      }
    )
  }
)

describe(
  'HEX_TO_BASE64',
  () => {
    const testCases = [
      { name: 'empty hex', hex: '', expected: '' },
      { name: 'hex for "Hello"', hex: '48656c6c6f', expected: 'SGVsbG8=' },
      { name: 'single zero byte', hex: '00', expected: 'AA==' },
      { name: 'single ff byte', hex: 'ff', expected: '/w==' },
      { name: 'three zero bytes', hex: '000000', expected: 'AAAA' },
    ]

    it.each(testCases)(
      '$name → "$expected"',
      ({ hex, expected }) => {
        expect(HEX_TO_BASE64({ Buffer, hex })).toBe(expected)
      }
    )
  }
)

describe(
  'BASE64_TO_HEX',
  () => {
    const testCases = [
      { name: 'empty base64', base64: '', expected: '' },
      { name: 'base64 of "Hello"', base64: 'SGVsbG8=', expected: '48656c6c6f' },
      { name: 'single zero byte', base64: 'AA==', expected: '00' },
      { name: 'single ff byte', base64: '/w==', expected: 'ff' },
      { name: 'three zero bytes', base64: 'AAAA', expected: '000000' },
    ]

    it.each(testCases)(
      '$name → "$expected"',
      ({ base64, expected }) => {
        expect(BASE64_TO_HEX({ Buffer, base64 })).toBe(expected)
      }
    )

    it('is the inverse of HEX_TO_BASE64', () => {
      const originalHex = '48656c6c6f'
      const base64 = HEX_TO_BASE64({ Buffer, hex: originalHex })
      expect(BASE64_TO_HEX({ Buffer, base64 })).toBe(originalHex)
    })
  }
)
