import type { AppExceptionResult } from '../app-exception-result.js'

/**
 * Takes a promise and returns an object containing either an exception or a result from the `Promise` execution.
 * @param p - The promise to await
 * @returns An object `{ exception, result }`: the result when the promise resolved, the rejection reason otherwise (the other field is undefined)
 * @example
 * ```typescript
 * await GET_EXCEPTION_RESULT_OF(Promise.resolve(42)) // returns { exception: undefined, result: 42 }
 * await GET_EXCEPTION_RESULT_OF(Promise.reject('boom')) // returns { exception: 'boom', result: undefined }
 * await GET_EXCEPTION_RESULT_OF(Promise.resolve(null)) // returns { exception: undefined, result: null }
 * ```
 */
export async function GET_EXCEPTION_RESULT_OF<E = any, T = any> (p: Promise<any>): Promise<AppExceptionResult<E, T>> {
  const [exception, result] = await p
    .then(data => [undefined, data])
    .catch(err => {
      // if (IS_SET(errorExt)) {
      //   Object.assign(err, errorExt)
      // }

      return [err, undefined]
    })

  return { exception, result }
}
