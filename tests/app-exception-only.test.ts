import { describe, expect, it } from 'bun:test'
import { AppExceptionOnly } from '../ts/app-exception-only.js'

describe(
  'AppExceptionOnly',
  () => {
    it.each<{ name: string, args: ConstructorParameters<typeof AppExceptionOnly>, expected: unknown }>([
      { name: 'default constructor creates instance with undefined exception', args: [], expected: undefined },
      { name: 'constructor with undefined argument', args: [undefined], expected: undefined },
      { name: 'constructor assigns string exception', args: [{ exception: 'err' }], expected: 'err' },
      { name: 'constructor assigns typed exception', args: [{ exception: new Error('oops') }], expected: new Error('oops') },
      { name: 'constructor assigns number exception', args: [{ exception: 404 }], expected: 404 },
    ])(
      '$name',
      ({ args, expected }) => {
        const instance = new AppExceptionOnly(...args)
        expect(instance.exception).toEqual(expected)
      }
    )
  }
)
