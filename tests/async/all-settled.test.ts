import { describe, expect, it } from 'bun:test'
import { ALL_SETTLED } from '../../ts/async/all-settled.util.js'

describe(
  'ALL_SETTLED',
  () => {
    it.each<{ name: string, input: () => Array<Promise<unknown>>, expected: { fulfilled: unknown[], rejected: Array<Error | undefined>, fulfilledSize: number, rejectedSize: number, size: number } }>([
      {
        name: 'should handle an empty array',
        input: () => [],
        expected: { fulfilled: [], rejected: [], fulfilledSize: 0, rejectedSize: 0, size: 0 },
      },
      {
        name: 'should handle all promises fulfilled',
        input: () => [
          Promise.resolve(1),
          Promise.resolve('hello'),
          Promise.resolve({ key: 'value' }),
        ],
        expected: { fulfilled: [1, 'hello', { key: 'value' }], rejected: [], fulfilledSize: 3, rejectedSize: 0, size: 3 },
      },
      {
        name: 'should handle all promises rejected',
        input: () => [
          Promise.reject(new Error('error1')),
          Promise.reject(new Error('error2')),
          Promise.reject(new Error('error3')),
        ],
        expected: {
          fulfilled: [],
          rejected: [new Error('error1'), new Error('error2'), new Error('error3')],
          fulfilledSize: 0,
          rejectedSize: 3,
          size: 3,
        },
      },
      {
        name: 'should handle mix of fulfilled and rejected promises',
        input: () => [
          Promise.resolve(42),
          Promise.reject(new Error('fail')),
          Promise.resolve('success'),
          Promise.reject(new Error('test error')),
        ],
        expected: {
          fulfilled: [42, undefined, 'success'],
          rejected: [undefined, new Error('fail'), undefined, new Error('test error')],
          fulfilledSize: 2,
          rejectedSize: 2,
          size: 4,
        },
      },
      {
        name: 'should handle single promise that resolves',
        input: () => [Promise.resolve('single')],
        expected: { fulfilled: ['single'], rejected: [], fulfilledSize: 1, rejectedSize: 0, size: 1 },
      },
      {
        name: 'should handle single promise that rejects',
        input: () => [Promise.reject(new Error('single error'))],
        expected: { fulfilled: [], rejected: [new Error('single error')], fulfilledSize: 0, rejectedSize: 1, size: 1 },
      },
      {
        name: 'should handle promises that resolve with different types',
        input: () => [
          Promise.resolve(0),
          Promise.resolve(false),
          Promise.resolve(''),
          Promise.resolve(null),
          Promise.resolve(undefined),
        ],
        expected: { fulfilled: [0, false, '', null, undefined], rejected: [], fulfilledSize: 5, rejectedSize: 0, size: 5 },
      },
      {
        name: 'should handle promises that reject with different types',
        input: () => [
          Promise.reject(new Error('error0')),
          Promise.reject(new Error('error1')),
          Promise.reject(new Error('error2')),
          Promise.reject(new Error('error3')),
          Promise.reject(new Error('error4')),
        ],
        expected: {
          fulfilled: [],
          rejected: [new Error('error0'), new Error('error1'), new Error('error2'), new Error('error3'), new Error('error4')],
          fulfilledSize: 0,
          rejectedSize: 5,
          size: 5,
        },
      },
      {
        name: 'should handle large number of promises (even indexes fulfilled, odd rejected)',
        input: () => [...Array(20).keys()].map(inIndex => (inIndex % 2) === 0 ? Promise.resolve(inIndex) : Promise.reject(new Error(`error${inIndex}`))),
        expected: {
          fulfilled: [0, undefined, 2, undefined, 4, undefined, 6, undefined, 8, undefined, 10, undefined, 12, undefined, 14, undefined, 16, undefined, 18],
          rejected: [...Array(20).keys()].map(inIndex => (inIndex % 2) === 1 ? new Error(`error${inIndex}`) : undefined),
          fulfilledSize: 10,
          rejectedSize: 10,
          size: 20,
        },
      },
      {
        name: 'should preserve promise resolution order',
        input: () => [
          Promise.resolve('first'),
          Promise.resolve('second'),
          Promise.resolve('third'),
        ],
        expected: { fulfilled: ['first', 'second', 'third'], rejected: [], fulfilledSize: 3, rejectedSize: 0, size: 3 },
      },
      {
        name: 'should handle promises that resolve at different times',
        input: () => [
          new Promise(resolve => setTimeout(() => resolve('slow'), 10)),
          Promise.resolve('fast'),
          new Promise(resolve => setTimeout(() => resolve('medium'), 5)),
        ],
        expected: { fulfilled: ['slow', 'fast', 'medium'], rejected: [], fulfilledSize: 3, rejectedSize: 0, size: 3 },
      },
    ])(
      '$name',
      async ({ input, expected }) => {
        // toEqual reads array holes as undefined; it still fails if `rejected` is a plain object instead of an array
        expect(await ALL_SETTLED(input())).toEqual(expected)
      }
    )
  }
)
