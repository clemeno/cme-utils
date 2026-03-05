import { describe, expect, it } from 'bun:test'
import { TO_ABS_BIGINT_OR_NULL } from '../../ts/bigint/to-abs-bigint-or-null.util.js'

describe(
  'TO_ABS_BIGINT_OR_NULL',
  () => {
    const testCases = [
      { name: 'negative bigint: -42n', input: -42n, expected: 42n },
      { name: 'positive bigint: 42n', input: 42n, expected: 42n },
      { name: 'zero bigint: 0n', input: 0n, expected: 0n },
      { name: 'negative number: -42', input: -42, expected: 42n },
      { name: 'positive number: 42', input: 42, expected: 42n },
      { name: 'zero number: 0', input: 0, expected: 0n },
      { name: 'numeric string: "42"', input: '42', expected: 42n },
      { name: 'negative numeric string: "-42"', input: '-42', expected: 42n },
      { name: 'zero string: "0"', input: '0', expected: 0n },
      { name: 'empty string: ""', input: '', expected: null },
      { name: 'plain object: {}', input: {}, expected: null },
      { name: 'array: []', input: [], expected: null },
      { name: 'null', input: null, expected: null },
      { name: 'undefined', input: undefined, expected: null },
    ]

    it.each(testCases)(
      '$name',
      ({ input, expected }) => {
        expect(TO_ABS_BIGINT_OR_NULL(input)).toBe(expected)
      }
    )
  }
)
