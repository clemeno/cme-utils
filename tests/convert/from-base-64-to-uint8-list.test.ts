import { describe, expect, it } from 'bun:test'
import { FROM_BASE_64_TO_UINT8_LIST } from '../../ts/convert/from-base-64-to-uint8-list.util.js'

describe(
  'FROM_BASE_64_TO_UINT8_LIST',
  () => {
    const testCases = [
      { name: 'empty base64', base64: '', expected: [] },
      { name: 'base64 for "Hello"', base64: 'SGVsbG8=', expected: [72, 101, 108, 108, 111] },
      { name: 'single zero byte', base64: 'AA==', expected: [0] },
      { name: 'single 0xff byte', base64: '/w==', expected: [255] },
      { name: 'three zero bytes', base64: 'AAAA', expected: [0, 0, 0] },
      { name: 'base64 for [1, 2, 3]', base64: Buffer.from([1, 2, 3]).toString('base64'), expected: [1, 2, 3] },
    ]

    it.each(testCases)(
      '$name → $expected',
      ({ base64, expected }) => {
        expect(FROM_BASE_64_TO_UINT8_LIST({ Buffer, base64 })).toEqual(expected)
      }
    )

    it('returns a plain array (not Uint8Array)', () => {
      const result = FROM_BASE_64_TO_UINT8_LIST({ Buffer, base64: 'AA==' })
      expect(Array.isArray(result)).toBe(true)
    })
  }
)

describe(
  'FROM_BASE_64_TO_UINT8_LIST (fallback — no Buffer)',
  () => {
    const testCases = [
      { name: 'empty base64', base64: '', expected: [] },
      { name: 'base64 for "Hello"', base64: 'SGVsbG8=', expected: [72, 101, 108, 108, 111] },
      { name: 'single zero byte', base64: 'AA==', expected: [0] },
      { name: 'single 0xff byte', base64: '/w==', expected: [255] },
      { name: 'three zero bytes', base64: 'AAAA', expected: [0, 0, 0] },
    ]

    it.each(testCases)(
      '$name → $expected',
      ({ base64, expected }) => {
        expect(FROM_BASE_64_TO_UINT8_LIST({ Buffer: undefined, base64 })).toEqual(expected)
      }
    )

    it('returns empty array when atob throws on invalid base64 chars', () => {
      // '###' contains '#' which is outside the base64 alphabet — atob throws per spec
      expect(FROM_BASE_64_TO_UINT8_LIST({ Buffer: undefined, base64: '###' })).toEqual([])
    })
  }
)
