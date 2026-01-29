import { describe, expect, it } from 'bun:test'
import { SORT_OBJECTS } from '../../ts/sort/sort-objects.util.js'

describe(
  'SORT_OBJECTS',
  () => {
    const sortingTestCases = [
      {
        name: 'ascending order by name',
        options: { on: (x: any) => x.name },
        items: [
          { name: 'zebra', value: 1 },
          { name: 'apple', value: 2 },
          { name: 'banana', value: 3 },
        ],
        expected: [
          { name: 'apple', value: 2 },
          { name: 'banana', value: 3 },
          { name: 'zebra', value: 1 },
        ],
      },
      {
        name: 'descending order by name',
        options: { on: (x: any) => x.name, order: 'desc' },
        items: [
          { name: 'apple', value: 1 },
          { name: 'zebra', value: 2 },
          { name: 'banana', value: 3 },
        ],
        expected: [
          { name: 'zebra', value: 2 },
          { name: 'banana', value: 3 },
          { name: 'apple', value: 1 },
        ],
      },
      {
        name: 'numeric ascending',
        options: { on: (x: any) => x.value, bPureNumeric: true },
        items: [
          { value: 3 },
          { value: 1 },
          { value: 2 },
        ],
        expected: [
          { value: 1 },
          { value: 2 },
          { value: 3 },
        ],
      },
      {
        name: 'numeric descending',
        options: { on: (x: any) => x.value, order: 'desc', bPureNumeric: true },
        items: [
          { value: 1 },
          { value: 3 },
          { value: 2 },
        ],
        expected: [
          { value: 3 },
          { value: 2 },
          { value: 1 },
        ],
      },
      {
        name: 'mixed numeric and string ascending',
        options: { on: (x: any) => x.value },
        items: [
          { value: '10' },
          { value: 2 },
          { value: '3' },
        ],
        expected: [
          { value: 2 },
          { value: '3' },
          { value: '10' },
        ],
      },
      {
        name: 'mixed numeric and string descending',
        options: { on: (x: any) => x.value, order: 'desc' },
        items: [
          { value: '10' },
          { value: 2 },
          { value: '3' },
        ],
        expected: [
          { value: '10' },
          { value: '3' },
          { value: 2 },
        ],
      },
      {
        name: 'equal values',
        options: { on: (x: any) => x.value, bPureNumeric: true },
        items: [
          { value: 1 },
          { value: 1 },
          { value: 2 },
        ],
        expected: [
          { value: 1 },
          { value: 1 },
          { value: 2 },
        ],
      },
      {
        name: 'empty array',
        options: { on: (x: any) => x.value },
        items: [],
        expected: [],
      },
      {
        name: 'null and undefined values',
        options: { on: (x: any) => x.value },
        items: [
          { value: null },
          { value: undefined },
          { value: 'a' },
          { value: null },
        ],
        expected: [
          { value: null },
          { value: undefined },
          { value: 'a' },
          { value: null },
        ],
      },
      {
        name: 'case sensitivity',
        options: { on: (x: any) => x.name },
        items: [
          { name: 'Apple' },
          { name: 'banana' },
          { name: 'Cherry' },
          { name: 'apple' },
        ],
        expected: [
          { name: 'Apple' },
          { name: 'Cherry' },
          { name: 'apple' },
          { name: 'banana' },
        ],
      },
      {
        name: 'unicode characters',
        options: { on: (x: any) => x.value },
        items: [
          { value: 'zebra' },
          { value: 'café' },
          { value: ' naïve' },
          { value: 'apple' },
        ],
        expected: [
          { value: ' naïve' },
          { value: 'apple' },
          { value: 'café' },
          { value: 'zebra' },
        ],
      },
      {
        name: 'negative numbers',
        options: { on: (x: any) => x.value, bPureNumeric: true },
        items: [
          { value: -5 },
          { value: 10 },
          { value: -1 },
          { value: 0 },
        ],
        expected: [
          { value: -5 },
          { value: -1 },
          { value: 0 },
          { value: 10 },
        ],
      },
      {
        name: 'floating point numbers',
        options: { on: (x: any) => x.value, bPureNumeric: true },
        items: [
          { value: 1.5 },
          { value: 1.2 },
          { value: 2.1 },
          { value: 1.8 },
        ],
        expected: [
          { value: 1.2 },
          { value: 1.5 },
          { value: 1.8 },
          { value: 2.1 },
        ],
      },
      {
        name: 'boolean values',
        options: { on: (x: any) => x.flag },
        items: [
          { flag: true },
          { flag: false },
          { flag: true },
          { flag: false },
        ],
        expected: [
          { flag: false },
          { flag: false },
          { flag: true },
          { flag: true },
        ],
      },
      {
        name: 'empty strings and whitespace',
        options: { on: (x: any) => x.text },
        items: [
          { text: '  ' },
          { text: '' },
          { text: 'hello' },
          { text: ' ' },
        ],
        expected: [
          { text: '' },
          { text: ' ' },
          { text: '  ' },
          { text: 'hello' },
        ],
      },
      {
        name: 'mixed types with numbers and booleans',
        options: { on: (x: any) => x.value },
        items: [
          { value: true },
          { value: 2 },
          { value: false },
          { value: 1 },
        ],
        expected: [
          { value: false },
          { value: true },
          { value: 1 },
          { value: 2 },
        ],
      },
      {
        name: 'large numbers',
        options: { on: (x: any) => x.value, bPureNumeric: true },
        items: [
          { value: 1000000 },
          { value: 1 },
          { value: 1000000000 },
          { value: 100 },
        ],
        expected: [
          { value: 1 },
          { value: 100 },
          { value: 1000000 },
          { value: 1000000000 },
        ],
      },
      {
        name: 'date objects',
        options: { on: (x: any) => x.date },
        items: [
          { date: new Date('2023-01-03') },
          { date: new Date('2023-01-01') },
          { date: new Date('2023-01-02') },
        ],
        expected: [
          { date: new Date('2023-01-01') },
          { date: new Date('2023-01-02') },
          { date: new Date('2023-01-03') },
        ],
      },
      {
        name: 'array values',
        options: { on: (x: any) => x.items },
        items: [
          { items: [3, 1] },
          { items: [1, 2] },
          { items: [2, 3] },
        ],
        expected: [
          { items: [1, 2] },
          { items: [2, 3] },
          { items: [3, 1] },
        ],
      },
      {
        name: 'object values',
        options: { on: (x: any) => x.data },
        items: [
          { data: { b: 2 } },
          { data: { a: 1 } },
          { data: { c: 3 } },
        ],
        expected: [
          { data: { b: 2 } },
          { data: { a: 1 } },
          { data: { c: 3 } },
        ],
      },
    ]

    it.each(sortingTestCases)(
      'should sort objects $name',
      ({ name, options, items, expected }) => {
        const sorted = [...items].sort(SORT_OBJECTS(options))
        expect(sorted).toEqual(expected)
      }
    )

    it(
      'should return a function',
      () => {
        const sorter = SORT_OBJECTS({ on: x => x.value })
        expect(typeof sorter).toBe('function')
      }
    )

    const descendingStringTestCases = [
      { name: 'a vs b (desc)', a: { name: 'a' }, b: { name: 'b' }, expected: 1 },
      { name: 'b vs a (desc)', a: { name: 'b' }, b: { name: 'a' }, expected: -1 },
      { name: 'a vs a (desc)', a: { name: 'a' }, b: { name: 'a' }, expected: 0 },
    ]

    it.each(descendingStringTestCases)(
      'should handle descending order with direct function call - $name',
      ({ a, b, expected }) => {
        const sorter = SORT_OBJECTS({ on: (x: { name: string }) => x.name, order: 'desc' })
        expect(sorter(a, b)).toBe(expected)
      }
    )

    const descendingNumericTestCases = [
      { name: '1 vs 2 (desc)', a: { value: 1 }, b: { value: 2 }, expected: 1 },
      { name: '2 vs 1 (desc)', a: { value: 2 }, b: { value: 1 }, expected: -1 },
      { name: '1 vs 1 (desc)', a: { value: 1 }, b: { value: 1 }, expected: 0 },
    ]

    it.each(descendingNumericTestCases)(
      'should handle pure numeric descending order with direct function call - $name',
      ({ a, b, expected }) => {
        const sorter = SORT_OBJECTS({ on: (x: { value: number }) => x.value, order: 'desc', bPureNumeric: true })
        expect(sorter(a, b)).toBe(expected)
      }
    )
  }
)
