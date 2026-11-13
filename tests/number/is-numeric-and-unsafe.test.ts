import { describe, expect, it } from 'bun:test'
import { IS_NUMERIC_AND_UNSAFE } from '../../ts/number/is-numeric-and-unsafe.util.js'

describe(
  'IS_NUMERIC_AND_UNSAFE',
  () => {
    const testCases: Array<{ name: string, input: unknown, expected: boolean }> = [
      { name: 'Number.EPSILON - ε (below safe threshold)', input: Number.EPSILON - 0.0000000000000001, expected: true },
      { name: '-(Number.EPSILON - ε)', input: -(Number.EPSILON - 0.0000000000000001), expected: true },
      { name: 'Number.MAX_SAFE_INTEGER + 1', input: Number.MAX_SAFE_INTEGER + 1, expected: true },
      { name: 'Number.MAX_VALUE', input: Number.MAX_VALUE, expected: true },
      { name: '-(Number.MAX_SAFE_INTEGER + 1)', input: -(Number.MAX_SAFE_INTEGER + 1), expected: true },
      { name: '-Number.MAX_VALUE', input: -Number.MAX_VALUE, expected: true },
      { name: '0', input: 0, expected: false },
      { name: '1', input: 1, expected: false },
      { name: '100', input: 100, expected: false },
      { name: 'Number.EPSILON', input: Number.EPSILON, expected: false },
      { name: 'Number.MAX_SAFE_INTEGER', input: Number.MAX_SAFE_INTEGER, expected: false },
      { name: '"0"', input: '0', expected: false },
      { name: '"123"', input: '123', expected: false },
      { name: '-1', input: -1, expected: false },
      { name: '-100', input: -100, expected: false },
      { name: '"-123"', input: '-123', expected: false },
      { name: '-1.5', input: -1.5, expected: false },
      { name: '-123.45', input: -123.45, expected: false },
      { name: '"-1.5"', input: '-1.5', expected: false },
      { name: '"-123.45"', input: '-123.45', expected: false },
      { name: 'NaN', input: NaN, expected: false },
      { name: '""', input: '', expected: false },
      { name: '"abc"', input: 'abc', expected: false },
      { name: 'null', input: null, expected: false },
      { name: 'undefined', input: undefined, expected: false },
      { name: '{}', input: {}, expected: false },
    ]

    it.each(testCases)(
      'IS_NUMERIC_AND_UNSAFE($name) → $expected',
      ({ input, expected }) => {
        expect(IS_NUMERIC_AND_UNSAFE(input)).toBe(expected)
      }
    )
  }
)
