import { describe, expect, it } from 'bun:test'
import { STRING_UCF } from '../../ts/string/string-ucf.util.js'

describe(
  'STRING_UCF',
  () => {
    const testCases = [
      { name: 'hello', input: 'hello', expected: 'Hello' },
      { name: 'a', input: 'a', expected: 'A' },
      { name: 'empty string', input: '', expected: '' },
      { name: 'already uppercase', input: 'Hello', expected: 'Hello' },
      { name: 'starts with number', input: '1hello', expected: '1hello' },
    ]

    it.each(testCases)(
      'should uppercase the first character of "$name"',
      ({ input, expected }) => {
        expect(STRING_UCF(input)).toBe(expected)
      }
    )
  }
)
