import { describe, expect, it } from 'bun:test'
import { createMockAxios, createMockWriteFile } from './file-mocks.js'

describe(
  'File Mocks',
  () => {
    describe(
      'createMockAxios',
      () => {
        it.each<{ name: string, options: Parameters<typeof createMockAxios>[0], expected: Buffer }>([
          { name: 'default data', options: undefined, expected: Buffer.from('mock data') },
          { name: 'custom data', options: { data: Buffer.from('custom data') }, expected: Buffer.from('custom data') },
        ])(
          'should create a mock axios resolving with $name',
          async ({ options, expected }) => {
            const mock = createMockAxios(options)
            expect(await mock.get('http://example.com', {})).toEqual({ data: expected })
          }
        )

        it(
          'should throw error when shouldThrow is true',
          async () => {
            const mock = createMockAxios({ shouldThrow: true, errorMessage: 'custom error' })
            await expect(mock.get('http://example.com', {})).rejects.toThrow('custom error')
          }
        )

        it.each<{ name: string, calls: Array<[string, Record<string, unknown>]> }>([
          { name: 'return empty calls array initially', calls: [] },
          { name: 'track get calls', calls: [['http://example.com', { headers: { 'user-agent': 'test' } }], ['http://example2.com', { timeout: 5000 }]] },
        ])(
          'should $name',
          async ({ calls }) => {
            const mock = createMockAxios()
            for (const [vUrl, vOptions] of calls) {
              await mock.get(vUrl, vOptions)
            }
            expect(mock.getCalls()).toEqual(calls)
          }
        )
      }
    )

    describe(
      'createMockWriteFile',
      () => {
        it(
          'should throw error when shouldThrow is true',
          async () => {
            const mock = createMockWriteFile({ shouldThrow: true, errorMessage: 'write error' })
            await expect(mock('/path/to/file.txt', Buffer.from('data'))).rejects.toThrow('write error')
          }
        )

        it.each<{ name: string, calls: Array<[string, Buffer]> }>([
          { name: 'return empty calls array initially', calls: [] },
          { name: 'create a mock writeFile function', calls: [['/path/to/file.txt', Buffer.from('test data')]] },
          { name: 'track multiple write calls', calls: [['/file1.txt', Buffer.from('data1')], ['/file2.txt', Buffer.from('data2')]] },
        ])(
          'should $name',
          async ({ calls }) => {
            const mock = createMockWriteFile()
            for (const [vPath, vData] of calls) {
              await mock(vPath, vData)
            }
            expect(mock.getCalls()).toEqual(calls)
          }
        )
      }
    )
  }
)
