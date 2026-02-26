import { describe, expect, it } from 'bun:test'
import { IDENTITY } from '../../ts/functional/identity.util.js'

/* eslint-disable max-params */

describe(
  'IDENTITY',
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
      ({ input, expected }) => {
        const result = IDENTITY(input)
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
        check: (result: unknown, input: symbol) => {
          expect(result).toBe(input)
          expect(typeof result).toBe('symbol')
          expect((result as symbol).description).toBe('test')
        },
      },
    ]

    it.each(symbolTestCases)(
      'should return $name unchanged',
      ({ input, check }) => {
        const result = IDENTITY(input)
        check(result, input)
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
      ({ input, expected }) => {
        const result = IDENTITY(input)
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
          quotes: '\'single\' and "double"',
        },
        check: (_: { result: unknown, input: unknown }) => expect(_.result).toEqual(_.input),
      },
    ]

    it.each(complexObjectTestCases)(
      'should handle $name',
      ({ input, check }) => {
        const result = IDENTITY(input)
        check({ result, input })
      }
    )

    const functionTestCases = [
      {
        name: 'functions',
        input: () => 'test function',
        check: (result: unknown, input: () => string) => {
          expect(result).toBe(input)
          expect(typeof result).toBe('function')
          expect((result as () => string)()).toBe('test function')
        },
      },
      {
        name: 'generator functions',
        input: (function * generator () {
          yield 1
          yield 2
        }()),
        check: (result: unknown) => {
          expect(typeof result).toBe('object')
          expect(typeof (result as any).next).toBe('function')
          // Iterate to cover the yield lines
          const first = (result as Generator).next()
          expect(first.value).toBe(1)
          const second = (result as Generator).next()
          expect(second.value).toBe(2)
        },
      },
      {
        name: 'async generator functions',
        input: (async function * asyncGenerator () {
          yield 1
          yield 2
        }()),
        check: async (result: unknown) => {
          expect(typeof result).toBe('object')
          // Iterate to cover the yield lines
          const first = await (result as AsyncGenerator).next()
          expect(first.value).toBe(1)
          const second = await (result as AsyncGenerator).next()
          expect(second.value).toBe(2)
        },
      },
    ]

    it.each(functionTestCases)(
      'should handle $name',
      async ({ input, check }) => {
        const result = IDENTITY(input)
        expect(result).toBe(input)
        await check(result, input as any)
      }
    )

    const weakCollectionTestCases = [
      {
        name: 'WeakMap and WeakSet',
        inputs: [
          (() => {
            const weakMap = new WeakMap()
            const key = {}
            weakMap.set(key, 'value')
            return weakMap
          })(),
          (() => {
            const weakSet = new WeakSet()
            const key = {}
            weakSet.add(key)
            return weakSet
          })(),
        ],
        expectedTypes: [WeakMap, WeakSet],
      },
    ]

    it.each(weakCollectionTestCases)(
      'should handle $name',
      ({ inputs, expectedTypes }) => {
        inputs.forEach((input, index) => {
          const result = IDENTITY(input)
          expect(result).toBe(input)
          expect(result).toBeInstanceOf(expectedTypes[index])
        })
      }
    )

    const primitiveWrapperTestCases = [
      {
        name: 'primitive wrapper objects',
        inputs: [
          Object('hello'), // Alternative to new String()
          Object(42), // Alternative to new Number()
          Object(true), // Alternative to new Boolean()
        ],
        check: (results: unknown[]) => {
          results.forEach((result, index) => {
            expect(result).toBe(results[index])
            expect(typeof result).toBe('object')
          })
        },
      },
    ]

    it.each(primitiveWrapperTestCases)(
      'should handle $name',
      ({ inputs, check }) => {
        const results = inputs.map(input => IDENTITY(input))
        check(results)
      }
    )

    const proxyTestCases = [
      {
        name: 'Proxy objects',
        input: (() => {
          const target = { value: 42 }
          return new Proxy(target, {
            get (target, prop) {
              return prop === 'value' ? (target as any)[prop] * 2 : (target as any)[prop]
            },
          })
        })(),
        check: (result: unknown) => {
          // Verify proxy behavior is preserved
          expect((result as any).value).toBe(84) // Proxy doubles the value
        },
      },
    ]

    it.each(proxyTestCases)(
      'should handle $name',
      ({ input, check }) => {
        const result = IDENTITY(input)
        expect(result).toBe(input)
        check(result)
      }
    )

    const typedArrayTestCases = [
      {
        name: 'Int8Array and other typed arrays',
        inputs: [
          new Int8Array([1, 2, 3]),
          new Uint16Array([1, 2, 3]),
          new Float32Array([1.1, 2.2, 3.3]),
        ],
        expectedTypes: [Int8Array, Uint16Array, Float32Array],
      },
      {
        name: 'DataView',
        inputs: [
          (() => {
            const buffer = new ArrayBuffer(8)
            const dataView = new DataView(buffer)
            dataView.setUint32(0, 42)
            return dataView
          })(),
        ],
        expectedTypes: [DataView],
        check: (result: unknown) => {
          expect((result as DataView).getUint32(0)).toBe(42)
        },
      },
    ]

    it.each(typedArrayTestCases)(
      'should handle $name',
      ({ inputs, expectedTypes, check }) => {
        inputs.forEach((input, index) => {
          const result = IDENTITY(input)
          expect(result).toBe(input)
          expect(result).toBeInstanceOf(expectedTypes[index])
        })
        if (check != null) {
          check(IDENTITY(inputs[0]))
        }
      }
    )

    const promiseTestCases = [
      {
        name: 'Promise objects',
        input: Promise.resolve('test'),
        expectedType: Promise,
      },
    ]

    it.each(promiseTestCases)(
      'should handle $name',
      ({ input, expectedType }) => {
        const result = IDENTITY(input)
        expect(result).toBe(input)
        expect(result).toBeInstanceOf(expectedType)
      }
    )

    const classInstanceTestCases = [
      {
        name: 'class instances',
        input: (() => {
          class TestClass {
            constructor (public value: string) {}
          }
          return new TestClass('test')
        })(),
        check: (result: unknown) => {
          expect((result as any).value).toBe('test')
          expect(result).toBeInstanceOf((result as any).constructor)
        },
      },
    ]

    it.each(classInstanceTestCases)(
      'should handle $name',
      ({ input, check }) => {
        const result = IDENTITY(input)
        expect(result).toBe(input)
        check(result)
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
      ({ input, check }) => {
        const result = IDENTITY(input)
        expect(result).toBe(input)
        check(result)
      }
    )

    const arrayTestCases = [
      { name: 'mixed array', input: [1, 'two', { three: 3 }], expected: [1, 'two', { three: 3 }] },
      { name: 'array with primitives', input: [42, 'hello', true, null, undefined], expected: [42, 'hello', true, null, undefined] },
      { name: 'nested arrays', input: [[1, 2], [3, 4, [5, 6]]], expected: [[1, 2], [3, 4, [5, 6]]] },
      { name: 'array with objects', input: [{ a: 1 }, { b: 2 }], expected: [{ a: 1 }, { b: 2 }] },
    ]

    it.each(arrayTestCases)(
      'should handle $name',
      ({ input, expected }) => {
        const result = IDENTITY(input)
        expect(result).toBe(input)
        expect(result).toEqual(expected)
      }
    )
  }
)
