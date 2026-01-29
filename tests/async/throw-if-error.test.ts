import { describe, expect, it } from 'bun:test'
import { THROW_IF_ERROR } from '../../ts/async/throw-if-error.util.js'

describe(
  'THROW_IF_ERROR',
  () => {
    it(
      'should return the response when no exception exists',
      async () => {
        const input = { exception: undefined, result: 'success' }
        const result = await THROW_IF_ERROR(Promise.resolve(input))
        expect(result).toStrictEqual(input)
      }
    )

    it(
      'should throw the exception when exception exists',
      async () => {
        const error = new Error('test error')
        const input = { exception: error, result: undefined }

        await expect(THROW_IF_ERROR(Promise.resolve(input))).rejects.toThrow(error)
      }
    )

    it(
      'should handle different exception types',
      async () => {
        const stringError = 'string error'
        const input1 = { exception: stringError, result: undefined }
        await expect(THROW_IF_ERROR(Promise.resolve(input1))).rejects.toThrow(stringError)

        const errorObj = new Error('object error')
        const input2 = { exception: errorObj, result: undefined }
        await expect(THROW_IF_ERROR(Promise.resolve(input2))).rejects.toThrow(errorObj)
      }
    )

    it(
      'should handle different result types',
      async () => {
        const input1 = { exception: undefined, result: 42 }
        const result1 = await THROW_IF_ERROR(Promise.resolve(input1))
        expect(result1.result).toBe(42)

        const input2 = { exception: undefined, result: { key: 'value' } }
        const result2 = await THROW_IF_ERROR(Promise.resolve(input2))
        expect(result2.result).toStrictEqual({ key: 'value' })

        const input3 = { exception: undefined, result: null }
        const result3 = await THROW_IF_ERROR(Promise.resolve(input3))
        expect(result3.result).toBe(null)
      }
    )

    it(
      'should work with async input promises',
      async () => {
        const input = { exception: undefined, result: 'async success' }
        const result = await THROW_IF_ERROR(new Promise(resolve => {
          setTimeout(() => resolve(input), 10)
        }))
        expect(result.result).toBe('async success')
      }
    )

    it(
      'should throw immediately when exception is present',
      async () => {
        const error = new Error('immediate throw')
        const input = { exception: error, result: undefined }

        await expect(THROW_IF_ERROR(Promise.resolve(input))).rejects.toThrow(error)
      }
    )
  }
)
