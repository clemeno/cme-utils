import { describe, expect, it } from 'bun:test'
import { TO_CANONICAL_STRING } from '../../ts/convert/to-canonical-string.util.js'

describe(
  'TO_CANONICAL_STRING',
  () => {
    it(
      'should convert strings to lowercase',
      () => {
        expect(TO_CANONICAL_STRING('HELLO')).toBe('hello')
        expect(TO_CANONICAL_STRING('Hello World')).toBe('hello world')
      }
    )

    it(
      'should remove diacritics',
      () => {
        expect(TO_CANONICAL_STRING('café')).toBe('cafe')
        expect(TO_CANONICAL_STRING('naïve')).toBe('naive')
        expect(TO_CANONICAL_STRING('résumé')).toBe('resume')
        expect(TO_CANONICAL_STRING('Müller')).toBe('muller')
      }
    )

    it(
      'should handle numbers',
      () => {
        expect(TO_CANONICAL_STRING(123)).toBe('123')
        expect(TO_CANONICAL_STRING(123.45)).toBe('123.45')
      }
    )

    it(
      'should handle booleans',
      () => {
        expect(TO_CANONICAL_STRING(true)).toBe('true')
        expect(TO_CANONICAL_STRING(false)).toBe('false')
      }
    )

    it(
      'should handle objects',
      () => {
        expect(TO_CANONICAL_STRING({ a: 1 })).toBe('{"a":1}')
      }
    )

    it(
      'should return empty string for null, undefined, or NaN',
      () => {
        expect(TO_CANONICAL_STRING(null)).toBe('')
        expect(TO_CANONICAL_STRING(undefined)).toBe('')
        expect(TO_CANONICAL_STRING(NaN)).toBe('')
      }
    )

    it(
      'should handle complex Unicode',
      () => {
        expect(TO_CANONICAL_STRING('ỆᶍǍᶆṔƚÉ')).toBe('eᶍaᶆpƚe')
      }
    )
  }
)
