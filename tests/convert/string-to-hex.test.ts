import { describe, expect, it } from 'bun:test'
import { STRING_TO_HEX } from '../../ts/convert/string-to-hex.util.js'

describe(
  'STRING_TO_HEX',
  () => {
    const testCases: Array<{ name: string, input: string, expected: string }> = [
      { name: '"A"', input: 'A', expected: '41' },
      { name: '"B"', input: 'B', expected: '42' },
      { name: '"a"', input: 'a', expected: '61' },
      { name: '"0"', input: '0', expected: '30' },
      { name: '"9"', input: '9', expected: '39' },
      { name: '"AB"', input: 'AB', expected: '4142' },
      { name: '"Hello"', input: 'Hello', expected: '48656c6c6f' },
      { name: '"123"', input: '123', expected: '313233' },
      { name: '""', input: '', expected: '' },
      { name: '"!"', input: '!', expected: '21' },
      { name: '"@"', input: '@', expected: '40' },
      { name: '" " (space)', input: ' ', expected: '20' },
      { name: '"\\n" (newline)', input: '\n', expected: 'a' },
      { name: '"\\t" (tab)', input: '\t', expected: '9' },
      { name: '"©" (Unicode)', input: '©', expected: 'a9' },
      { name: '"€" (Unicode)', input: '€', expected: '20ac' },
      { name: '"🚀" (emoji)', input: '🚀', expected: 'd83dde80' },
    ]

    it.each(testCases)(
      'STRING_TO_HEX($name) -> "$expected"',
      ({ input, expected }) => {
        expect(STRING_TO_HEX(input)).toBe(expected)
      }
    )
  }
)
