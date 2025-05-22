import { TO_STRING } from '../convert/to-string.util.js'

/**
 * import { createReadStream } from 'node:fs'
 */
export const GET_FILE_FULL_TEXT_CONTENT = async (_: { filePath: string, createReadStream: any }): Promise<string> => {
  const chunkList: string[] = []

  try {
    const fileReadStream = _.createReadStream(_.filePath)

    for await (const chunk of fileReadStream) {
      chunkList.push(TO_STRING(chunk).trim())
    }
  } catch { }

  return chunkList.join('')
}
