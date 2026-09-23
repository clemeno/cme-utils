import { describe, expect, it } from 'bun:test'
import { ENCRYPT_PASSWORD } from '../../ts/password/encrypt-password.util.js'
import { createMockHashFn } from '../mocks/password-mocks.js'

describe(
  'ENCRYPT_PASSWORD',
  () => {
    it.each<{ name: string, input: { clear: unknown, iterations?: number }, expected: string, expectedCalls: Array<[string, number]> }>([
      { name: 'should hash password using provided hash function', input: { clear: 'password123' }, expected: 'hashed_password_123', expectedCalls: [['password123', 12]] },
      { name: 'should convert clear password to string', input: { clear: 123 }, expected: 'hashed_123', expectedCalls: [['123', 12]] },
      { name: 'should handle empty passwords', input: { clear: '' }, expected: 'hashed_empty', expectedCalls: [['', 12]] },
      { name: 'should handle null passwords', input: { clear: null }, expected: 'hashed_null', expectedCalls: [['', 12]] },
      { name: 'should handle undefined passwords', input: { clear: undefined }, expected: 'hashed_undefined', expectedCalls: [['', 12]] },
      { name: 'should return the hash string', input: { clear: 'password' }, expected: 'hashed_result', expectedCalls: [['password', 12]] },
      { name: 'should use default iterations of 12', input: { clear: 'password' }, expected: 'hashed', expectedCalls: [['password', 12]] },
      { name: 'should pass custom iterations to the hash function', input: { clear: 'password', iterations: 10 }, expected: 'hashed', expectedCalls: [['password', 10]] },
    ])(
      '$name',
      async ({ input, expected, expectedCalls }) => {
        const mockHashFn = createMockHashFn({ returnValue: expected })

        const result = await ENCRYPT_PASSWORD({ ...input, hashFn: mockHashFn })

        expect(result).toBe(expected)
        expect(mockHashFn.getCalls()).toEqual(expectedCalls)
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
  }
)
