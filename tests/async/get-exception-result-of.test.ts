import { describe, expect, it } from 'bun:test'
import { GET_EXCEPTION_RESULT_OF } from '../../ts/async/get-exception-result-of.util.js'

describe(
  'GET_EXCEPTION_RESULT_OF',
  () => {
    it.each<{ name: string, input: () => Promise<unknown>, expected: unknown }>([
      { name: 'a successful promise', input: () => Promise.resolve('success'), expected: 'success' },
      { name: 'a number', input: () => Promise.resolve(42), expected: 42 },
      { name: 'an object', input: () => Promise.resolve({ key: 'value' }), expected: { key: 'value' } },
      { name: 'null', input: () => Promise.resolve(null), expected: null },
      { name: 'undefined', input: () => Promise.resolve(undefined), expected: undefined },
      {
        name: 'an async operation that resolves',
        input: () => new Promise(
          resolve => {
            setTimeout(() => {
              resolve('delayed success')
            }, 10)
          }
        ),
        expected: 'delayed success',
      },
    ])(
      'should return result and undefined exception for $name',
      async ({ input, expected }) => {
        expect(await GET_EXCEPTION_RESULT_OF(input())).toStrictEqual({ exception: undefined, result: expected })
      }
    )

    it.each<{ name: string, error: Error, input: (inError: Error) => Promise<unknown> }>([
      { name: 'a rejected promise', error: new Error('test error'), input: inError => Promise.reject(inError) },
      { name: 'an Error built from a string message', error: new Error('string error'), input: inError => Promise.reject(inError) },
      { name: 'an Error object', error: new Error('object error'), input: inError => Promise.reject(inError) },
      {
        name: 'an async operation that rejects',
        error: new Error('delayed error'),
        input: inError => new Promise(
          // eslint-disable-next-line max-params -- mirrors the Promise executor (resolve, reject) signature
          (resolve, reject) => {
            setTimeout(() => {
              reject(inError)
            }, 10)
          }
        ),
      },
    ])(
      'should return exception and undefined result for $name',
      async ({ error, input }) => {
        const result = await GET_EXCEPTION_RESULT_OF(input(error))

        expect(result.exception).toBe(error)
        expect(result).toStrictEqual({ exception: error, result: undefined })
      }
    )

    it(
      'should work with generic types',
      async () => {
        const result = await GET_EXCEPTION_RESULT_OF<string, number>(Promise.resolve(42))
        expect(result).toStrictEqual({ exception: undefined, result: 42 })
      }
    )
  }
)
