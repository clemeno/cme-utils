import { describe, expect, it } from 'bun:test'
import { STRING_LCF } from '../../ts/string/string-lcf.util.js'

describe(
  'STRING_LCF',
  () => {
    const testCases = [
      { name: 'Hello', input: 'Hello', expected: 'hello' },
      { name: 'A', input: 'A', expected: 'a' },
      { name: 'empty string', input: '', expected: '' },
      { name: 'already lowercase', input: 'hello', expected: 'hello' },
      { name: 'starts with number', input: '1hello', expected: '1hello' },
    ]

    it.each(testCases)(
      'should lowercase the first character of "$name"',
      ({ input, expected }) => {
        expect(STRING_LCF(input)).toBe(expected)
      }
    )
  }
)
