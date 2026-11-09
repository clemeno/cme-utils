import { describe, expect, it } from 'bun:test'
import { ASYNC_IDENTITY } from '../../ts/functional/async-identity.util.js'

describe(
  'ASYNC_IDENTITY',
  () => {
    const primitiveTestCases: Array<{ name: string, input: number | string | null | undefined | bigint | boolean, expected: number | string | null | undefined | bigint | boolean }> = [
      { name: 'number', input: 42, expected: 42 },
      { name: 'zero', input: 0, expected: 0 },
      { name: 'negative number', input: -42, expected: -42 },
      { name: 'float', input: 3.14, expected: 3.14 },
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
        expect(await ASYNC_IDENTITY(input)).toBe(expected)
      }
    )

    const nanTestCases: Array<{ name: string, input: number }> = [
      { name: 'NaN', input: NaN },
    ]

    it.each(nanTestCases)(
      'should return the $name input value unchanged',
      async ({ input }) => {
        expect(await ASYNC_IDENTITY(input)).toBeNaN()
      }
    )

    const symbolTestCases: Array<{ name: string, input: symbol, check: (_: { result: unknown, input: symbol }) => void }> = [
      {
        name: 'Symbol input value',
        input: Symbol('test'),
        check: (_: { result: unknown, input: symbol }) => {
          expect(_.result).toBe(_.input)
          expect(typeof _.result).toBe('symbol')
          expect((_.result as symbol).description).toBe('test')
        },
      },
    ]

    it.each(symbolTestCases)(
      'should return $name unchanged',
      async ({ input, check }) => {
        const result = await ASYNC_IDENTITY(input)
        check({ result, input })
      }
    )

    const objectTestCases: Array<{ name: string, input: unknown, expected: unknown }> = [
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
        expect(result).toBe(input)
        expect(result).toEqual(expected)
      }
    )

    const promiseTestCases: Array<{ name: string, input: string }> = [
      { name: 'return a Promise', input: 'test' },
    ]

    it.each(promiseTestCases)(
      'should $name',
      ({ input }) => {
        expect(ASYNC_IDENTITY(input)).toBeInstanceOf(Promise)
      }
    )

    const awaitTestCases: Array<{ name: string, input: string }> = [
      { name: 'be awaitable', input: 'test' },
    ]

    it.each(awaitTestCases)(
      'should $name',
      async ({ input }) => {
        expect(await ASYNC_IDENTITY(input)).toBe(input)
      }
    )

    const complexObjectTestCases: Array<{ name: string, input: unknown, check: (_: { result: unknown, input: unknown }) => void }> = [
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

    const functionTestCases: Array<{ name: string, input: () => string, check: (_: { result: unknown, input: () => string }) => void }> = [
      {
        name: 'functions',
        input: () => 'test function',
        check: (_: { result: unknown, input: () => string }) => {
          expect(_.result).toBe(_.input)
          expect(typeof _.result).toBe('function')
          expect((_.result as () => string)()).toBe('test function')
        },
      },
    ]

    it.each(functionTestCases)(
      'should handle $name',
      async ({ input, check }) => {
        const result = await ASYNC_IDENTITY(input)
        check({ result, input })
      }
    )

    const circularReferenceTestCases: Array<{ name: string, input: Record<string, unknown>, check: (result: unknown) => void }> = [
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
