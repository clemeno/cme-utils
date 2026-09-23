import { TO_STRING } from '../convert/to-string.util.js'

/**
 * Reads a whole UTF-8 text file and returns its content, trimmed once at both ends.
 * Byte chunks go through one streaming TextDecoder, so a multi-byte character split between chunks stays intact.
 * Open and read errors (e.g. ENOENT) are not caught: the returned promise rejects with them.
 * * provide createReadStream -> import { createReadStream } from 'node:fs'
 */
export const GET_FILE_FULL_TEXT_CONTENT = async <TypeofCreateReadStream = any> (_: {
  createReadStream: TypeofCreateReadStream
  filePath: string
}): Promise<string> => {
  const decoder = new TextDecoder()

  let content = ''

  const fileReadStream = (_.createReadStream as any)(_.filePath)

  for await (const chunk of fileReadStream) {
    content += (chunk instanceof Uint8Array) ? decoder.decode(chunk, { stream: true }) : TO_STRING(chunk)
  }

  content += decoder.decode()

  return content.trim()
}
