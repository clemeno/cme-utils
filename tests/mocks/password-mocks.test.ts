import { describe, expect, it } from 'bun:test'
import { createMockHashFn, createMockCompareFn } from './password-mocks.js'

describe(
  'Password Mocks',
  () => {
    describe(
      'createMockHashFn',
      () => {
        it.each<{ name: string, options: Parameters<typeof createMockHashFn>[0], expected: string }>([
          { name: 'default return value', options: undefined, expected: 'mock_hash' },
          { name: 'custom return value', options: { returnValue: 'custom_hash' }, expected: 'custom_hash' },
        ])(
          'should create a mock hash function with $name',
          async ({ options, expected }) => {
            const mock = createMockHashFn(options)
            const result = await mock('password123', 12)
            expect(result).toBe(expected)
          }
        )

        it.each<{ name: string, options: Parameters<typeof createMockHashFn>[0], expected: string }>([
          { name: 'a custom error message', options: { shouldThrow: true, errorMessage: 'hash error' }, expected: 'hash error' },
          { name: 'the default error message', options: { shouldThrow: true }, expected: 'mock error' },
        ])(
          'should throw $name when shouldThrow is true',
          async ({ options, expected }) => {
            const mock = createMockHashFn(options)
            await expect(mock('password123', 12)).rejects.toThrow(new Error(expected))
          }
        )

        it.each<{ name: string, calls: Array<[string, number]> }>([
          { name: 'should return empty calls array initially', calls: [] },
          { name: 'should track hash calls', calls: [['password1', 10], ['password2', 12]] },
        ])(
          '$name',
          async ({ calls }) => {
            const mock = createMockHashFn()
            await Promise.all(calls.map(inCall => mock(...inCall)))
            expect(mock.getCalls()).toEqual(calls)
          }
        )
      }
    )

    describe(
      'createMockCompareFn',
      () => {
        it.each<{ name: string, options: Parameters<typeof createMockCompareFn>[0], expected: boolean }>([
          { name: 'default return value', options: undefined, expected: true },
          { name: 'custom return value', options: { returnValue: false }, expected: false },
        ])(
          'should create a mock compare function with $name',
          async ({ options, expected }) => {
            const mock = createMockCompareFn(options)
            const result = await mock('clear_password', 'hashed_password')
            expect(result).toBe(expected)
          }
        )

        it.each<{ name: string, options: Parameters<typeof createMockCompareFn>[0], expected: string }>([
          { name: 'a custom error message', options: { shouldThrow: true, errorMessage: 'compare error' }, expected: 'compare error' },
          { name: 'the default error message', options: { shouldThrow: true }, expected: 'mock error' },
        ])(
          'should throw $name when shouldThrow is true',
          async ({ options, expected }) => {
            const mock = createMockCompareFn(options)
            await expect(mock('clear', 'hash')).rejects.toThrow(new Error(expected))
          }
        )

        it.each<{ name: string, calls: Array<[string, string]> }>([
          { name: 'should return empty calls array initially', calls: [] },
          { name: 'should track compare calls', calls: [['clear1', 'hash1'], ['clear2', 'hash2']] },
        ])(
          '$name',
          async ({ calls }) => {
            const mock = createMockCompareFn()
            await Promise.all(calls.map(inCall => mock(...inCall)))
            expect(mock.getCalls()).toEqual(calls)
          }
        )
      }
    )
  }
)
