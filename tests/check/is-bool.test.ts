import { describe, expect, it } from 'bun:test'
import { IS_BOOL } from '../../ts/check/is-bool.util.js'

describe(
  'IS_BOOL',
  () => {
    const testCases = [
      { label: 'true', input: true, expected: true },
      { label: 'false', input: false, expected: true },
      { label: '0', input: 0, expected: true },
      { label: '1', input: 1, expected: true },
      { label: '"1"', input: '1', expected: true },
      { label: '"0"', input: '0', expected: true },
      { label: '"true"', input: 'true', expected: true },
      { label: '"false"', input: 'false', expected: true },
      { label: '"yes"', input: 'yes', expected: true },
      { label: '"no"', input: 'no', expected: true },
      { label: '"on"', input: 'on', expected: true },
      { label: '"off"', input: 'off', expected: true },
      { label: '"y"', input: 'y', expected: true },
      { label: '"n"', input: 'n', expected: true },
      { label: '"ok"', input: 'ok', expected: true },
      { label: '"ko"', input: 'ko', expected: true },
      { label: '"TRUE"', input: 'TRUE', expected: true },
      { label: '"FALSE"', input: 'FALSE', expected: true },
      { label: '"YES"', input: 'YES', expected: true },
      { label: '"NO"', input: 'NO', expected: true },
      { label: '2', input: 2, expected: false },
      { label: '-1', input: -1, expected: false },
      { label: '1.5', input: 1.5, expected: false },
      { label: '"hello"', input: 'hello', expected: false },
      { label: '""', input: '', expected: false },
      { label: '"2"', input: '2', expected: false },
      { label: '"maybe"', input: 'maybe', expected: false },
      { label: 'null', input: null, expected: false },
      { label: 'undefined', input: undefined, expected: false },
      { label: '{}', input: {}, expected: false },
      { label: '[]', input: [], expected: false },
      { label: 'NaN', input: NaN, expected: false },
    ]

    it.each(testCases)(
      'IS_BOOL($label) → $expected',
      ({ input, expected }) => {
        expect(IS_BOOL(input)).toBe(expected)
      }
    )
  }
)
