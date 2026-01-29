import { describe, expect, it } from 'bun:test'
import { SAME_DATE } from '../../ts/compare/same-date.util.js'

describe(
  'SAME_DATE',
  () => {
    it(
      'should return true for identical Date objects',
      () => {
        const date = new Date('2023-01-01T12:00:00Z')
        expect(SAME_DATE({ a: date, b: date })).toBe(true)
        expect(SAME_DATE({ a: new Date('2023-01-01T12:00:00Z'), b: new Date('2023-01-01T12:00:00Z') })).toBe(true)
      }
    )

    it(
      'should return true for identical timestamps',
      () => {
        expect(SAME_DATE({ a: 1672531200000, b: 1672531200000 })).toBe(true)
      }
    )

    it(
      'should return true for equivalent Date and timestamp',
      () => {
        expect(SAME_DATE({ a: new Date('2023-01-01T00:00:00Z'), b: 1672531200000 })).toBe(true)
        expect(SAME_DATE({ a: 1672531200000, b: new Date('2023-01-01T00:00:00Z') })).toBe(true)
      }
    )

    it(
      'should return false for different dates',
      () => {
        expect(SAME_DATE({ a: new Date('2023-01-01'), b: new Date('2023-01-02') })).toBe(false)
        expect(SAME_DATE({ a: 1672531200000, b: 1672617600000 })).toBe(false)
      }
    )

    it(
      'should return false for null/undefined values when both are null/undefined',
      () => {
        expect(SAME_DATE({ a: null, b: null })).toBe(false)
        expect(SAME_DATE({ a: undefined, b: undefined })).toBe(false)
        expect(SAME_DATE({ a: null, b: undefined })).toBe(false)
        expect(SAME_DATE({ a: undefined, b: null })).toBe(false)
      }
    )

    it(
      'should return false when one value is null/undefined and the other is not',
      () => {
        expect(SAME_DATE({ a: new Date('2023-01-01'), b: null })).toBe(false)
        expect(SAME_DATE({ a: null, b: new Date('2023-01-01') })).toBe(false)
        expect(SAME_DATE({ a: 1672531200000, b: undefined })).toBe(false)
      }
    )

    it(
      'should handle objects with valueOf method',
      () => {
        const obj1 = { valueOf: () => 1672531200000 }
        const obj2 = { valueOf: () => 1672531200000 }
        expect(SAME_DATE({ a: obj1, b: obj2 })).toBe(true)
      }
    )

    it(
      'should handle numbers and numeric strings',
      () => {
        expect(SAME_DATE({ a: 1672531200000, b: '1672531200000' })).toBe(true)
        expect(SAME_DATE({ a: '1672531200000', b: 1672531200000 })).toBe(true)
      }
    )
  }
)
