import { describe, expect, it } from 'bun:test'
import { NOOP } from '../../ts/functional/noop.util.js'

describe(
  'NOOP',
  () => {
    const returnUndefinedTestCases = [
      { name: 'no parameters', args: [], expected: undefined },
      { name: 'with parameters', args: ['test'], expected: undefined },
      { name: 'with multiple parameters', args: [1, 2, 3, 'four', {}], expected: undefined },
    ]

    it.each(returnUndefinedTestCases)(
      'should return undefined when called $name',
      ({ args, expected }) => {
        const result = NOOP(...args)
        expect(result).toBe(expected)
      }
    )

    const noThrowTestCases = [
      { name: 'no parameters', args: [] },
      { name: 'with null and undefined', args: [null, undefined, NaN] },
    ]

    it.each(noThrowTestCases)(
      'should not throw when called $name',
      ({ args }) => {
        expect(() => NOOP(...args)).not.toThrow()
      }
    )

    const multipleCallsTestCases = [
      { name: 'first call', callCount: 1 },
      { name: 'second call', callCount: 2 },
      { name: 'third call', callCount: 3 },
    ]

    it.each(multipleCallsTestCases)(
      'should be a function that can be called multiple times ($name)',
      ({ callCount }) => {
        for (let i = 0; i < callCount; i = i + 1) {
          NOOP()
        }
        // If we reach this point, all calls succeeded
        expect(true).toBe(true)
      }
    )
  }
)
