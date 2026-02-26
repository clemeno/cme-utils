import { describe, expect, it } from 'bun:test'
import { AppExceptionOnly } from '../ts/app-exception-only.js'

describe(
  'AppExceptionOnly',
  () => {
    it(
      'default constructor creates instance with undefined exception',
      () => {
        const instance = new AppExceptionOnly()
        expect(instance.exception).toBeUndefined()
      }
    )

    it(
      'constructor with undefined argument',
      () => {
        const instance = new AppExceptionOnly(undefined)
        expect(instance.exception).toBeUndefined()
      }
    )

    it(
      'constructor assigns string exception',
      () => {
        const instance = new AppExceptionOnly({ exception: 'err' })
        expect(instance.exception).toBe('err')
      }
    )

    it(
      'constructor assigns typed exception',
      () => {
        const instance = new AppExceptionOnly<Error>({ exception: new Error('oops') })
        expect(instance.exception?.message).toBe('oops')
      }
    )

    it(
      'constructor assigns number exception',
      () => {
        const instance = new AppExceptionOnly<number>({ exception: 404 })
        expect(instance.exception).toBe(404)
      }
    )
  }
)
