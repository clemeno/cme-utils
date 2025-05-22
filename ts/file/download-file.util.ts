/**
 * import { writeFile } from 'node:fs/promises'
 */
export async function DOWNLOAD_FILE (_: {
  srcUrl: string
  destPath: string
  /** @type {axios} */
  axios: any
  writeFile: any
}): Promise<void> {
  const response = await _.axios.get(_.srcUrl, { responseType: 'arraybuffer' })
  await _.writeFile(_.destPath, response.data as Buffer)
}
