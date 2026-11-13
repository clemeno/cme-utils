import { describe, expect, it } from 'bun:test'
import { IS_BOOL } from '../../ts/check/is-bool.util.js'

describe(
  'IS_BOOL',
  () => {
    const testCases: Array<{ name: string, input: unknown, expected: boolean }> = [
      { name: 'true', input: true, expected: true },
      { name: 'false', input: false, expected: true },
      { name: '0', input: 0, expected: true },
      { name: '1', input: 1, expected: true },
      { name: '"1"', input: '1', expected: true },
      { name: '"0"', input: '0', expected: true },
      { name: '"true"', input: 'true', expected: true },
      { name: '"false"', input: 'false', expected: true },
      { name: '"yes"', input: 'yes', expected: true },
      { name: '"no"', input: 'no', expected: true },
      { name: '"on"', input: 'on', expected: true },
      { name: '"off"', input: 'off', expected: true },
      { name: '"y"', input: 'y', expected: true },
      { name: '"n"', input: 'n', expected: true },
      { name: '"ok"', input: 'ok', expected: true },
      { name: '"ko"', input: 'ko', expected: true },
      { name: '"TRUE"', input: 'TRUE', expected: true },
      { name: '"FALSE"', input: 'FALSE', expected: true },
      { name: '"YES"', input: 'YES', expected: true },
      { name: '"NO"', input: 'NO', expected: true },
      { name: '2', input: 2, expected: false },
      { name: '-1', input: -1, expected: false },
      { name: '1.5', input: 1.5, expected: false },
      { name: '"hello"', input: 'hello', expected: false },
      { name: '""', input: '', expected: false },
      { name: '"2"', input: '2', expected: false },
      { name: '"0b1"', input: '0b1', expected: false },
      { name: '"maybe"', input: 'maybe', expected: false },
      { name: 'null', input: null, expected: false },
      { name: 'undefined', input: undefined, expected: false },
      { name: '{}', input: {}, expected: false },
      { name: '[]', input: [], expected: false },
      { name: 'NaN', input: NaN, expected: false },
    ]

    it.each(testCases)(
      'IS_BOOL($name) → $expected',
      ({ input, expected }) => {
        expect(IS_BOOL(input)).toBe(expected)
      }
    )
  }
)
