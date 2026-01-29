import { describe, expect, it } from 'bun:test'
import { IS_A_FUNCTION } from '../../ts/check/is-a-function.util.js'

describe(
  'IS_A_FUNCTION',
  () => {
    const testCases = [
      { name: 'should return true for arrow function', input: () => {}, expected: true },
      { name: 'should return true for function declaration', input: function () {}, expected: true },
      { name: 'should return true for async function', input: async () => {}, expected: true },
      { name: 'should return true for generator function', input: function * () {}, expected: true },
      { name: 'should return true for Math.max', input: Math.max, expected: true },
      { name: 'should return true for console.log', input: console.log, expected: true },
      { name: 'should return false for string "function"', input: 'function', expected: false },
      { name: 'should return false for number 123', input: 123, expected: false },
      { name: 'should return false for null', input: null, expected: false },
      { name: 'should return false for undefined', input: undefined, expected: false },
      { name: 'should return false for {}', input: {}, expected: false },
      { name: 'should return false for []', input: [], expected: false },
      { name: 'should return false for true', input: true, expected: false },
    ]

    it.each(testCases)(
      '$name',
      async ({ input, expected }) => {
        if (typeof input === 'function') {
          if (input.constructor.name === 'GeneratorFunction') {
            input().next()
          } else if (input.constructor.name === 'AsyncFunction') {
            await input()
          } else {
            input()
          }
        }

        expect(IS_A_FUNCTION(input)).toBe(expected)
      }
    )
  }
)
