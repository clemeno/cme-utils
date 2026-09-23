import { describe, expect, it } from 'bun:test'
import { THROW_IF_ERROR } from '../../ts/async/throw-if-error.util.js'
import type { AppExceptionResult } from '../../ts/app-exception-result.js'

describe(
  'THROW_IF_ERROR',
  () => {
    it.each<{ name: string, input: AppExceptionResult, toRequest: (inInput: AppExceptionResult) => Promise<AppExceptionResult> }>([
      { name: 'no exception exists', input: { exception: undefined, result: 'success' }, toRequest: inInput => Promise.resolve(inInput) },
      { name: 'the result is a number', input: { exception: undefined, result: 42 }, toRequest: inInput => Promise.resolve(inInput) },
      { name: 'the result is an object', input: { exception: undefined, result: { key: 'value' } }, toRequest: inInput => Promise.resolve(inInput) },
      { name: 'the result is null', input: { exception: undefined, result: null }, toRequest: inInput => Promise.resolve(inInput) },
      {
        name: 'the input promise resolves asynchronously',
        input: { exception: undefined, result: 'async success' },
        toRequest: inInput => new Promise(resolve => {
          setTimeout(() => resolve(inInput), 10)
        }),
      },
    ])(
      'should return the response when $name',
      async ({ input, toRequest }) => {
        const result = await THROW_IF_ERROR(toRequest(input))
        expect(result).toStrictEqual(input)
      }
    )

    it.each<{ name: string, exception: unknown }>([
      { name: 'an Error', exception: new Error('test error') },
      { name: 'a string', exception: 'string error' },
      { name: 'another Error', exception: new Error('object error') },
      { name: 'an Error, immediately', exception: new Error('immediate throw') },
    ])(
      'should throw the exception when it is $name',
      async ({ exception }) => {
        const input = { exception, result: undefined }

        await expect(THROW_IF_ERROR(Promise.resolve(input))).rejects.toBe(exception)
      }
    )
  }
)
