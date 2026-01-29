import { describe, expect, it } from 'bun:test'
import { GET_EXCEPTION_ONLY } from '../../ts/async/get-exception-only.util.js'

describe(
  'GET_EXCEPTION_ONLY',
  () => {
    it(
      'should return undefined exception for successful promise',
      async () => {
        const result = await GET_EXCEPTION_ONLY(Promise.resolve('success'))
        expect(result.exception).toBeUndefined()
      }
    )

    it(
      'should return exception for rejected promise',
      async () => {
        const error = new Error('test error')
        const result = await GET_EXCEPTION_ONLY(Promise.reject(error))
        expect(result.exception).toBe(error)
      }
    )

    it(
      'should handle promises that resolve with different types',
      async () => {
        const result1 = await GET_EXCEPTION_ONLY(Promise.resolve(42))
        expect(result1.exception).toBeUndefined()

        const result2 = await GET_EXCEPTION_ONLY(Promise.resolve({ key: 'value' }))
        expect(result2.exception).toBeUndefined()

        const result3 = await GET_EXCEPTION_ONLY(Promise.resolve(null))
        expect(result3.exception).toBeUndefined()
      }
    )

    it(
      'should handle promises that reject with different error types',
      async () => {
        const stringError = await GET_EXCEPTION_ONLY(Promise.reject(new Error('string error')))
        expect(stringError.exception).toBeInstanceOf(Error)
        expect((stringError.exception as Error).message).toBe('string error')

        const errorObj = new Error('object error')
        const objError = await GET_EXCEPTION_ONLY(Promise.reject(errorObj))
        expect(objError.exception).toBe(errorObj)
      }
    )

    it(
      'should handle async operations',
      async () => {
        const result = await GET_EXCEPTION_ONLY(new Promise(resolve => {
          setTimeout(() => resolve('delayed success'), 10)
        }))
        expect(result.exception).toBeUndefined()
      }
    )
  }
)
