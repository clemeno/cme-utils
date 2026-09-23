import { describe, expect, it } from 'bun:test'
import { DOWNLOAD_FILE } from '../../ts/file/download-file.util.js'
import { createMockAxios, createMockWriteFile } from '../mocks/file-mocks.js'

describe(
  'DOWNLOAD_FILE',
  () => {
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
  }
)
