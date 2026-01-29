import { describe, expect, it } from 'bun:test'
import { GET_EXCEPTION_RESULT_OF } from '../../ts/async/get-exception-result-of.util.js'

describe(
  'GET_EXCEPTION_RESULT_OF',
  () => {
    it(
      'should return result and undefined exception for successful promise',
      async () => {
        const result = await GET_EXCEPTION_RESULT_OF(Promise.resolve('success'))
        expect(result.exception).toBeUndefined()
        expect(result.result).toBe('success')
      }
    )

    it(
      'should return exception and undefined result for rejected promise',
      async () => {
        const error = new Error('test error')
        const result = await GET_EXCEPTION_RESULT_OF(Promise.reject(error))
        expect(result.exception).toBe(error)
        expect(result.result).toBeUndefined()
      }
    )

    it(
      'should handle promises that resolve with different types',
      async () => {
        const result1 = await GET_EXCEPTION_RESULT_OF(Promise.resolve(42))
        expect(result1.exception).toBeUndefined()
        expect(result1.result).toBe(42)

        const result2 = await GET_EXCEPTION_RESULT_OF(Promise.resolve({ key: 'value' }))
        expect(result2.exception).toBeUndefined()
        expect(result2.result).toStrictEqual({ key: 'value' })

        const result3 = await GET_EXCEPTION_RESULT_OF(Promise.resolve(null))
        expect(result3.exception).toBeUndefined()
        expect(result3.result).toBe(null)

        const result4 = await GET_EXCEPTION_RESULT_OF(Promise.resolve(undefined))
        expect(result4.exception).toBeUndefined()
        expect(result4.result).toBeUndefined()
      }
    )

    it(
      'should handle promises that reject with different error types',
      async () => {
        const stringError = await GET_EXCEPTION_RESULT_OF(Promise.reject(new Error('string error')))
        expect(stringError.exception).toBeInstanceOf(Error)
        expect((stringError.exception as Error).message).toBe('string error')
        expect(stringError.result).toBeUndefined()

        const errorObj = new Error('object error')
        const objError = await GET_EXCEPTION_RESULT_OF(Promise.reject(errorObj))
        expect(objError.exception).toBe(errorObj)
        expect(objError.result).toBeUndefined()
      }
    )

    it(
      'should handle async operations that resolve',
      async () => {
        const result = await GET_EXCEPTION_RESULT_OF(new Promise(
          resolve => {
            setTimeout(() => {
              resolve('delayed success')
            }, 10)
          }
        ))

        expect(result.exception).toBeUndefined()
        expect(result.result).toBe('delayed success')
      }
    )

    it(
      'should handle async operations that reject',
      async () => {
        const result = await GET_EXCEPTION_RESULT_OF(new Promise(
          // eslint-disable-next-line max-params
          (resolve, reject) => {
            setTimeout(() => {
              reject(new Error('delayed error'))
            }, 10)
          }
        ))

        expect(result.result).toBeUndefined()
        expect(result.exception).toBeInstanceOf(Error)
        expect(result.exception?.message).toBe('delayed error')
      }
    )

    it(
      'should work with generic types',
      async () => {
        const result = await GET_EXCEPTION_RESULT_OF<string, number>(Promise.resolve(42))
        expect(result.exception).toBeUndefined()
        expect(result.result).toBe(42)
      }
    )
  }
)
