import { describe, expect, it } from 'bun:test'
import { TO_ANY } from '../../ts/convert/to-any.util.js'

describe(
  'TO_ANY',
  () => {
    const testCases: Array<{ name: string, input: undefined | string, expected: unknown }> = [
      { name: 'undefined', input: undefined, expected: '' },
      { name: '"" (empty string)', input: '', expected: '' },
      { name: '"42" (JSON number)', input: '42', expected: 42 },
      { name: '"\\"hello\\"" (JSON string)', input: '"hello"', expected: 'hello' },
      { name: '"[1,2,3]" (JSON array)', input: '[1,2,3]', expected: [1, 2, 3] },
      { name: '\'{"a":1,"b":"x"}\' (JSON object)', input: '{"a":1,"b":"x"}', expected: { a: 1, b: 'x' } },
      { name: '"true" (JSON boolean)', input: 'true', expected: true },
      { name: '"false" (JSON boolean)', input: 'false', expected: false },
      { name: '"null" (JSON null)', input: 'null', expected: null },
      { name: '"not valid json" (invalid)', input: 'not valid json', expected: '' },
    ]

    it.each(testCases)(
      'TO_ANY($name)',
      ({ input, expected }) => {
        expect(TO_ANY(input)).toEqual(expected)
      }
    )
  }
)
