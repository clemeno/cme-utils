import { describe, expect, it } from 'bun:test'
import { TRIM_OBJECT } from '../../ts/object/trim-object.util.js'

describe(
  'TRIM_OBJECT',
  () => {
    const removeNullUndefinedTestCases: Array<{ name: string, input: unknown, expected: { a: number, d: string, e: number, f: boolean } }> = [
      {
        name: 'null and undefined properties',
        input: {
          a: 1,
          b: null,
          c: undefined,
          d: 'string',
          e: 0,
          f: false,
        },
        expected: {
          a: 1,
          d: 'string',
          e: 0,
          f: false,
        },
      },
    ]

    it.each(removeNullUndefinedTestCases)(
      'should remove $name',
      ({ input, expected }) => {
        const result = TRIM_OBJECT({ object: input })
        expect(result).toEqual(expected)
      }
    )

    const nestedObjectsTestCases: Array<{ name: string, input: unknown, expected: unknown }> = [
      {
        name: 'nested objects recursively',
        input: {
          a: 1,
          nested: {
            b: 2,
            c: null,
            deep: {
              d: 3,
              e: undefined,
              f: 'keep',
            },
          },
          array: [1, null, 3, undefined],
        },
        expected: {
          a: 1,
          nested: {
            b: 2,
            deep: {
              d: 3,
              f: 'keep',
            },
          },
          array: [{}, {}, {}, {}], // Primitives become empty objects
        },
      },
    ]

    it.each(nestedObjectsTestCases)(
      'should handle $name',
      ({ input, expected }) => {
        const result = TRIM_OBJECT({ object: input })
        expect(result).toEqual(expected)
      }
    )

    const arraysTestCases: Array<{ name: string, input: unknown, expected: unknown }> = [
      {
        name: 'arrays by trimming each element',
        input: {
          array: [
            { a: 1, b: null },
            { c: 2, d: undefined },
            null,
            undefined,
          ],
        },
        expected: {
          array: [
            { a: 1 },
            { c: 2 },
            {},
            {},
          ],
        },
      },
    ]

    it.each(arraysTestCases)(
      'should handle $name',
      ({ input, expected }) => {
        const result = TRIM_OBJECT({ object: input })
        expect(result).toEqual(expected)
      }
    )

    const depthLimitTestCases: Array<{ name: string, input: unknown, options: { depth: number }, expected: { level1: { a: number, level2: Record<string, never> } } }> = [
      {
        name: 'depth limit',
        input: {
          level1: {
            a: 1,
            level2: {
              b: 2,
              level3: {
                c: 3,
                d: null,
              },
            },
          },
        },
        options: { depth: 2 },
        expected: {
          level1: {
            a: 1,
            level2: {}, // Depth limit reached for level2
          },
        },
      },
    ]

    it.each(depthLimitTestCases)(
      'should respect $name',
      ({ input, options, expected }) => {
        const result = TRIM_OBJECT({ object: input, ...options })
        expect(result).toEqual(expected)
      }
    )

    const emptyObjectsTestCases: Array<{ name: string, input: Record<string, never>, expected: Record<string, never> }> = [
      { name: 'empty objects', input: {}, expected: {} },
    ]

    it.each(emptyObjectsTestCases)(
      'should handle $name',
      ({ input, expected }) => {
        const result = TRIM_OBJECT({ object: input })
        expect(result).toEqual(expected)
      }
    )

    const nullUndefinedInputTestCases: Array<{ name: string, input: null | undefined, expected: Record<string, never> }> = [
      { name: 'null input', input: null, expected: {} },
      { name: 'undefined input', input: undefined, expected: {} },
    ]

    it.each(nullUndefinedInputTestCases)(
      'should handle $name',
      ({ input, expected }) => {
        const result = TRIM_OBJECT({ object: input })
        expect(result).toEqual(expected)
      }
    )

    const primitiveValuesTestCases: Array<{ name: string, input: string, expected: unknown }> = [
      {
        name: 'primitive values',
        input: 'string',
        expected: {
          0: 's',
          1: 't',
          2: 'r',
          3: 'i',
          4: 'n',
          5: 'g',
        },
      },
    ]

    it.each(primitiveValuesTestCases)(
      'should handle $name',
      ({ input, expected }) => {
        const result = TRIM_OBJECT({ object: input })
        expect(result).toEqual(expected)
      }
    )

    const newInstanceTestCases: Array<{ name: string, input: { a: number, b: null }, expected: { a: number } }> = [
      {
        name: 'create a new object instance',
        input: { a: 1, b: null },
        expected: { a: 1 },
      },
    ]

    it.each(newInstanceTestCases)(
      'should $name',
      ({ input, expected }) => {
        const result = TRIM_OBJECT({ object: input })
        expect(result).not.toBe(input)
        expect(result).toEqual(expected)
      }
    )

    const unlimitedDepthTestCases: Array<{ name: string, input: { a: { b: { c: { d: number, e: null } } } }, expected: { a: { b: { c: { d: number } } } } }> = [
      {
        name: 'default to unlimited depth',
        input: {
          a: {
            b: {
              c: {
                d: 1,
                e: null,
              },
            },
          },
        },
        expected: {
          a: {
            b: {
              c: {
                d: 1,
              },
            },
          },
        },
      },
    ]

    it.each(unlimitedDepthTestCases)(
      'should $name',
      ({ input, expected }) => {
        const result = TRIM_OBJECT({ object: input })
        expect(result).toEqual(expected)
      }
    )
  }
)
