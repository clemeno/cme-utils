import { describe, expect, it } from 'bun:test'
import { TO_CSV_VALUE } from '../../ts/convert/to-csv-value.util.js'

describe(
  'TO_CSV_VALUE',
  () => {
    it(
      'should convert numbers to string',
      () => {
        expect(TO_CSV_VALUE(123)).toBe('123')
        expect(TO_CSV_VALUE(123.45)).toBe('123.45')
        expect(TO_CSV_VALUE(0)).toBe('0')
        expect(TO_CSV_VALUE(-123)).toBe('-123')
      }
    )

    it(
      'should quote strings with JSON.stringify',
      () => {
        expect(TO_CSV_VALUE('hello')).toBe('"hello"')
        expect(TO_CSV_VALUE('hello,world')).toBe('"hello,world"')
        expect(TO_CSV_VALUE('hello "world"')).toBe('"hello \\"world\\""')
      }
    )

    it(
      'should handle objects with toString method',
      () => {
        const obj = {
          toString: () => 'custom string',
          value: 42,
        }
        expect(TO_CSV_VALUE(obj)).toBe('"custom string"')
      }
    )

    it(
      'should handle plain objects',
      () => {
        expect(TO_CSV_VALUE({ a: 1 })).toBe('"[object Object]"')
      }
    )

    it(
      'should return empty string for null, undefined, or NaN',
      () => {
        expect(TO_CSV_VALUE(null)).toBe('')
        expect(TO_CSV_VALUE(undefined)).toBe('')
        expect(TO_CSV_VALUE(NaN)).toBe('"NaN"')
      }
    )

    it(
      'should handle booleans',
      () => {
        expect(TO_CSV_VALUE(true)).toBe('"true"')
        expect(TO_CSV_VALUE(false)).toBe('"false"')
      }
    )
  }
)
