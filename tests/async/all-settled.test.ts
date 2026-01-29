import { describe, expect, it } from 'bun:test'
import { ALL_SETTLED } from '../../ts/async/all-settled.util.js'

describe(
  'ALL_SETTLED',
  () => {
    it(
      'should handle an empty array',
      async () => {
        const result = await ALL_SETTLED([])
        expect(result.fulfilledSize).toBe(0)
        expect(result.rejectedSize).toBe(0)
        expect(result.size).toBe(0)
      }
    )

    it(
      'should handle all promises fulfilled',
      async () => {
        const promises = [
          Promise.resolve(1),
          Promise.resolve('hello'),
          Promise.resolve({ key: 'value' }),
        ]
        const result = await ALL_SETTLED(promises)
        expect(result.fulfilled[0]).toBe(1)
        expect(result.fulfilled[1]).toBe('hello')
        expect((result.fulfilled[2] as any).key).toBe('value')
        expect(result.fulfilledSize).toBe(3)
        expect(result.rejectedSize).toBe(0)
        expect(result.size).toBe(3)
      }
    )

    it(
      'should handle all promises rejected',
      async () => {
        const promises = [
          Promise.reject(new Error('error1')),
          Promise.reject(new Error('error2')),
          Promise.reject(new Error('error3')),
        ]
        const result = await ALL_SETTLED(promises)
        expect(result.rejected[0]).toEqual(new Error('error1'))
        expect(result.rejected[1]).toEqual(new Error('error2'))
        expect(result.rejected[2]).toEqual(new Error('error3'))
        expect(result.fulfilledSize).toBe(0)
        expect(result.rejectedSize).toBe(3)
        expect(result.size).toBe(3)
      }
    )

    it(
      'should handle mix of fulfilled and rejected promises',
      async () => {
        const promises = [
          Promise.resolve(42),
          Promise.reject(new Error('fail')),
          Promise.resolve('success'),
          Promise.reject(new Error('test error')),
        ]
        const result = await ALL_SETTLED(promises)
        expect(result.fulfilled[0]).toBe(42)
        expect(result.fulfilled[2]).toBe('success')
        expect(result.rejected[1]).toEqual(new Error('fail'))
        expect(result.rejected[3]).toEqual(new Error('test error'))
        expect(result.fulfilledSize).toBe(2)
        expect(result.rejectedSize).toBe(2)
        expect(result.size).toBe(4)
      }
    )

    it(
      'should handle single promise that resolves',
      async () => {
        const result = await ALL_SETTLED([Promise.resolve('single')])
        expect(result.fulfilled[0]).toBe('single')
        expect(result.fulfilledSize).toBe(1)
        expect(result.rejectedSize).toBe(0)
        expect(result.size).toBe(1)
      }
    )

    it(
      'should handle single promise that rejects',
      async () => {
        const result = await ALL_SETTLED([Promise.reject(new Error('single error'))])
        expect(result.rejected[0]).toEqual(new Error('single error'))
        expect(result.fulfilledSize).toBe(0)
        expect(result.rejectedSize).toBe(1)
        expect(result.size).toBe(1)
      }
    )

    it(
      'should handle promises that resolve with different types',
      async () => {
        const promises = [
          Promise.resolve(0),
          Promise.resolve(false),
          Promise.resolve(''),
          Promise.resolve(null),
          Promise.resolve(undefined),
        ]
        const result = await ALL_SETTLED(promises)
        expect(result.fulfilled[0]).toBe(0)
        expect(result.fulfilled[1]).toBe(false)
        expect(result.fulfilled[2]).toBe('')
        expect(result.fulfilled[3]).toBe(null)
        expect(result.fulfilled[4]).toBe(undefined)
        expect(result.fulfilledSize).toBe(5)
        expect(result.rejectedSize).toBe(0)
        expect(result.size).toBe(5)
      }
    )

    it(
      'should handle promises that reject with different types',
      async () => {
        const promises = [
          Promise.reject(new Error('error0')),
          Promise.reject(new Error('error1')),
          Promise.reject(new Error('error2')),
          Promise.reject(new Error('error3')),
          Promise.reject(new Error('error4')),
        ]
        const result = await ALL_SETTLED(promises)
        expect(result.rejected[0]).toEqual(new Error('error0'))
        expect(result.rejected[1]).toEqual(new Error('error1'))
        expect(result.rejected[2]).toEqual(new Error('error2'))
        expect(result.rejected[3]).toEqual(new Error('error3'))
        expect(result.rejected[4]).toEqual(new Error('error4'))
        expect(result.fulfilledSize).toBe(0)
        expect(result.rejectedSize).toBe(5)
        expect(result.size).toBe(5)
      }
    )

    it(
      'should handle large number of promises',
      async () => {
        const promises = []

        for (let i = 0; i < 20; i += 1) {
          promises.push((i % 2) === 0 ? Promise.resolve(i) : Promise.reject(new Error(`error${i}`)))
        }

        const result = await ALL_SETTLED(promises)

        // Check fulfilled and rejected promises (even fulfilled, odd rejected)
        for (let i = 0; i < 20; i += 1) {
          if ((i % 2) === 0) {
            expect(result.fulfilled[i]).toBe(i)
          } else {
            expect(result.rejected[i]).toEqual(new Error(`error${i}`))
          }
        }

        expect(result.fulfilledSize).toBe(10)
        expect(result.rejectedSize).toBe(10)
        expect(result.size).toBe(20)
      }
    )

    it(
      'should preserve promise resolution order',
      async () => {
        const promises = [
          Promise.resolve('first'),
          Promise.resolve('second'),
          Promise.resolve('third'),
        ]
        const result = await ALL_SETTLED(promises)
        expect(result.fulfilled[0]).toBe('first')
        expect(result.fulfilled[1]).toBe('second')
        expect(result.fulfilled[2]).toBe('third')
        expect(result.fulfilledSize).toBe(3)
        expect(result.rejectedSize).toBe(0)
        expect(result.size).toBe(3)
      }
    )

    it(
      'should handle promises that resolve at different times',
      async () => {
        const promises = [
          new Promise(resolve => setTimeout(() => resolve('slow'), 10)),
          Promise.resolve('fast'),
          new Promise(resolve => setTimeout(() => resolve('medium'), 5)),
        ]
        const result = await ALL_SETTLED(promises)
        expect(result.fulfilled[0]).toBe('slow')
        expect(result.fulfilled[1]).toBe('fast')
        expect(result.fulfilled[2]).toBe('medium')
        expect(result.fulfilledSize).toBe(3)
        expect(result.rejectedSize).toBe(0)
        expect(result.size).toBe(3)
      }
    )
  }
)
