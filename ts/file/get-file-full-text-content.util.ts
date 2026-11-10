import { TO_STRING } from '../convert/to-string.util.js'

/**
 * Reads a whole UTF-8 text file and returns its content, trimmed once at both ends.
 * Byte chunks go through one streaming TextDecoder, so a multi-byte character split between chunks stays intact.
 * Open and read errors (e.g. ENOENT) are not caught: the returned promise rejects with them.
 * Runs on Node and bun only: it reads a file by its path (in a browser, `READ_FILE_CONTENT` reads a picked `File`).
 * * provide createReadStream -> import { createReadStream } from 'node:fs'
 * @param _ - The parameter object
 * @param _.createReadStream - The `createReadStream` function of `node:fs`
 * @param _.filePath - The path of the file to read
 * @returns The trimmed text content of the file
 * @example
 * ```typescript
 * // hello.txt holds "  hello world \n"
 * await GET_FILE_FULL_TEXT_CONTENT({ createReadStream, filePath: 'hello.txt' }) // returns 'hello world'
 * // empty.txt is empty
 * await GET_FILE_FULL_TEXT_CONTENT({ createReadStream, filePath: 'empty.txt' }) // returns ''
 * // a missing file rejects with ENOENT
 * await GET_FILE_FULL_TEXT_CONTENT({ createReadStream, filePath: 'missing.txt' }) // throws Error ENOENT
 * ```
 */
export async function GET_FILE_FULL_TEXT_CONTENT<TypeofCreateReadStream = any> (_: {
  createReadStream: TypeofCreateReadStream
  filePath: string
}): Promise<string> {
  const decoder = new TextDecoder()

  let content = ''

  const fileReadStream = (_.createReadStream as any)(_.filePath)

  for await (const chunk of fileReadStream) {
    content += (chunk instanceof Uint8Array) ? decoder.decode(chunk, { stream: true }) : TO_STRING(chunk)
  }

  content += decoder.decode()

  return content.trim()
}
