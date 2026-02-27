import { describe, expect, it } from 'bun:test'
import { SAME_DATE } from '../../ts/compare/same-date.util.js'

describe(
  'SAME_DATE',
  () => {
    const testCases = [
      { label: 'two Date objects with the same value', a: new Date('2023-01-01T12:00:00Z'), b: new Date('2023-01-01T12:00:00Z'), expected: true },
      { label: 'identical timestamps', a: 1672531200000, b: 1672531200000, expected: true },
      { label: 'Date and equivalent timestamp', a: new Date('2023-01-01T00:00:00Z'), b: 1672531200000, expected: true },
      { label: 'timestamp and equivalent Date', a: 1672531200000, b: new Date('2023-01-01T00:00:00Z'), expected: true },
      { label: 'objects with valueOf returning same value', a: { valueOf: () => 1672531200000 }, b: { valueOf: () => 1672531200000 }, expected: true },
      { label: 'timestamp and matching numeric string', a: 1672531200000, b: '1672531200000', expected: true },
      { label: 'numeric string and matching timestamp', a: '1672531200000', b: 1672531200000, expected: true },
      { label: 'different Date objects', a: new Date('2023-01-01'), b: new Date('2023-01-02'), expected: false },
      { label: 'different timestamps', a: 1672531200000, b: 1672617600000, expected: false },
      { label: 'null and null', a: null, b: null, expected: false },
      { label: 'undefined and undefined', a: undefined, b: undefined, expected: false },
      { label: 'null and undefined', a: null, b: undefined, expected: false },
      { label: 'undefined and null', a: undefined, b: null, expected: false },
      { label: 'Date and null', a: new Date('2023-01-01'), b: null, expected: false },
      { label: 'null and Date', a: null, b: new Date('2023-01-01'), expected: false },
      { label: 'timestamp and undefined', a: 1672531200000, b: undefined, expected: false },
    ]

    it.each(testCases)(
      'SAME_DATE($label) → $expected',
      ({ a, b, expected }) => {
        expect(SAME_DATE({ a, b })).toBe(expected)
      }
    )
  }
)
