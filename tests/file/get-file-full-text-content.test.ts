import { describe, expect, it } from 'bun:test'
import { GET_FILE_FULL_TEXT_CONTENT } from '../../ts/file/get-file-full-text-content.util.js'
import { createMockReadStream } from '../mocks/file-mocks.js'

describe(
  'GET_FILE_FULL_TEXT_CONTENT',
  () => {
    it.each<{ name: string, openStream: () => AsyncIterable<Buffer>, filePath: string, expected: string }>([
      { name: 'should read text file content', openStream: () => createMockReadStream([Buffer.from('Hello '), Buffer.from('world!')]), filePath: '/tmp/test.txt', expected: 'Helloworld!' },
      { name: 'should handle single chunk', openStream: () => createMockReadStream([Buffer.from('Single chunk content')]), filePath: '/tmp/single.txt', expected: 'Single chunk content' },
      { name: 'should handle empty file', openStream: () => createMockReadStream([]), filePath: '/tmp/empty.txt', expected: '' },
      { name: 'should trim whitespace from chunks', openStream: () => createMockReadStream([Buffer.from('  line 1  \n'), Buffer.from('  line 2  ')]), filePath: '/tmp/spaces.txt', expected: 'line 1line 2' },
      { name: 'should handle file read errors gracefully', openStream: () => { throw new Error('File not found') }, filePath: '/tmp/nonexistent.txt', expected: '' },
      {
        name: 'should keep the chunks read before an error in the middle of the stream',
        openStream: async function * () {
          yield Buffer.from('partial ')
          throw new Error('Read error')
        },
        filePath: '/tmp/partial.txt',
        expected: 'partial',
      },
    ])(
      '$name',
      async ({ openStream, filePath, expected }) => {
        const vPathList: string[] = []
        const mockCreateReadStream = (inFilePath: string): AsyncIterable<Buffer> => {
          vPathList.push(inFilePath)
          return openStream()
        }

        const result = await GET_FILE_FULL_TEXT_CONTENT({
          createReadStream: mockCreateReadStream,
          filePath,
        })

        expect(result).toBe(expected)
        expect(vPathList).toEqual([filePath])
      }
    )
  }
)
