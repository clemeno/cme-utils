import { describe, expect, it } from 'bun:test'
import { TO_ANY } from '../../ts/convert/to-any.util.js'

describe(
  'TO_ANY',
  () => {
    const testCases = [
      { label: 'undefined', input: undefined, expected: '' },
      { label: '"" (empty string)', input: '', expected: '' },
      { label: '"42" (JSON number)', input: '42', expected: 42 },
      { label: '"\\"hello\\"" (JSON string)', input: '"hello"', expected: 'hello' },
      { label: '"[1,2,3]" (JSON array)', input: '[1,2,3]', expected: [1, 2, 3] },
      { label: '\'{"a":1,"b":"x"}\' (JSON object)', input: '{"a":1,"b":"x"}', expected: { a: 1, b: 'x' } },
      { label: '"true" (JSON boolean)', input: 'true', expected: true },
      { label: '"false" (JSON boolean)', input: 'false', expected: false },
      { label: '"null" (JSON null)', input: 'null', expected: null },
      { label: '"not valid json" (invalid)', input: 'not valid json', expected: '' },
    ]

    it.each(testCases)(
      'TO_ANY($label)',
      ({ input, expected }) => {
        expect(TO_ANY(input)).toEqual(expected)
      }
    )
  }
)
