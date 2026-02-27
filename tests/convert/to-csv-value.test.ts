import { describe, expect, it } from 'bun:test'
import { TO_CSV_VALUE } from '../../ts/convert/to-csv-value.util.js'

describe(
  'TO_CSV_VALUE',
  () => {
    const testCases = [
      { label: '123', input: 123, expected: '123' },
      { label: '123.45', input: 123.45, expected: '123.45' },
      { label: '0', input: 0, expected: '0' },
      { label: '-123', input: -123, expected: '-123' },
      { label: '"hello"', input: 'hello', expected: '"hello"' },
      { label: '"hello,world"', input: 'hello,world', expected: '"hello,world"' },
      { label: '"hello \\"world\\""', input: 'hello "world"', expected: '"hello \\"world\\""' },
      { label: 'object with toString()', input: { toString: () => 'custom string', value: 42 }, expected: '"custom string"' },
      { label: 'plain object { a: 1 }', input: { a: 1 }, expected: '"[object Object]"' },
      { label: 'null', input: null, expected: '' },
      { label: 'undefined', input: undefined, expected: '' },
      { label: 'NaN', input: NaN, expected: '"NaN"' },
      { label: 'true', input: true, expected: '"true"' },
      { label: 'false', input: false, expected: '"false"' },
    ]

    it.each(testCases)(
      'TO_CSV_VALUE($label)',
      ({ input, expected }) => {
        expect(TO_CSV_VALUE(input)).toBe(expected)
      }
    )
  }
)
