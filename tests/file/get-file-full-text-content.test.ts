import { describe, expect, it } from 'bun:test'
import { GET_FILE_FULL_TEXT_CONTENT } from '../../ts/file/get-file-full-text-content.util.js'
import { createMockReadStream, createMockWebReadStream } from '../mocks/file-mocks.js'

/** What a createReadStream gives: a Node-like stream, a web stream, or the null body of a fetch response without one */
type ReadSource = AsyncIterable<Buffer | string> | ReadableStream<Uint8Array> | null

describe(
  'GET_FILE_FULL_TEXT_CONTENT',
  () => {
    it.each<{ name: string, openStream: () => ReadSource | Promise<ReadSource>, filePath: string, expected: string }>([
      { name: 'should read text file content, keeping whitespace at chunk boundaries', openStream: () => createMockReadStream([Buffer.from('Hello '), Buffer.from('world!')]), filePath: '/tmp/test.txt', expected: 'Hello world!' },
      { name: 'should handle single chunk', openStream: () => createMockReadStream([Buffer.from('Single chunk content')]), filePath: '/tmp/single.txt', expected: 'Single chunk content' },
      { name: 'should handle empty file', openStream: () => createMockReadStream([]), filePath: '/tmp/empty.txt', expected: '' },
      { name: 'should trim the whole content once, not each chunk', openStream: () => createMockReadStream([Buffer.from('  line 1  \n'), Buffer.from('  line 2  \n')]), filePath: '/tmp/spaces.txt', expected: 'line 1  \n  line 2' },
      { name: 'should keep a multi-byte character split between chunks', openStream: () => createMockReadStream([Buffer.from([0x63, 0x61, 0x66, 0xC3]), Buffer.from([0xA9])]), filePath: '/tmp/utf8.txt', expected: 'café' },
      { name: 'should keep a 4-byte character split over three chunks', openStream: () => createMockReadStream([Buffer.from([0xF0, 0x9F]), Buffer.from([0x98]), Buffer.from([0x80, 0x21])]), filePath: '/tmp/emoji.txt', expected: '😀!' },
      { name: 'should accept string chunks (stream opened with an encoding)', openStream: () => createMockReadStream(['base64Key', '==\n']), filePath: '/tmp/key.txt', expected: 'base64Key==' },
      { name: 'should read a web ReadableStream through its reader, as Safari has no async iteration of it', openStream: () => createMockWebReadStream({ chunks: [Buffer.from(' Hello '), Buffer.from('world!\n')] }), filePath: '/hello.txt', expected: 'Hello world!' },
      { name: 'should keep a multi-byte character split between 2 web stream chunks', openStream: () => createMockWebReadStream({ chunks: [new Uint8Array([0x63, 0x61, 0x66, 0xC3]), new Uint8Array([0xA9])] }), filePath: '/utf8.txt', expected: 'café' },
      { name: 'should read an empty web stream', openStream: () => createMockWebReadStream({ chunks: [] }), filePath: '/empty.txt', expected: '' },
      { name: 'should await a promise of a web stream (a fetch based createReadStream)', openStream: async () => createMockWebReadStream({ chunks: [Buffer.from('fetched')] }), filePath: '/fetched.txt', expected: 'fetched' },
      { name: 'should await a promise of an async iterable', openStream: async () => createMockReadStream([Buffer.from('awaited')]), filePath: '/tmp/awaited.txt', expected: 'awaited' },
      { name: 'should read a null stream (the body of a 204 response or a HEAD request) as empty', openStream: async () => null, filePath: '/no-content', expected: '' },
    ])(
      '$name',
      async ({ openStream, filePath, expected }) => {
        const vPathList: string[] = []
        function mockCreateReadStream (inFilePath: string): ReadSource | Promise<ReadSource> {
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

    it.each<{ name: string, createReadStream: (inFilePath: string) => ReadSource | Promise<ReadSource>, expectedError: Error }>([
      { name: 'the file cannot be opened', createReadStream: () => { throw new Error('ENOENT: no such file or directory') }, expectedError: new Error('ENOENT: no such file or directory') },
      {
        name: 'the stream fails midway (no partial content returned)',
        createReadStream: async function * () {
          yield Buffer.from('partial ')
          throw new Error('Read error')
        },
        expectedError: new Error('Read error'),
      },
      { name: 'the reader of a web stream rejects midway (no partial content returned)', createReadStream: () => createMockWebReadStream({ chunks: [Buffer.from('partial ')], error: new Error('Network error') }), expectedError: new Error('Network error') },
      { name: 'a promised web stream fails', createReadStream: async () => createMockWebReadStream({ chunks: [], error: new Error('Network error') }), expectedError: new Error('Network error') },
    ])(
      'rejects when $name',
      async ({ createReadStream, expectedError }) => {
        await expect(GET_FILE_FULL_TEXT_CONTENT({ createReadStream, filePath: '/tmp/any.txt' })).rejects.toThrow(expectedError)
      }
    )
  }
)
