import { createReadStream } from 'node:fs'
import { TO_STRING } from '../convert/to-string.util.js'

export const GET_FILE_FULL_TEXT_CONTENT = async (filePath: string): Promise<string> => {
  const chunkList: string[] = []

  try {
    const fileReadStream = createReadStream(filePath)

    for await (const chunk of fileReadStream) {
      chunkList.push(TO_STRING(chunk).trim())
    }
  } catch { }

  return chunkList.join('')
}
