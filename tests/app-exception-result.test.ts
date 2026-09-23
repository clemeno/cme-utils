import { describe, expect, it } from 'bun:test'
import { AppExceptionResult } from '../ts/app-exception-result.js'

describe(
  'AppExceptionResult',
  () => {
    it.each<{ name: string, build: () => AppExceptionResult, exception: unknown, result: unknown }>([
      { name: 'default constructor creates instance with undefined exception and result', build: () => new AppExceptionResult(), exception: undefined, result: undefined },
      { name: 'constructor assigns exception only', build: () => new AppExceptionResult({ exception: 'err' }), exception: 'err', result: undefined },
      { name: 'constructor assigns result only', build: () => new AppExceptionResult({ result: 42 }), exception: undefined, result: 42 },
      { name: 'constructor assigns both exception and result', build: () => new AppExceptionResult({ exception: 'e', result: 'r' }), exception: 'e', result: 'r' },
      { name: 'constructor with undefined argument', build: () => new AppExceptionResult(undefined), exception: undefined, result: undefined },
    ])(
      '$name',
      ({ build, exception, result }) => {
        const instance = build()
        expect(instance.exception).toBe(exception)
        expect(instance.result).toBe(result)
      }
    )
  }
)
