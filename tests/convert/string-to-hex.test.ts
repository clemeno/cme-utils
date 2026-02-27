import { describe, expect, it } from 'bun:test'
import { STRING_TO_HEX } from '../../ts/convert/string-to-hex.util.js'

describe(
  'STRING_TO_HEX',
  () => {
    const testCases = [
      { label: '"A"', input: 'A', expected: '41' },
      { label: '"B"', input: 'B', expected: '42' },
      { label: '"a"', input: 'a', expected: '61' },
      { label: '"0"', input: '0', expected: '30' },
      { label: '"9"', input: '9', expected: '39' },
      { label: '"AB"', input: 'AB', expected: '4142' },
      { label: '"Hello"', input: 'Hello', expected: '48656c6c6f' },
      { label: '"123"', input: '123', expected: '313233' },
      { label: '""', input: '', expected: '' },
      { label: '"!"', input: '!', expected: '21' },
      { label: '"@"', input: '@', expected: '40' },
      { label: '" " (space)', input: ' ', expected: '20' },
      { label: '"\\n" (newline)', input: '\n', expected: 'a' },
      { label: '"\\t" (tab)', input: '\t', expected: '9' },
      { label: '"©" (Unicode)', input: '©', expected: 'a9' },
      { label: '"€" (Unicode)', input: '€', expected: '20ac' },
      { label: '"🚀" (emoji)', input: '🚀', expected: 'd83dde80' },
    ]

    it.each(testCases)(
      'STRING_TO_HEX($label) -> "$expected"',
      ({ input, expected }) => {
        expect(STRING_TO_HEX(input)).toBe(expected)
      }
    )
  }
)
