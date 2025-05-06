import type { AppExceptionResult } from '../app-exception-result.js'

/** Takes a promise and returns an object containing either an exception or a result from the `Promise` execution. */
export const GET_EXCEPTION_RESULT_OF = async (p: Promise<any>): Promise<AppExceptionResult> => {
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
