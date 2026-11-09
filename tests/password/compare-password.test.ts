import { describe, expect, it } from 'bun:test'
import { COMPARE_PASSWORD } from '../../ts/password/compare-password.util.js'
import { createMockCompareFn } from '../mocks/password-mocks.js'

describe(
  'COMPARE_PASSWORD',
  () => {
    it.each<{ name: string, input: { clear: unknown, hash: string }, expected: boolean, expectedCalls: Array<[string, string]> }>([
      { name: 'should return true when passwords match', input: { clear: 'password123', hash: 'hashed_password' }, expected: true, expectedCalls: [['password123', 'hashed_password']] },
      { name: 'should return false when passwords do not match', input: { clear: 'wrongpassword', hash: 'hashed_password' }, expected: false, expectedCalls: [['wrongpassword', 'hashed_password']] },
      { name: 'should convert number to string', input: { clear: 123, hash: 'hashed_password' }, expected: true, expectedCalls: [['123', 'hashed_password']] },
      { name: 'should convert boolean true to string', input: { clear: true, hash: 'hashed_password' }, expected: true, expectedCalls: [['true', 'hashed_password']] },
      { name: 'should convert boolean false to string', input: { clear: false, hash: 'hashed_password' }, expected: true, expectedCalls: [['false', 'hashed_password']] },
      { name: 'should handle empty string passwords', input: { clear: '', hash: 'hashed_empty' }, expected: true, expectedCalls: [['', 'hashed_empty']] },
      { name: 'should handle null clear passwords', input: { clear: null, hash: 'hash' }, expected: true, expectedCalls: [['', 'hash']] },
      { name: 'should handle undefined clear passwords', input: { clear: undefined, hash: 'hash' }, expected: true, expectedCalls: [['', 'hash']] },
      { name: 'should return a boolean', input: { clear: 'password', hash: 'hash' }, expected: true, expectedCalls: [['password', 'hash']] },
    ])(
      '$name',
      async ({ input, expected, expectedCalls }) => {
        const mockCompareFn = createMockCompareFn({ returnValue: expected })

        const result = await COMPARE_PASSWORD({ ...input, compareFn: mockCompareFn })

        expect(result).toBe(expected)
        expect(mockCompareFn.getCalls()).toEqual(expectedCalls)
      }
    )

    it(
      'should propagate compareFn errors',
      async () => {
        async function mockCompareFn (): Promise<never> {
          throw new Error('Comparison failed')
        }

        await expect(COMPARE_PASSWORD({
          clear: 'password',
          hash: 'hash',
          compareFn: mockCompareFn,
        })).rejects.toThrow('Comparison failed')
      }
    )
  }
)
