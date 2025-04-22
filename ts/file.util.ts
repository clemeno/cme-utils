import { TO_STRING } from 'convert/to-string.util'
import { createReadStream } from 'node:fs'
import { writeFile } from 'node:fs/promises'

export async function DOWNLOAD_FILE (_: {
  srcUrl: string
  destPath: string
  /** @type {axios} */
  axios: any
}): Promise<void> {
  const response = await _.axios.get(_.srcUrl, { responseType: 'arraybuffer' })
  await writeFile(_.destPath, response.data as Buffer)
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
