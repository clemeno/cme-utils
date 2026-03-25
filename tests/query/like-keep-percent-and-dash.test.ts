import { describe, expect, it } from 'bun:test'
import { LIKE_KEEP_PERCENT_AND_DASH } from '../../ts/query/like-keep-percent-and-dash.util.js'

describe(
  'LIKE_KEEP_PERCENT_AND_DASH',
  () => {
    const testCases: Array<{ name: string, from: string, escapeWith?: string, expected: string }> = [
      { name: 'no special chars unchanged', from: 'hello', expected: 'hello' },
      { name: 'escapes %', from: 'hello%world', expected: 'hello\\%world' },
      { name: 'escapes _', from: 'test_value', expected: 'test\\_value' },
      { name: 'escapes both % and _', from: '100%_done', expected: '100\\%\\_done' },
      { name: 'escapes existing backslash first', from: 'a\\b', expected: 'a\\\\b' },
      { name: 'empty string unchanged', from: '', expected: '' },
      { name: 'multiple % signs', from: '%%', expected: '\\%\\%' },
      { name: 'custom escapeWith ! escapes % and _', from: 'a%b_c', escapeWith: '!', expected: 'a!%b!_c' },
    ]

    it.each(testCases)(
      '$name',
      ({ from, escapeWith, expected }) => {
        expect(LIKE_KEEP_PERCENT_AND_DASH({ from, escapeWith })).toBe(expected)
      }
    )
  }
)
