import { describe, expect, it } from 'bun:test'
import { STRING_TO_0XHEX } from '../../ts/convert/string-to-0xhex.util.js'

describe(
  'STRING_TO_0XHEX',
  () => {
    const testCases: Array<{ name: string, input: string, expected: string }> = [
      { name: '"A"', input: 'A', expected: '0x41' },
      { name: '"B"', input: 'B', expected: '0x42' },
      { name: '"a"', input: 'a', expected: '0x61' },
      { name: '"0"', input: '0', expected: '0x30' },
      { name: '"9"', input: '9', expected: '0x39' },
      { name: '"AB"', input: 'AB', expected: '0x4142' },
      { name: '"Hello"', input: 'Hello', expected: '0x48656c6c6f' },
      { name: '"123"', input: '123', expected: '0x313233' },
      { name: '""', input: '', expected: '0x' },
      { name: '"!"', input: '!', expected: '0x21' },
      { name: '" " (space)', input: ' ', expected: '0x20' },
      { name: '"\\n" (newline)', input: '\n', expected: '0xa' },
      { name: '"\\t" (tab)', input: '\t', expected: '0x9' },
      { name: '"©" (Unicode)', input: '©', expected: '0xa9' },
      { name: '"€" (Unicode)', input: '€', expected: '0x20ac' },
      { name: '"🚀" (emoji)', input: '🚀', expected: '0xd83dde80' },
    ]

    it.each(testCases)(
      'STRING_TO_0XHEX($name) -> "$expected"',
      ({ input, expected }) => {
        expect(STRING_TO_0XHEX(input)).toBe(expected)
      }
    )
  }
)
