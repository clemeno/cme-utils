import { describe, expect, it } from 'bun:test'
import { SAME_MOMENT } from '../../ts/compare/same-moment.util.js'

describe(
  'SAME_MOMENT',
  () => {
    const testCases: Array<{ name: string, a: unknown, b: unknown, expected: boolean }> = [
      { name: 'two Date objects with the same value', a: new Date('2023-01-01T12:00:00Z'), b: new Date('2023-01-01T12:00:00Z'), expected: true },
      { name: 'identical timestamps', a: 1672531200000, b: 1672531200000, expected: true },
      { name: 'Date and equivalent timestamp', a: new Date('2023-01-01T00:00:00Z'), b: 1672531200000, expected: true },
      { name: 'timestamp and equivalent Date', a: 1672531200000, b: new Date('2023-01-01T00:00:00Z'), expected: true },
      { name: 'objects with valueOf returning same value', a: { valueOf: () => 1672531200000 }, b: { valueOf: () => 1672531200000 }, expected: true },
      { name: 'timestamp and matching numeric string', a: 1672531200000, b: '1672531200000', expected: true },
      { name: 'numeric string and matching timestamp', a: '1672531200000', b: 1672531200000, expected: true },
      { name: 'different Date objects', a: new Date('2023-01-01'), b: new Date('2023-01-02'), expected: false },
      { name: 'different timestamps', a: 1672531200000, b: 1672617600000, expected: false },
      { name: 'null and null', a: null, b: null, expected: false },
      { name: 'undefined and undefined', a: undefined, b: undefined, expected: false },
      { name: 'null and undefined', a: null, b: undefined, expected: false },
      { name: 'undefined and null', a: undefined, b: null, expected: false },
      { name: 'Date and null', a: new Date('2023-01-01'), b: null, expected: false },
      { name: 'null and Date', a: null, b: new Date('2023-01-01'), expected: false },
      { name: 'timestamp and undefined', a: 1672531200000, b: undefined, expected: false },
      { name: 'undefined and timestamp', a: undefined, b: 1672531200000, expected: false },
    ]

    it.each(testCases)(
      'SAME_MOMENT($name) → $expected',
      ({ a, b, expected }) => {
        expect(SAME_MOMENT({ a, b })).toBe(expected)
      }
    )
  }
)
