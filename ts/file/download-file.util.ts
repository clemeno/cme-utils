/**
 * * provide axios -> import axios from 'axios'
 * * provide writeFile -> import { writeFile } from 'node:fs/promises'
 */
export const DOWNLOAD_FILE = async <AxiosStatic = any, TypeofWriteFile = any> (_: {
  axios: AxiosStatic
  writeFile: TypeofWriteFile
  srcUrl: string
  destPath: string
}): Promise<void> => {
  const response = await (_.axios as any).get(_.srcUrl, { responseType: 'arraybuffer' })

  // response.data as Buffer
  await (_.writeFile as any)(_.destPath, response.data as any)
}
