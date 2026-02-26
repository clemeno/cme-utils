import { describe, expect, it } from 'bun:test'
import { AppExceptionResult } from '../ts/app-exception-result.js'

describe(
  'AppExceptionResult',
  () => {
    it(
      'default constructor creates instance with undefined exception and result',
      () => {
        const instance = new AppExceptionResult()
        expect(instance.exception).toBeUndefined()
        expect(instance.result).toBeUndefined()
      }
    )

    it(
      'constructor assigns exception only',
      () => {
        const instance = new AppExceptionResult({ exception: 'err' })
        expect(instance.exception).toBe('err')
        expect(instance.result).toBeUndefined()
      }
    )

    it(
      'constructor assigns result only',
      () => {
        const instance = new AppExceptionResult({ result: 42 })
        expect(instance.result).toBe(42)
        expect(instance.exception).toBeUndefined()
      }
    )

    it(
      'constructor assigns both exception and result',
      () => {
        const instance = new AppExceptionResult({ exception: 'e', result: 'r' })
        expect(instance.exception).toBe('e')
        expect(instance.result).toBe('r')
      }
    )

    it(
      'constructor with undefined argument',
      () => {
        const instance = new AppExceptionResult(undefined)
        expect(instance.exception).toBeUndefined()
        expect(instance.result).toBeUndefined()
      }
    )
  }
)
