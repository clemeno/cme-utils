import { describe, expect, it } from 'bun:test'
import { GET_EXCEPTION_ONLY } from '../../ts/async/get-exception-only.util.js'

describe(
  'GET_EXCEPTION_ONLY',
  () => {
    it.each<{ name: string, input: () => Promise<unknown> }>([
      { name: 'successful promise', input: async () => await Promise.resolve('success') },
      { name: 'promise resolving a number', input: async () => await Promise.resolve(42) },
      { name: 'promise resolving an object', input: async () => await Promise.resolve({ key: 'value' }) },
      { name: 'promise resolving null', input: async () => await Promise.resolve(null) },
      {
        name: 'delayed async operation',
        input: async () => await new Promise(resolve => {
          setTimeout(() => resolve('delayed success'), 10)
        }),
      },
    ])(
      'should return undefined exception for $name',
      async ({ input }) => {
        expect(await GET_EXCEPTION_ONLY(input())).toStrictEqual({ exception: undefined })
      }
    )

    it.each<{ name: string, input: unknown }>([
      { name: 'an Error', input: new Error('test error') },
      { name: 'an Error with a string message', input: new Error('string error') },
      { name: 'an Error object', input: new Error('object error') },
      { name: 'a non-Error string reason', input: 'string reason' },
      { name: 'a non-Error object reason', input: { code: 'E_REASON' } },
    ])(
      'should return the exact rejection reason as exception for $name',
      async ({ input }) => {
        const result = await GET_EXCEPTION_ONLY(Promise.reject(input))
        expect(result).toStrictEqual({ exception: input })
        expect(result.exception).toBe(input)
      }
    )
  }
)
