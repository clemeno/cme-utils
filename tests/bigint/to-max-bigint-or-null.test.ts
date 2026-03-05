import { describe, expect, it } from 'bun:test'
import { TO_MAX_BIGINT_OR_NULL } from '../../ts/bigint/to-max-bigint-or-null.util.js'

describe(
  'TO_MAX_BIGINT_OR_NULL',
  () => {
    const testCases = [
      { name: 'bigint array: picks largest', input: [3n, 1n, 2n], expected: 3n },
      { name: 'single element array', input: [5n], expected: 5n },
      { name: 'negative bigints: picks least negative', input: [-1n, -3n, -2n], expected: -1n },
      { name: 'mixed bigint and number', input: [1, 3n, 2], expected: 3n },
      { name: 'numeric strings', input: ['1', '3', '2'], expected: 3n },
      { name: 'nulls skipped', input: [3n, null, 2n], expected: 3n },
      { name: 'set of bigints', input: new Set([1n, 3n, 2n]), expected: 3n },
      { name: 'map values', input: new Map([['a', 1n], ['b', 3n]]).values(), expected: 3n },
      { name: 'all non-coercibles return null', input: [null, undefined, {}, []], expected: null },
      { name: 'empty array returns null', input: [], expected: null },
    ]

    it.each(testCases)(
      '$name',
      ({ input, expected }) => {
        expect(TO_MAX_BIGINT_OR_NULL(input)).toBe(expected)
      }
    )
  }
)
