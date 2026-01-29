import { describe, expect, it } from 'bun:test'
import { ASYNC_IDENTITY } from '../../ts/functional/async-identity.util.js'

describe(
  'ASYNC_IDENTITY',
  () => {
    const primitiveTestCases = [
      { name: 'number', input: 42, expected: 42 },
      { name: 'zero', input: 0, expected: 0 },
      { name: 'negative number', input: -42, expected: -42 },
      { name: 'float', input: 3.14, expected: 3.14 },
      { name: 'NaN', input: NaN, expected: NaN },
      { name: 'Infinity', input: Infinity, expected: Infinity },
      { name: 'negative Infinity', input: -Infinity, expected: -Infinity },
      { name: 'string', input: 'hello', expected: 'hello' },
      { name: 'empty string', input: '', expected: '' },
      { name: 'boolean true', input: true, expected: true },
      { name: 'boolean false', input: false, expected: false },
      { name: 'null', input: null, expected: null },
      { name: 'undefined', input: undefined, expected: undefined },
      { name: 'BigInt', input: 123n, expected: 123n },
    ]

    it.each(primitiveTestCases)(
      'should return the $name input value unchanged',
      async ({ input, expected }) => {
        const result = await ASYNC_IDENTITY(input)
        if (expected === null) {
          expect(result).toBeNull()
        } else if (expected === undefined) {
          expect(result).toBeUndefined()
        } else if (Number.isNaN(expected)) {
          expect(result).toBeNaN()
        } else if (typeof expected === 'bigint') {
          expect(result).toBe(expected)
        } else {
          expect(result).toBe(expected)
        }
      }
    )

    const symbolTestCases = [
      {
        name: 'Symbol input value',
        input: Symbol('test'),
        // eslint-disable-next-line max-params
        check: async (result: unknown, input: symbol) => {
          expect(result).toBe(input)
          expect(typeof result).toBe('symbol')
          expect((result as symbol).description).toBe('test')
        },
      },
    ]

    it.each(symbolTestCases)(
      'should return $name unchanged',
      async ({ input, check }) => {
        const result = await ASYNC_IDENTITY(input)
        await check(result, input)
      }
    )

    const objectTestCases = [
      { name: 'object', input: { key: 'value' }, expected: { key: 'value' } },
      { name: 'empty object', input: {}, expected: {} },
      { name: 'array', input: [1, 2, 3], expected: [1, 2, 3] },
      { name: 'empty array', input: [], expected: [] },
      { name: 'Date object', input: new Date('2023-01-01'), expected: new Date('2023-01-01') },
      { name: 'RegExp object', input: /test/gi, expected: /test/gi },
      { name: 'Map object', input: new Map([['key', 'value']]), expected: new Map([['key', 'value']]) },
      { name: 'Set object', input: new Set([1, 2, 3]), expected: new Set([1, 2, 3]) },
      { name: 'empty Map', input: new Map(), expected: new Map() },
      { name: 'empty Set', input: new Set(), expected: new Set() },
      { name: 'Error object', input: new Error('test error'), expected: new Error('test error') },
      { name: 'Uint8Array', input: new Uint8Array([1, 2, 3]), expected: new Uint8Array([1, 2, 3]) },
    ]

    it.each(objectTestCases)(
      'should return the $name input value unchanged',
      async ({ input, expected }) => {
        const result = await ASYNC_IDENTITY(input)
        if (expected instanceof Date) {
          expect(result).toEqual(expected)
          expect(result).toBeInstanceOf(Date)
        } else if (expected instanceof RegExp) {
          expect(result).toEqual(expected)
          expect(result).toBeInstanceOf(RegExp)
        } else if (expected instanceof Map) {
          expect(result).toEqual(expected)
          expect(result).toBeInstanceOf(Map)
        } else if (expected instanceof Set) {
          expect(result).toEqual(expected)
          expect(result).toBeInstanceOf(Set)
        } else if (expected instanceof Uint8Array) {
          expect(result).toEqual(expected)
          expect(result).toBeInstanceOf(Uint8Array)
        } else if (expected instanceof Error) {
          expect(result).toEqual(expected)
          expect(result).toBeInstanceOf(Error)
        } else {
          expect(result).toEqual(expected)
        }
      }
    )

    const promiseTestCases = [
      {
        name: 'a Promise',
        input: 'test',
        check: (result: unknown) => {
          expect(result).toBeInstanceOf(Promise)
        },
        bAwaitResult: false,
      },
      {
        name: 'be awaitable',
        input: 'test',
        // eslint-disable-next-line max-params
        check: async (result: unknown, input: string) => {
          expect(result).toBe(input)
        },
        bAwaitResult: true,
      },
    ]

    it.each(promiseTestCases)(
      'should $name',
      async ({ input, check, bAwaitResult }) => {
        const result = ASYNC_IDENTITY(input)
        if (bAwaitResult) {
          await check(await result, input)
        } else {
          ;(check as (result: unknown) => void)(result)
        }
      }
    )

    const complexObjectTestCases = [
      {
        name: 'complex objects reference equality',
        input: {
          nested: {
            array: [1, 2, 3],
            func: () => 'test',
          },
          symbol: Symbol('test'),
        },
        check: (_: { result: unknown, input: unknown }) => expect(_.result).toBe(_.input),
      },
      {
        name: 'complex objects nested array',
        input: {
          nested: {
            array: [1, 2, 3],
            func: () => 'test',
          },
          symbol: Symbol('test'),
        },
        check: (_: { result: unknown }) => expect((_.result as any).nested.array).toEqual([1, 2, 3]),
      },
      {
        name: 'nested objects with mixed types',
        input: {
          string: 'hello',
          number: 42,
          boolean: true,
          null: null,
          undefined,
          array: [1, 'two', true, null],
          nested: {
            deep: {
              value: 'deep value',
              array: [1, 2, { nested: 'object' }],
            },
          },
        },
        check: (_: { result: unknown, input: unknown }) => expect(_.result).toEqual(_.input),
      },
      {
        name: 'object with special characters',
        input: {
          unicode: '🚀 🌟 ✨',
          special: 'a\tb\nc\r',
          quotes: '"single\' and "double"',
        },
        check: (_: { result: unknown, input: unknown }) => expect(_.result).toEqual(_.input),
      },
    ]

    it.each(complexObjectTestCases)(
      'should handle $name',
      async ({ input, check }) => {
        const result = await ASYNC_IDENTITY(input)
        check({ result, input })
      }
    )

    const functionTestCases = [
      {
        name: 'functions',
        input: () => 'test function',
        // eslint-disable-next-line max-params
        check: (result: unknown, input: () => string) => {
          expect(result).toBe(input)
          expect(typeof result).toBe('function')
          expect((result as () => string)()).toBe('test function')
        },
      },
    ]

    it.each(functionTestCases)(
      'should handle $name',
      async ({ input, check }) => {
        const result = await ASYNC_IDENTITY(input)
        check(result, input)
      }
    )

    const circularReferenceTestCases = [
      {
        name: 'circular references',
        input: (() => {
          const obj: Record<string, unknown> = { a: 1 }
          obj.self = obj
          return obj
        })(),
        check: (result: unknown) => {
          expect((result as any).self).toBe(result)
        },
      },
    ]

    it.each(circularReferenceTestCases)(
      'should handle $name',
      async ({ input, check }) => {
        const result = await ASYNC_IDENTITY(input)
        expect(result).toBe(input)
        check(result)
      }
    )
  }
)
