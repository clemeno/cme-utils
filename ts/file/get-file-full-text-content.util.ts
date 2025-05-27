import { TO_STRING } from '../convert/to-string.util.js'

/**
 * * provide createReadStream -> import { createReadStream } from 'node:fs'
 */
export const GET_FILE_FULL_TEXT_CONTENT = async <TypeofCreateReadStream = any> (_: {
  createReadStream: TypeofCreateReadStream
  filePath: string
}): Promise<string> => {
  const chunkList: string[] = []

  try {
    const fileReadStream = (_.createReadStream as any)(_.filePath)

    for await (const chunk of fileReadStream) {
      chunkList.push(TO_STRING(chunk).trim())
    }
  } catch { }

  return chunkList.join('')
}
