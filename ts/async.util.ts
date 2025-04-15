import { IS_SET } from 'check/is-set.util.js'

/** expect an { exception } */
export class ExceptionOnly {
  exception: any = undefined
}

/** expect an { exception, result } */
export class ExceptionResult extends ExceptionOnly {
  result: any = undefined
}

// , errorExt?: any
/** Takes a promise and returns an object containing either an exception or a result from the `Promise` execution. */
export const GET_EXCEPTION_RESULT_OF = async (p: Promise<any>): Promise<ExceptionResult> => {
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

// , errorExt?: any
/** Takes a promise and returns an object containing either an exception if any was thrown during the `Promise` execution. */
export const GET_EXCEPTION_ONLY = async (p: Promise<any>): Promise<ExceptionOnly> => {
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

/** Takes a `Blob` or `File` and returns its content as a `string`. OK for small files */
export const READ_FILE_CONTENT = async (file: Blob | File): Promise<ExceptionResult> => {
  const reader = new FileReader()

  // eslint-disable-next-line max-params
  const res = await GET_EXCEPTION_RESULT_OF(new Promise((resolve, reject) => {
    reader.onload = event => { resolve(event.target?.result) }

    reader.onerror = (err: any) => {
      const error: Error = err
      reject(error)
    }

    reader.readAsText(file)
  }))

  return res
}

/** From an `ExceptionResult`, `throw` on `exception` or return the `response` */
export const THROW_IF_ERROR = async (request: Promise<ExceptionResult>): Promise<ExceptionResult> => {
  const response = await request

  if (IS_SET(response.exception)) {
    throw response.exception
  }

  return response
}
