import { IS_SET } from '../check/is-set.util.js'

const objectUrlLifetimeMs = 40000

/**
 * Downloads a URL with an axios GET (as an arraybuffer) and saves the response body: with `writeFile` to a file, or
 * without it as a browser download, named after the last segment of `destPath`.
 * * provide axios -> import axios from 'axios'
 * * on Node and bun, provide writeFile -> import { writeFile } from 'node:fs/promises'
 * @param _ - The parameter object
 * @param _.axios - The `axios` instance
 * @param _.writeFile - The `writeFile` function of `node:fs/promises`; without it, the browser downloads the file
 * @param _.srcUrl - The URL to download
 * @param _.destPath - The path of the file to write; in a browser, its last segment names the download
 * @returns A promise that resolves once the file is written, or once the browser download starts (its object URL is
 * revoked 40 s later); it rejects with the axios or write error, and, before the download, when there is neither
 * `writeFile` nor a browser document
 * @example
 * ```typescript
 * await DOWNLOAD_FILE({ axios, writeFile, srcUrl: 'https://example.com/a.pdf', destPath: 'a.pdf' }) // returns undefined
 * // in a browser, without writeFile: the browser saves the download as a.pdf
 * await DOWNLOAD_FILE({ axios, srcUrl: 'https://example.com/a.pdf', destPath: 'files/a.pdf' }) // returns undefined
 * // an unreachable URL rejects
 * await DOWNLOAD_FILE({ axios, writeFile, srcUrl: 'https://example.invalid/a.pdf', destPath: 'a.pdf' }) // throws AxiosError
 * ```
 */
export async function DOWNLOAD_FILE<AxiosStatic = any, TypeofWriteFile = any> (_: {
  axios: AxiosStatic
  writeFile?: TypeofWriteFile
  srcUrl: string
  destPath: string
}): Promise<void> {
  const { writeFile, destPath } = _
  const browserDocument = globalThis.window?.document

  // checked before the download: without either, the file would go nowhere
  if (!IS_SET(writeFile) && !IS_SET(browserDocument)) {
    throw new Error('DOWNLOAD_FILE needs writeFile (node:fs/promises) or a browser document: on Node and bun pass writeFile')
  }

  // response.data: a Buffer on Node and bun, an ArrayBuffer in a browser
  const response = await (_.axios as any).get(_.srcUrl, { responseType: 'arraybuffer' })

  if (IS_SET(writeFile)) {
    await (writeFile as any)(destPath, response.data)
  } else {
    const objectUrl = URL.createObjectURL(new Blob([response.data]))
    const link = browserDocument.createElement('a')
    link.href = objectUrl
    link.download = destPath.replace(/^.*[\\/]/, '')
    browserDocument.body.append(link)
    link.click()
    link.remove()

    // revoked later: Safari has failed downloads whose blob URL was revoked in the tick of the click (FileSaver.js waits 40 s too)
    setTimeout(() => {
      URL.revokeObjectURL(objectUrl)
    }, objectUrlLifetimeMs)
  }
}
