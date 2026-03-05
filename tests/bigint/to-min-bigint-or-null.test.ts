import { describe, expect, it } from 'bun:test'
import { TO_MIN_BIGINT_OR_NULL } from '../../ts/bigint/to-min-bigint-or-null.util.js'

describe(
  'TO_MIN_BIGINT_OR_NULL',
  () => {
    const testCases = [
      { name: 'bigint array: picks smallest', input: [3n, 1n, 2n], expected: 1n },
      { name: 'single element array', input: [5n], expected: 5n },
      { name: 'negative bigints: picks most negative', input: [-1n, -3n, -2n], expected: -3n },
      { name: 'mixed bigint and number', input: [3, 1n, 2], expected: 1n },
      { name: 'numeric strings', input: ['3', '1', '2'], expected: 1n },
      { name: 'nulls skipped', input: [3n, null, 2n], expected: 2n },
      { name: 'set of bigints', input: new Set([3n, 1n, 2n]), expected: 1n },
      { name: 'map values', input: new Map([['a', 3n], ['b', 1n]]).values(), expected: 1n },
      { name: 'all non-coercibles return null', input: [null, undefined, {}, []], expected: null },
      { name: 'empty array returns null', input: [], expected: null },
    ]

    it.each(testCases)(
      '$name',
      ({ input, expected }) => {
        expect(TO_MIN_BIGINT_OR_NULL(input)).toBe(expected)
      }
    )
  }
)
