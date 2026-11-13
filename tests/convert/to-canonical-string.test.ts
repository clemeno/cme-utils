import { describe, expect, it } from 'bun:test'
import { TO_CANONICAL_STRING } from '../../ts/convert/to-canonical-string.util.js'

describe(
  'TO_CANONICAL_STRING',
  () => {
    const testCases: Array<{ name: string, input: string | number | { a: number } | null | undefined | boolean, expected: string }> = [
      { name: '"HELLO"', input: 'HELLO', expected: 'hello' },
      { name: '"Hello World"', input: 'Hello World', expected: 'hello world' },
      { name: '"café" (diacritics)', input: 'café', expected: 'cafe' },
      { name: '"naïve" (diacritics)', input: 'naïve', expected: 'naive' },
      { name: '"résumé" (diacritics)', input: 'résumé', expected: 'resume' },
      { name: '"Müller" (diacritics)', input: 'Müller', expected: 'muller' },
      { name: '123 (number)', input: 123, expected: '123' },
      { name: '123.45 (number)', input: 123.45, expected: '123.45' },
      { name: 'true (boolean)', input: true, expected: 'true' },
      { name: 'false (boolean)', input: false, expected: 'false' },
      { name: '{ a: 1 } (object)', input: { a: 1 }, expected: '{"a":1}' },
      { name: 'null', input: null, expected: '' },
      { name: 'undefined', input: undefined, expected: '' },
      { name: 'NaN', input: NaN, expected: '' },
      { name: '"ỆᶍǍᶆṔƚÉ" (complex Unicode)', input: 'ỆᶍǍᶆṔƚÉ', expected: 'eᶍaᶆpƚe' },
    ]

    it.each(testCases)(
      'TO_CANONICAL_STRING($name) -> "$expected"',
      ({ input, expected }) => {
        expect(TO_CANONICAL_STRING(input)).toBe(expected)
      }
    )
  }
)
