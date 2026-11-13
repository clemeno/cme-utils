import { afterEach, describe, expect, it, jest, mock, spyOn } from 'bun:test'
import { DOWNLOAD_FILE } from '../../ts/file/download-file.util.js'
import { createMockAxios, createMockWriteFile } from '../mocks/file-mocks.js'

/** A browser document whose download link records, in order, its creation, its append to the body, its click (with its href and download) and its removal. */
function createMockDownloadDocument (): { mockDocument: object, events: string[] } {
  const events: string[] = []
  const link = {
    href: '',
    download: '',
    click: () => {
      events.push(`click ${link.href} ${link.download}`)
    },
    remove: () => {
      events.push('remove')
    },
  }
  const mockDocument = {
    createElement: (tagName: string) => {
      events.push(`createElement ${tagName}`)
      return link
    },
    body: {
      append: () => {
        events.push('append')
      },
    },
  }
  return { mockDocument, events }
}

describe(
  'DOWNLOAD_FILE',
  () => {
    const originalWindow = global.window

    // restore even when an assertion fails, so a broken case can't leak a mocked window, URL or clock into other tests
    afterEach(() => {
      global.window = originalWindow
      mock.restore()
      jest.useRealTimers()
    })

    it.each<{ name: string, data: Buffer, srcUrl: string, destPath: string }>([
      { name: 'should download a file and save it to disk', data: Buffer.from('file content'), srcUrl: 'https://example.com/file.txt', destPath: '/tmp/test.txt' },
      // JPEG header
      { name: 'should handle different file types', data: Buffer.from([0xFF, 0xD8, 0xFF, 0xE0]), srcUrl: 'https://example.com/image.jpg', destPath: '/tmp/image.jpg' },
    ])(
      '$name',
      async ({ data, srcUrl, destPath }) => {
        const mockAxios = createMockAxios({ data })
        const mockWriteFile = createMockWriteFile()

        await DOWNLOAD_FILE({
          axios: mockAxios,
          writeFile: mockWriteFile,
          srcUrl,
          destPath,
        })

        expect(mockAxios.getCalls()).toEqual([[srcUrl, { responseType: 'arraybuffer' }]])
        expect(mockWriteFile.getCalls()).toEqual([[destPath, data]])
      }
    )

    it.each<{
      name: string
      axiosOptions: Parameters<typeof createMockAxios>[0]
      writeFileOptions: Parameters<typeof createMockWriteFile>[0]
      expected: string
      expectedWriteFileCalls: Array<[string, Buffer]>
    }>([
      { name: 'should propagate axios errors', axiosOptions: { shouldThrow: true, errorMessage: 'Network error' }, writeFileOptions: {}, expected: 'Network error', expectedWriteFileCalls: [] },
      { name: 'should propagate writeFile errors', axiosOptions: { data: Buffer.from('content') }, writeFileOptions: { shouldThrow: true, errorMessage: 'Disk full' }, expected: 'Disk full', expectedWriteFileCalls: [['/tmp/test.txt', Buffer.from('content')]] },
    ])(
      '$name',
      async ({ axiosOptions, writeFileOptions, expected, expectedWriteFileCalls }) => {
        const mockAxios = createMockAxios(axiosOptions)
        const mockWriteFile = createMockWriteFile(writeFileOptions)

        await expect(DOWNLOAD_FILE({
          axios: mockAxios,
          writeFile: mockWriteFile,
          srcUrl: 'https://example.com/file.txt',
          destPath: '/tmp/test.txt',
        })).rejects.toThrow(new Error(expected))

        expect(mockAxios.getCalls()).toEqual([['https://example.com/file.txt', { responseType: 'arraybuffer' }]])
        expect(mockWriteFile.getCalls()).toEqual(expectedWriteFileCalls)
      }
    )

    it.each<{ name: string, destPath: string, expectedDownload: string }>([
      { name: 'without writeFile, a browser downloads the file under the last segment of destPath', destPath: 'files/report.pdf', expectedDownload: 'report.pdf' },
      { name: 'without writeFile, a Windows separator ends the path too', destPath: 'C:\\files\\report.pdf', expectedDownload: 'report.pdf' },
      { name: 'without writeFile, a bare file name names the download', destPath: 'report.pdf', expectedDownload: 'report.pdf' },
    ])(
      '$name',
      async ({ destPath, expectedDownload }) => {
        const { mockDocument, events } = createMockDownloadDocument()
        global.window = { document: mockDocument } as any
        const createObjectUrlSpy = spyOn(URL, 'createObjectURL').mockImplementation(() => {
          events.push('createObjectURL')
          return 'blob:mock'
        })
        spyOn(URL, 'revokeObjectURL').mockImplementation(url => {
          events.push(`revoke ${url}`)
        })
        const mockAxios = createMockAxios({ data: Buffer.from('file content') })
        jest.useFakeTimers()
        const eventsAfterClick = ['createObjectURL', 'createElement a', 'append', `click blob:mock ${expectedDownload}`, 'remove']

        await DOWNLOAD_FILE({ axios: mockAxios, srcUrl: 'https://example.com/report.pdf', destPath })

        expect(mockAxios.getCalls()).toEqual([['https://example.com/report.pdf', { responseType: 'arraybuffer' }]])
        expect(await (createObjectUrlSpy.mock.calls[0]?.[0] as Blob).text()).toBe('file content')
        expect(events).toEqual(eventsAfterClick)
        jest.advanceTimersByTime(39999)
        expect(events).toEqual(eventsAfterClick)
        jest.advanceTimersByTime(1)
        expect(events).toEqual([...eventsAfterClick, 'revoke blob:mock'])
      }
    )

    it.each<{ name: string }>([
      { name: 'with writeFile, a browser writes the file and creates no link' },
    ])(
      '$name',
      async () => {
        const { mockDocument, events } = createMockDownloadDocument()
        global.window = { document: mockDocument } as any
        const mockAxios = createMockAxios({ data: Buffer.from('file content') })
        const mockWriteFile = createMockWriteFile()

        await DOWNLOAD_FILE({ axios: mockAxios, writeFile: mockWriteFile, srcUrl: 'https://example.com/report.pdf', destPath: 'report.pdf' })

        expect(mockWriteFile.getCalls()).toEqual([['report.pdf', Buffer.from('file content')]])
        expect(events).toEqual([])
      }
    )

    it.each<{ name: string, expected: string }>([
      { name: 'without writeFile and without a browser document, rejects before the download', expected: 'DOWNLOAD_FILE needs writeFile (node:fs/promises) or a browser document: on Node and bun pass writeFile' },
    ])(
      '$name',
      async ({ expected }) => {
        delete (global as any).window
        const mockAxios = createMockAxios()

        await expect(DOWNLOAD_FILE({ axios: mockAxios, srcUrl: 'https://example.com/report.pdf', destPath: 'report.pdf' })).rejects.toThrow(new Error(expected))

        expect(mockAxios.getCalls()).toEqual([])
      }
    )
  }
)
