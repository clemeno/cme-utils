import { describe, expect, it } from 'bun:test'
import { IS_NUMERIC_AND_UNSAFE } from '../../ts/number/is-numeric-and-unsafe.util.js'

describe(
  'IS_NUMERIC_AND_UNSAFE',
  () => {
    const testCases = [
      { label: 'Number.EPSILON - ε (below safe threshold)', input: Number.EPSILON - 0.0000000000000001, expected: true },
      { label: '-(Number.EPSILON - ε)', input: -(Number.EPSILON - 0.0000000000000001), expected: true },
      { label: 'Number.MAX_SAFE_INTEGER + 1', input: Number.MAX_SAFE_INTEGER + 1, expected: true },
      { label: 'Number.MAX_VALUE', input: Number.MAX_VALUE, expected: true },
      { label: '-(Number.MAX_SAFE_INTEGER + 1)', input: -(Number.MAX_SAFE_INTEGER + 1), expected: true },
      { label: '-Number.MAX_VALUE', input: -Number.MAX_VALUE, expected: true },
      { label: '0', input: 0, expected: false },
      { label: '1', input: 1, expected: false },
      { label: '100', input: 100, expected: false },
      { label: 'Number.EPSILON', input: Number.EPSILON, expected: false },
      { label: 'Number.MAX_SAFE_INTEGER', input: Number.MAX_SAFE_INTEGER, expected: false },
      { label: '"0"', input: '0', expected: false },
      { label: '"123"', input: '123', expected: false },
      { label: '-1', input: -1, expected: false },
      { label: '-100', input: -100, expected: false },
      { label: '"-123"', input: '-123', expected: false },
      { label: '-1.5', input: -1.5, expected: false },
      { label: '-123.45', input: -123.45, expected: false },
      { label: '"-1.5"', input: '-1.5', expected: false },
      { label: '"-123.45"', input: '-123.45', expected: false },
      { label: 'NaN', input: NaN, expected: false },
      { label: '""', input: '', expected: false },
      { label: '"abc"', input: 'abc', expected: false },
      { label: 'null', input: null, expected: false },
      { label: 'undefined', input: undefined, expected: false },
      { label: '{}', input: {}, expected: false },
    ]

    it.each(testCases)(
      'IS_NUMERIC_AND_UNSAFE($label) → $expected',
      ({ input, expected }) => {
        expect(IS_NUMERIC_AND_UNSAFE(input)).toBe(expected)
      }
    )
  }
)
