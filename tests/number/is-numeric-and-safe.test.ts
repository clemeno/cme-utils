import { describe, expect, it } from 'bun:test'
import { IS_NUMERIC_AND_SAFE } from '../../ts/number/is-numeric-and-safe.util.js'

describe(
  'IS_NUMERIC_AND_SAFE',
  () => {
    const testCases: Array<{ name: string, input: number | string | null | undefined, expected: boolean }> = [
      { name: '0', input: 0, expected: true },
      { name: '1', input: 1, expected: true },
      { name: '100', input: 100, expected: true },
      { name: '123.45', input: 123.45, expected: true },
      { name: 'Number.EPSILON', input: Number.EPSILON, expected: true },
      { name: 'Number.MAX_SAFE_INTEGER', input: Number.MAX_SAFE_INTEGER, expected: true },
      { name: '"0"', input: '0', expected: true },
      { name: '"123"', input: '123', expected: true },
      { name: '"123.45"', input: '123.45', expected: true },
      { name: '-1', input: -1, expected: true },
      { name: '-100', input: -100, expected: true },
      { name: '"-123"', input: '-123', expected: true },
      { name: '-1.5', input: -1.5, expected: true },
      { name: '-123.45', input: -123.45, expected: true },
      { name: '"-1.5"', input: '-1.5', expected: true },
      { name: '"-123.45"', input: '-123.45', expected: true },
      { name: 'Number.EPSILON - ε (below threshold)', input: Number.EPSILON - 0.0000000000000001, expected: false },
      { name: '-Number.EPSILON + ε (above negative threshold)', input: -Number.EPSILON + 0.0000000000000001, expected: false },
      { name: 'Number.MAX_SAFE_INTEGER + 1', input: Number.MAX_SAFE_INTEGER + 1, expected: false },
      { name: 'Number.MAX_VALUE', input: Number.MAX_VALUE, expected: false },
      { name: 'NaN', input: NaN, expected: false },
      { name: '""', input: '', expected: false },
      { name: '"abc"', input: 'abc', expected: false },
      { name: '"0x10"', input: '0x10', expected: false },
      { name: 'null', input: null, expected: false },
      { name: 'undefined', input: undefined, expected: false },
    ]

    it.each(testCases)(
      'IS_NUMERIC_AND_SAFE($name) → $expected',
      ({ input, expected }) => {
        expect(IS_NUMERIC_AND_SAFE(input)).toBe(expected)
      }
    )
  }
)
