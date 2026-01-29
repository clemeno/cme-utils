import { describe, expect, it } from 'bun:test'
import { ASYNC_NOOP } from '../../ts/functional/async-noop.util.js'

describe(
  'ASYNC_NOOP',
  () => {
    const returnPromiseTestCases = [
      { name: 'no parameters', args: [], expected: undefined },
      { name: 'with parameters', args: ['ignored', 123, {}], expected: undefined },
    ]

    it.each(returnPromiseTestCases)(
      'should return a Promise that resolves to undefined when called $name',
      async ({ args, expected }) => {
        const result = await (ASYNC_NOOP as any)(...args)
        expect(result).toBe(expected)
      }
    )

    it(
      'should return a Promise',
      () => {
        const result = ASYNC_NOOP()
        expect(result).toBeInstanceOf(Promise)
      }
    )

    const awaitableTestCases = [
      { name: 'first await', callCount: 1 },
      { name: 'second await', callCount: 2 },
    ]

    it.each(awaitableTestCases)(
      'should be awaitable ($name)',
      async ({ callCount }) => {
        for (let i = 0; i < callCount; i = i + 1) {
          await ASYNC_NOOP()
        }
        // If we reach this point, the function completed successfully
        expect(true).toBe(true)
      }
    )
  }
)
