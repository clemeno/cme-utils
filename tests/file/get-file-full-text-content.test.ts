import { describe, expect, it } from 'bun:test'
import { GET_FILE_FULL_TEXT_CONTENT } from '../../ts/file/get-file-full-text-content.util.js'
import { createMockReadStream } from '../mocks/file-mocks.js'

describe(
  'GET_FILE_FULL_TEXT_CONTENT',
  () => {
    it.each<{ name: string, openStream: () => AsyncIterable<Buffer | string>, filePath: string, expected: string }>([
      { name: 'should read text file content, keeping whitespace at chunk boundaries', openStream: () => createMockReadStream([Buffer.from('Hello '), Buffer.from('world!')]), filePath: '/tmp/test.txt', expected: 'Hello world!' },
      { name: 'should handle single chunk', openStream: () => createMockReadStream([Buffer.from('Single chunk content')]), filePath: '/tmp/single.txt', expected: 'Single chunk content' },
      { name: 'should handle empty file', openStream: () => createMockReadStream([]), filePath: '/tmp/empty.txt', expected: '' },
      { name: 'should trim the whole content once, not each chunk', openStream: () => createMockReadStream([Buffer.from('  line 1  \n'), Buffer.from('  line 2  \n')]), filePath: '/tmp/spaces.txt', expected: 'line 1  \n  line 2' },
      { name: 'should keep a multi-byte character split between chunks', openStream: () => createMockReadStream([Buffer.from([0x63, 0x61, 0x66, 0xC3]), Buffer.from([0xA9])]), filePath: '/tmp/utf8.txt', expected: 'café' },
      { name: 'should keep a 4-byte character split over three chunks', openStream: () => createMockReadStream([Buffer.from([0xF0, 0x9F]), Buffer.from([0x98]), Buffer.from([0x80, 0x21])]), filePath: '/tmp/emoji.txt', expected: '😀!' },
      { name: 'should accept string chunks (stream opened with an encoding)', openStream: () => createMockReadStream(['base64Key', '==\n']), filePath: '/tmp/key.txt', expected: 'base64Key==' },
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
        const mockCreateReadStream = (inFilePath: string): AsyncIterable<Buffer | string> => {
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
