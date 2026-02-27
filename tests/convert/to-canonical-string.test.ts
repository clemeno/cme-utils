import { describe, expect, it } from 'bun:test'
import { TO_CANONICAL_STRING } from '../../ts/convert/to-canonical-string.util.js'

describe(
  'TO_CANONICAL_STRING',
  () => {
    const testCases = [
      { label: '"HELLO"', input: 'HELLO', expected: 'hello' },
      { label: '"Hello World"', input: 'Hello World', expected: 'hello world' },
      { label: '"café" (diacritics)', input: 'café', expected: 'cafe' },
      { label: '"naïve" (diacritics)', input: 'naïve', expected: 'naive' },
      { label: '"résumé" (diacritics)', input: 'résumé', expected: 'resume' },
      { label: '"Müller" (diacritics)', input: 'Müller', expected: 'muller' },
      { label: '123 (number)', input: 123, expected: '123' },
      { label: '123.45 (number)', input: 123.45, expected: '123.45' },
      { label: 'true (boolean)', input: true, expected: 'true' },
      { label: 'false (boolean)', input: false, expected: 'false' },
      { label: '{ a: 1 } (object)', input: { a: 1 }, expected: '{"a":1}' },
      { label: 'null', input: null, expected: '' },
      { label: 'undefined', input: undefined, expected: '' },
      { label: 'NaN', input: NaN, expected: '' },
      { label: '"ỆᶍǍᶆṔƚÉ" (complex Unicode)', input: 'ỆᶍǍᶆṔƚÉ', expected: 'eᶍaᶆpƚe' },
    ]

    it.each(testCases)(
      'TO_CANONICAL_STRING($label) -> "$expected"',
      ({ input, expected }) => {
        expect(TO_CANONICAL_STRING(input)).toBe(expected)
      }
    )
  }
)
