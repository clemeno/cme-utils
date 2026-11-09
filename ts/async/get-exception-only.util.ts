import type { AppExceptionOnly } from '../app-exception-only.js'

/**
 * Takes a promise and returns an object containing an exception if any was thrown during the `Promise` execution.
 * @param p - The promise to await
 * @returns An object `{ exception }`: the exact rejection reason, or undefined when the promise resolved (its value is dropped)
 * @example
 * ```typescript
 * await GET_EXCEPTION_ONLY(Promise.resolve(42)) // returns { exception: undefined }
 * await GET_EXCEPTION_ONLY(Promise.reject('boom')) // returns { exception: 'boom' }
 * await GET_EXCEPTION_ONLY(Promise.resolve(null)) // returns { exception: undefined }
 * ```
 */
export async function GET_EXCEPTION_ONLY (p: Promise<any>): Promise<AppExceptionOnly> {
  const exception = await p
    .then(() => undefined)
    .catch(err => {
      // if (IS_SET(errorExt)) {
      //   Object.assign(err, errorExt)
      // }

      return err
    })

  return { exception }
}
