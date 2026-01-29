import { describe, expect, it } from 'bun:test'
import { GET_FILE_FULL_TEXT_CONTENT } from '../../ts/file/get-file-full-text-content.util.js'

describe(
  'GET_FILE_FULL_TEXT_CONTENT',
  () => {
    it(
      'should read text file content',
      async () => {
        const mockReadStream = {
          async * [Symbol.asyncIterator] () {
            yield Buffer.from('Hello ')
            yield Buffer.from('world!')
          },
        }

        const mockCreateReadStream = (filePath: string) => {
          expect(filePath).toBe('/tmp/test.txt')
          return mockReadStream
        }

        const result = await GET_FILE_FULL_TEXT_CONTENT({
          createReadStream: mockCreateReadStream,
          filePath: '/tmp/test.txt',
        })

        expect(result).toBe('Helloworld!')
      }
    )

    it(
      'should handle single chunk',
      async () => {
        const mockReadStream = {
          async * [Symbol.asyncIterator] () {
            yield Buffer.from('Single chunk content')
          },
        }

        const mockCreateReadStream = () => mockReadStream

        const result = await GET_FILE_FULL_TEXT_CONTENT({
          createReadStream: mockCreateReadStream,
          filePath: '/tmp/single.txt',
        })

        expect(result).toBe('Single chunk content')
      }
    )

    it(
      'should handle empty file',
      async () => {
        const mockReadStream = {
          async * [Symbol.asyncIterator] () {
            // No chunks
          },
        }

        const mockCreateReadStream = () => mockReadStream

        const result = await GET_FILE_FULL_TEXT_CONTENT({
          createReadStream: mockCreateReadStream,
          filePath: '/tmp/empty.txt',
        })

        expect(result).toBe('')
      }
    )

    it(
      'should handle file read errors gracefully',
      async () => {
        const mockCreateReadStream = () => {
          throw new Error('File not found')
        }

        const result = await GET_FILE_FULL_TEXT_CONTENT({
          createReadStream: mockCreateReadStream,
          filePath: '/tmp/nonexistent.txt',
        })

        expect(result).toBe('')
      }
    )

    it(
      'should trim whitespace from chunks',
      async () => {
        const mockReadStream = {
          async * [Symbol.asyncIterator] () {
            yield Buffer.from('  line 1  \n')
            yield Buffer.from('  line 2  ')
          },
        }

        const mockCreateReadStream = () => mockReadStream

        const result = await GET_FILE_FULL_TEXT_CONTENT({
          createReadStream: mockCreateReadStream,
          filePath: '/tmp/spaces.txt',
        })

        expect(result).toBe('line 1line 2')
      }
    )
  }
)
