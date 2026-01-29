import { describe, expect, it } from 'bun:test'
import { ENCRYPT_PASSWORD } from '../../ts/password/encrypt-password.util.js'
import { createMockHashFn } from '../mocks/password-mocks.js'

describe(
  'ENCRYPT_PASSWORD',
  () => {
    it(
      'should hash password using provided hash function',
      async () => {
        const mockHashFn = createMockHashFn({ returnValue: 'hashed_password_123' })

        const result = await ENCRYPT_PASSWORD({
          clear: 'password123',
          hashFn: mockHashFn,
        })

        expect(result).toBe('hashed_password_123')
        expect(mockHashFn.getCalls()).toEqual([['password123', 12]])
      }
    )

    it(
      'should convert clear password to string',
      async () => {
        const mockHashFn = createMockHashFn({ returnValue: 'hashed_123' })

        const result = await ENCRYPT_PASSWORD({
          clear: 123,
          hashFn: mockHashFn,
        })

        expect(result).toBe('hashed_123')
        expect(mockHashFn.getCalls()).toEqual([['123', 12]])
      }
    )

    it(
      'should handle empty passwords',
      async () => {
        const mockHashFn = createMockHashFn({ returnValue: 'hashed_empty' })

        const result = await ENCRYPT_PASSWORD({
          clear: '',
          hashFn: mockHashFn,
        })

        expect(result).toBe('hashed_empty')
        expect(mockHashFn.getCalls()).toEqual([['', 12]])
      }
    )

    const nullUndefinedTestCases = [
      { name: 'null', clear: null as any, expectedHash: 'hashed_null' },
      { name: 'undefined', clear: undefined as any, expectedHash: 'hashed_undefined' },
    ]

    it.each(nullUndefinedTestCases)(
      'should handle $name passwords',
      async ({ clear, expectedHash }) => {
        const mockHashFn = createMockHashFn({ returnValue: expectedHash })

        const result = await ENCRYPT_PASSWORD({
          clear,
          hashFn: mockHashFn,
        })

        expect(result).toBe(expectedHash)
        expect(mockHashFn.getCalls()).toEqual([['', 12]])
      }
    )

    it(
      'should return a string',
      async () => {
        const mockHashFn = createMockHashFn({ returnValue: 'hashed_result' })

        const result = await ENCRYPT_PASSWORD({
          clear: 'password',
          hashFn: mockHashFn,
        })

        expect(typeof result).toBe('string')
      }
    )

    it(
      'should propagate hashFn errors',
      async () => {
        const mockHashFn = createMockHashFn({ shouldThrow: true, errorMessage: 'Hashing failed' })

        await expect(ENCRYPT_PASSWORD({
          clear: 'password',
          hashFn: mockHashFn,
        })).rejects.toThrow('Hashing failed')
      }
    )

    it(
      'should use default iterations of 12',
      async () => {
        const mockHashFn = createMockHashFn({ returnValue: 'hashed' })

        await ENCRYPT_PASSWORD({
          clear: 'password',
          hashFn: mockHashFn,
        })

        expect(mockHashFn.getCalls()).toEqual([['password', 12]])
      }
    )

    it(
      'should accept custom iterations parameter',
      async () => {
        const mockHashFn = createMockHashFn({ returnValue: 'hashed' })

        await ENCRYPT_PASSWORD({
          clear: 'password',
          hashFn: mockHashFn,
          iterations: 10, // This parameter is accepted but not used
        })

        expect(mockHashFn.getCalls()).toEqual([['password', 12]])
      }
    )
  }
)
