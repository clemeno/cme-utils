import { describe, expect, it } from 'bun:test'
import { createMockHashFn, createMockCompareFn } from './password-mocks.js'

describe(
  'Password Mocks',
  () => {
    describe(
      'createMockHashFn',
      () => {
        it(
          'should create a mock hash function with default return value',
          async () => {
            const mock = createMockHashFn()
            const result = await mock('password123', 12)
            expect(result).toBe('mock_hash')
          }
        )

        it(
          'should create a mock hash function with custom return value',
          async () => {
            const mock = createMockHashFn({ returnValue: 'custom_hash' })
            const result = await mock('password123', 12)
            expect(result).toBe('custom_hash')
          }
        )

        it(
          'should throw error when shouldThrow is true',
          async () => {
            const mock = createMockHashFn({ shouldThrow: true, errorMessage: 'hash error' })
            await expect(mock('password123', 12)).rejects.toThrow('hash error')
          }
        )

        it(
          'should track hash calls',
          async () => {
            const mock = createMockHashFn()
            await mock('password1', 10)
            await mock('password2', 12)

            const calls = mock.getCalls()
            expect(calls).toHaveLength(2)
            expect(calls[0]).toEqual(['password1', 10])
            expect(calls[1]).toEqual(['password2', 12])
          }
        )

        it(
          'should return empty calls array initially',
          () => {
            const mock = createMockHashFn()
            expect(mock.getCalls()).toEqual([])
          }
        )
      }
    )

    describe(
      'createMockCompareFn',
      () => {
        it(
          'should create a mock compare function with default return value',
          async () => {
            const mock = createMockCompareFn()
            const result = await mock('clear_password', 'hashed_password')
            expect(result).toBe(true)
          }
        )

        it(
          'should create a mock compare function with custom return value',
          async () => {
            const mock = createMockCompareFn({ returnValue: false })
            const result = await mock('clear_password', 'hashed_password')
            expect(result).toBe(false)
          }
        )

        it(
          'should throw error when shouldThrow is true',
          async () => {
            const mock = createMockCompareFn({ shouldThrow: true, errorMessage: 'compare error' })
            await expect(mock('clear', 'hash')).rejects.toThrow('compare error')
          }
        )

        it(
          'should track compare calls',
          async () => {
            const mock = createMockCompareFn()
            await mock('clear1', 'hash1')
            await mock('clear2', 'hash2')

            const calls = mock.getCalls()
            expect(calls).toHaveLength(2)
            expect(calls[0]).toEqual(['clear1', 'hash1'])
            expect(calls[1]).toEqual(['clear2', 'hash2'])
          }
        )

        it(
          'should return empty calls array initially',
          () => {
            const mock = createMockCompareFn()
            expect(mock.getCalls()).toEqual([])
          }
        )
      }
    )
  }
)
