import { describe, expect, it } from 'bun:test'
import { TO_CSV_VALUE } from '../../ts/convert/to-csv-value.util.js'

describe(
  'TO_CSV_VALUE',
  () => {
    const testCases: Array<{ name: string, input: unknown, expected: string }> = [
      { name: '123', input: 123, expected: '123' },
      { name: '123.45', input: 123.45, expected: '123.45' },
      { name: '0', input: 0, expected: '0' },
      { name: '-123', input: -123, expected: '-123' },
      { name: '"hello"', input: 'hello', expected: '"hello"' },
      { name: '"hello,world"', input: 'hello,world', expected: '"hello,world"' },
      { name: '"hello \\"world\\""', input: 'hello "world"', expected: '"hello \\"world\\""' },
      { name: 'object with toString()', input: { toString: () => 'custom string', value: 42 }, expected: '"custom string"' },
      { name: 'plain object { a: 1 }', input: { a: 1 }, expected: '"[object Object]"' },
      { name: 'null', input: null, expected: '' },
      { name: 'undefined', input: undefined, expected: '' },
      { name: 'NaN', input: NaN, expected: '"NaN"' },
      { name: 'true', input: true, expected: '"true"' },
      { name: 'false', input: false, expected: '"false"' },
    ]

    it.each(testCases)(
      'TO_CSV_VALUE($name)',
      ({ input, expected }) => {
        expect(TO_CSV_VALUE(input)).toBe(expected)
      }
    )
  }
)
