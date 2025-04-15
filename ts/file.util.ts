import axios from 'axios'
import { TO_STRING } from 'convert/to-string.util'
import { createReadStream } from 'node:fs'
import { writeFile } from 'node:fs/promises'

// eslint-disable-next-line max-params
export async function DOWNLOAD_FILE (srcUrl: string, destPath: string): Promise<void> {
  const response = await axios.get(srcUrl, { responseType: 'arraybuffer' })
  await writeFile(destPath, response.data as Buffer)
}

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
