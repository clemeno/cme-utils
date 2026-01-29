import { describe, expect, it } from 'bun:test'
import { DOWNLOAD_FILE } from '../../ts/file/download-file.util.js'
import { createMockAxios, createMockWriteFile } from '../mocks/file-mocks.js'

describe(
  'DOWNLOAD_FILE',
  () => {
    it(
      'should download a file and save it to disk',
      async () => {
        const mockAxios = createMockAxios({ data: Buffer.from('file content') })
        const mockWriteFile = createMockWriteFile()

        await DOWNLOAD_FILE({
          axios: mockAxios,
          writeFile: mockWriteFile,
          srcUrl: 'https://example.com/file.txt',
          destPath: '/tmp/test.txt',
        })

        expect(mockAxios.getCalls()).toEqual([['https://example.com/file.txt', { responseType: 'arraybuffer' }]])
        expect(mockWriteFile.getCalls()).toEqual([['/tmp/test.txt', Buffer.from('file content')]])
      }
    )

    it(
      'should handle different file types',
      async () => {
        const binaryData = Buffer.from([0xFF, 0xD8, 0xFF, 0xE0]) // JPEG header

        const mockAxios = createMockAxios({ data: binaryData })
        const mockWriteFile = createMockWriteFile()

        await DOWNLOAD_FILE({
          axios: mockAxios,
          writeFile: mockWriteFile,
          srcUrl: 'https://example.com/image.jpg',
          destPath: '/tmp/image.jpg',
        })

        expect(mockWriteFile.getCalls()).toEqual([['/tmp/image.jpg', binaryData]])
      }
    )

    it(
      'should propagate axios errors',
      async () => {
        const mockAxios = createMockAxios({ shouldThrow: true, errorMessage: 'Network error' })
        const mockWriteFile = createMockWriteFile()

        await expect(DOWNLOAD_FILE({
          axios: mockAxios,
          writeFile: mockWriteFile,
          srcUrl: 'https://example.com/file.txt',
          destPath: '/tmp/test.txt',
        })).rejects.toThrow('Network error')

        expect(mockWriteFile.getCalls()).toEqual([])
      }
    )

    it(
      'should propagate writeFile errors',
      async () => {
        const mockAxios = createMockAxios({ data: Buffer.from('content') })
        const mockWriteFile = createMockWriteFile({ shouldThrow: true, errorMessage: 'Disk full' })

        await expect(DOWNLOAD_FILE({
          axios: mockAxios,
          writeFile: mockWriteFile,
          srcUrl: 'https://example.com/file.txt',
          destPath: '/tmp/test.txt',
        })).rejects.toThrow('Disk full')
      }
    )
  }
)
