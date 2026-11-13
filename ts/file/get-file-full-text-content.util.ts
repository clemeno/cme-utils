import { TO_STRING } from '../convert/to-string.util.js'

/**
 * Reads a whole UTF-8 text file and returns its content, trimmed once at both ends.
 * `createReadStream` returns the file's stream, or a promise of it: a Node stream (or any async iterable), or a web
 * `ReadableStream` (a `fetch` response body in a browser). A `null` stream, the body of a response without one (a 204, a
 * HEAD request), reads as empty.
 * Byte chunks go through one streaming TextDecoder, so a multi-byte character split between chunks stays intact.
 * Open and read errors (e.g. ENOENT) are not caught: the returned promise rejects with them.
 * * on Node and bun, provide createReadStream -> import { createReadStream } from 'node:fs'
 * * in a browser, provide a fetch based createReadStream (as below); `READ_FILE_CONTENT` reads a picked `File`
 * @param _ - The parameter object
 * @param _.createReadStream - The `createReadStream` function of `node:fs`, or a `fetch` based one (see above)
 * @param _.filePath - The path or URL of the file to read
 * @returns The trimmed text content of the file
 * @example
 * ```typescript
 * // hello.txt holds "  hello world \n"
 * await GET_FILE_FULL_TEXT_CONTENT({ createReadStream, filePath: 'hello.txt' }) // returns 'hello world'
 * // empty.txt is empty
 * await GET_FILE_FULL_TEXT_CONTENT({ createReadStream, filePath: 'empty.txt' }) // returns ''
 * // a missing file rejects with ENOENT
 * await GET_FILE_FULL_TEXT_CONTENT({ createReadStream, filePath: 'missing.txt' }) // throws Error ENOENT
 * // in a browser, a fetch based createReadStream, which rejects on an HTTP error rather than read the error page:
 * // async function createReadStream (filePath: string): Promise<ReadableStream<Uint8Array> | null> {
 * //   const response = await fetch(filePath)
 * //   if (!response.ok) { throw new Error(`${response.status} ${filePath}`) }
 * //   return response.body
 * // }
 * await GET_FILE_FULL_TEXT_CONTENT({ createReadStream, filePath: '/hello.txt' }) // returns 'hello world'
 * ```
 */
export async function GET_FILE_FULL_TEXT_CONTENT<TypeofCreateReadStream = any> (_: {
  createReadStream: TypeofCreateReadStream
  filePath: string
}): Promise<string> {
  const decoder = new TextDecoder()

  /* Decodes a byte chunk in streaming mode, and takes any other chunk (a string) as is */
  function decodeChunk (chunk: unknown): string {
    return (chunk instanceof Uint8Array) ? decoder.decode(chunk, { stream: true }) : TO_STRING(chunk)
  }

  let content = ''

  const fileReadStream = await (_.createReadStream as any)(_.filePath)

  if (typeof fileReadStream?.getReader === 'function') {
    // a web ReadableStream is read through its reader: Safari has no async iteration of it
    const reader: ReadableStreamDefaultReader<unknown> = fileReadStream.getReader()
    let readResult = await reader.read()
    while (!readResult.done) {
      content += decodeChunk(readResult.value)
      readResult = await reader.read()
    }
  } else if (fileReadStream !== null) {
    // a null stream, the body of a fetch response without one, has no content
    for await (const chunk of fileReadStream) {
      content += decodeChunk(chunk)
    }
  }

  content += decoder.decode()

  return content.trim()
}
