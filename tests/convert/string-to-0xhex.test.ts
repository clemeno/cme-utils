import { describe, expect, it } from 'bun:test'
import { STRING_TO_0XHEX } from '../../ts/convert/string-to-0xhex.util.js'

describe(
  'STRING_TO_0XHEX',
  () => {
    const testCases = [
      { label: '"A"', input: 'A', expected: '0x41' },
      { label: '"B"', input: 'B', expected: '0x42' },
      { label: '"a"', input: 'a', expected: '0x61' },
      { label: '"0"', input: '0', expected: '0x30' },
      { label: '"9"', input: '9', expected: '0x39' },
      { label: '"AB"', input: 'AB', expected: '0x4142' },
      { label: '"Hello"', input: 'Hello', expected: '0x48656c6c6f' },
      { label: '"123"', input: '123', expected: '0x313233' },
      { label: '""', input: '', expected: '0x' },
      { label: '"!"', input: '!', expected: '0x21' },
      { label: '" " (space)', input: ' ', expected: '0x20' },
      { label: '"\\n" (newline)', input: '\n', expected: '0xa' },
      { label: '"\\t" (tab)', input: '\t', expected: '0x9' },
      { label: '"©" (Unicode)', input: '©', expected: '0xa9' },
      { label: '"€" (Unicode)', input: '€', expected: '0x20ac' },
      { label: '"🚀" (emoji)', input: '🚀', expected: '0xd83dde80' },
    ]

    it.each(testCases)(
      'STRING_TO_0XHEX($label) -> "$expected"',
      ({ input, expected }) => {
        expect(STRING_TO_0XHEX(input)).toBe(expected)
      }
    )
  }
)
