import { describe, expect, it } from 'bun:test'
import { LIKE_KEEP_PERCENT_AND_DASH } from '../../ts/query/like-keep-percent-and-dash.util.js'

describe(
  'LIKE_KEEP_PERCENT_AND_DASH',
  () => {
    const testCases = [
      { name: 'no special chars unchanged', from: 'hello', expected: 'hello' },
      { name: 'escapes %', from: 'hello%world', expected: 'hello\\%world' },
      { name: 'escapes _', from: 'test_value', expected: 'test\\_value' },
      { name: 'escapes both % and _', from: '100%_done', expected: '100\\%\\_done' },
      { name: 'escapes existing backslash first', from: 'a\\b', expected: 'a\\\\b' },
      { name: 'empty string unchanged', from: '', expected: '' },
      { name: 'multiple % signs', from: '%%', expected: '\\%\\%' },
    ]

    it.each(testCases)(
      '$name',
      ({ from, expected }) => {
        expect(LIKE_KEEP_PERCENT_AND_DASH({ from })).toBe(expected)
      }
    )

    it(
      'custom escapeWith character',
      () => {
        expect(LIKE_KEEP_PERCENT_AND_DASH({ from: 'a%b_c', escapeWith: '!' })).toBe('a!%b!_c')
      }
    )
  }
)
