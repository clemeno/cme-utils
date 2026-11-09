/**
 * Downloads a URL with an axios GET (as an arraybuffer) and writes the response body to a file.
 * * provide axios -> import axios from 'axios'
 * * provide writeFile -> import { writeFile } from 'node:fs/promises'
 * @param _ - The parameter object
 * @param _.axios - The `axios` instance
 * @param _.writeFile - The `writeFile` function of `node:fs/promises`
 * @param _.srcUrl - The URL to download
 * @param _.destPath - The path of the file to write
 * @returns A promise that resolves once the file is written; it rejects with the axios or write error
 * @example
 * ```typescript
 * await DOWNLOAD_FILE({ axios, writeFile, srcUrl: 'https://example.com/a.pdf', destPath: 'a.pdf' }) // returns undefined
 * // an unreachable URL rejects
 * await DOWNLOAD_FILE({ axios, writeFile, srcUrl: 'https://example.invalid/a.pdf', destPath: 'a.pdf' }) // throws AxiosError
 * ```
 */
export async function DOWNLOAD_FILE<AxiosStatic = any, TypeofWriteFile = any> (_: {
  axios: AxiosStatic
  writeFile: TypeofWriteFile
  srcUrl: string
  destPath: string
}): Promise<void> {
  const response = await (_.axios as any).get(_.srcUrl, { responseType: 'arraybuffer' })

  // response.data as Buffer
  await (_.writeFile as any)(_.destPath, response.data as any)
}
