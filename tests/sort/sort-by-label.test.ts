import { describe, expect, it } from 'bun:test'
import { SORT_BY_LABEL } from '../../ts/sort/sort-by-label.util.js'

describe(
  'SORT_BY_LABEL',
  () => {
    const sortingTestCases = [
      {
        name: 'ascending order',
        items: [
          { label: 'zebra', value: 1 },
          { label: 'apple', value: 2 },
          { label: 'banana', value: 3 },
        ],
        expected: [
          { label: 'apple', value: 2 },
          { label: 'banana', value: 3 },
          { label: 'zebra', value: 1 },
        ],
      },
      {
        name: 'string labels',
        items: [
          { label: 'b', value: 1 },
          { label: 'a', value: 2 },
          { label: 'c', value: 3 },
        ],
        expected: [
          { label: 'a', value: 2 },
          { label: 'b', value: 1 },
          { label: 'c', value: 3 },
        ],
      },
      {
        name: 'numeric labels',
        items: [
          { label: 3, value: 'a' },
          { label: 1, value: 'b' },
          { label: 2, value: 'c' },
        ],
        expected: [
          { label: 1, value: 'b' },
          { label: 2, value: 'c' },
          { label: 3, value: 'a' },
        ],
      },
      {
        name: 'mixed types',
        items: [
          { label: 'b', value: 1 },
          { label: 1, value: 2 },
          { label: 'a', value: 3 },
        ],
        expected: [
          { label: 'b', value: 1 },
          { label: 1, value: 2 },
          { label: 'a', value: 3 },
        ],
      },
      {
        name: 'empty array',
        items: [],
        expected: [],
      },
      {
        name: 'single item',
        items: [{ label: 'test', value: 1 }],
        expected: [{ label: 'test', value: 1 }],
      },
    ]

    it.each(sortingTestCases)(
      'should sort objects by label $name',
      ({ name, items, expected }) => {
        const sorted = [...items].sort(SORT_BY_LABEL)
        expect(sorted).toEqual(expected)
      }
    )

    it(
      'should be a function',
      () => {
        expect(typeof SORT_BY_LABEL).toBe('function')
      }
    )
  }
)
