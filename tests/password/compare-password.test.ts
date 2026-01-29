import { describe, expect, it } from 'bun:test'
import { COMPARE_PASSWORD } from '../../ts/password/compare-password.util.js'
import { createMockCompareFn } from '../mocks/password-mocks.js'

describe(
  'COMPARE_PASSWORD',
  () => {
    const matchTestCases = [
      { name: 'passwords match', clear: 'password123', hash: 'hashed_password', mockReturn: true, expected: true, expectedCalls: [['password123', 'hashed_password']] as [string, string][] },
      { name: 'passwords do not match', clear: 'wrongpassword', hash: 'hashed_password', mockReturn: false, expected: false, expectedCalls: [['wrongpassword', 'hashed_password']] as [string, string][] },
    ]

    it.each(matchTestCases)(
      'should return $expected when $name',
      async ({ clear, hash, mockReturn, expected, expectedCalls }) => {
        const mockCompareFn = createMockCompareFn({ returnValue: mockReturn })

        const result = await COMPARE_PASSWORD({
          clear,
          hash,
          compareFn: mockCompareFn,
        })

        expect(result).toBe(expected)
        expect(mockCompareFn.getCalls()).toEqual(expectedCalls)
      }
    )

    const convertToStringTestCases = [
      { name: 'number to string', clear: 123, expectedClear: '123' },
      { name: 'boolean true to string', clear: true, expectedClear: 'true' },
      { name: 'boolean false to string', clear: false, expectedClear: 'false' },
    ]

    it.each(convertToStringTestCases)(
      'should convert $name',
      async ({ clear, expectedClear }) => {
        const mockCompareFn = createMockCompareFn({ returnValue: true })

        const result = await COMPARE_PASSWORD({
          clear,
          hash: 'hashed_password',
          compareFn: mockCompareFn,
        })

        expect(result).toBe(true)
        expect(mockCompareFn.getCalls()).toEqual([[expectedClear, 'hashed_password']] as [string, string][])
      }
    )

    const emptyPasswordTestCases = [
      { name: 'empty string', clear: '', hash: 'hashed_empty' },
    ]

    it.each(emptyPasswordTestCases)(
      'should handle $name passwords',
      async ({ clear, hash }) => {
        // eslint-disable-next-line max-params
        const mockCompareFn = async (clearParam: string, hashParam: string) => {
          expect(clearParam).toBe('')
          return true
        }

        const result = await COMPARE_PASSWORD({
          clear,
          hash,
          compareFn: mockCompareFn,
        })

        expect(result).toBe(true)
      }
    )

    const nullUndefinedTestCases = [
      { name: 'null', clear: null as any, hash: 'hash' },
      { name: 'undefined', clear: undefined as any, hash: 'hash' },
    ]

    it.each(nullUndefinedTestCases)(
      'should handle $name clear passwords',
      async ({ clear, hash }) => {
        // eslint-disable-next-line max-params
        const mockCompareFn = async (clearParam: string, hashParam: string) => {
          expect(clearParam).toBe('')
          return true
        }

        const result = await COMPARE_PASSWORD({
          clear,
          hash,
          compareFn: mockCompareFn,
        })

        expect(result).toBe(true)
      }
    )

    it(
      'should return a boolean',
      async () => {
        const mockCompareFn = async () => true

        const result = await COMPARE_PASSWORD({
          clear: 'password',
          hash: 'hash',
          compareFn: mockCompareFn,
        })

        expect(typeof result).toBe('boolean')
      }
    )

    it(
      'should propagate compareFn errors',
      async () => {
        const mockCompareFn = async () => {
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
