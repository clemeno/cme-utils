import { describe, expect, it } from 'bun:test'
import { createMockAxios, createMockWriteFile } from './file-mocks.js'

describe(
  'File Mocks',
  () => {
    describe(
      'createMockAxios',
      () => {
        it(
          'should create a mock axios with default data',
          async () => {
            const mock = createMockAxios()
            const response = await mock.get('http://example.com', {})
            expect(response.data).toEqual(Buffer.from('mock data'))
          }
        )

        it(
          'should create a mock axios with custom data',
          async () => {
            const customData = Buffer.from('custom data')
            const mock = createMockAxios({ data: customData })
            const response = await mock.get('http://example.com', {})
            expect(response.data).toEqual(customData)
          }
        )

        it(
          'should throw error when shouldThrow is true',
          async () => {
            const mock = createMockAxios({ shouldThrow: true, errorMessage: 'custom error' })
            await expect(mock.get('http://example.com', {})).rejects.toThrow('custom error')
          }
        )

        it(
          'should track get calls',
          async () => {
            const mock = createMockAxios()
            await mock.get('http://example.com', { headers: { 'user-agent': 'test' } })
            await mock.get('http://example2.com', { timeout: 5000 })

            const calls = mock.getCalls()
            expect(calls).toHaveLength(2)
            expect(calls[0]).toEqual(['http://example.com', { headers: { 'user-agent': 'test' } }])
            expect(calls[1]).toEqual(['http://example2.com', { timeout: 5000 }])
          }
        )

        it(
          'should return empty calls array initially',
          () => {
            const mock = createMockAxios()
            expect(mock.getCalls()).toEqual([])
          }
        )
      }
    )

    describe(
      'createMockWriteFile',
      () => {
        it(
          'should create a mock writeFile function',
          async () => {
            const mock = createMockWriteFile()
            const data = Buffer.from('test data')
            await mock('/path/to/file.txt', data)

            const calls = mock.getCalls()
            expect(calls).toHaveLength(1)
            expect(calls[0]).toEqual(['/path/to/file.txt', data])
          }
        )

        it(
          'should throw error when shouldThrow is true',
          async () => {
            const mock = createMockWriteFile({ shouldThrow: true, errorMessage: 'write error' })
            await expect(mock('/path/to/file.txt', Buffer.from('data'))).rejects.toThrow('write error')
          }
        )

        it(
          'should track multiple write calls',
          async () => {
            const mock = createMockWriteFile()
            const data1 = Buffer.from('data1')
            const data2 = Buffer.from('data2')

            await mock('/file1.txt', data1)
            await mock('/file2.txt', data2)

            const calls = mock.getCalls()
            expect(calls).toHaveLength(2)
            expect(calls[0]).toEqual(['/file1.txt', data1])
            expect(calls[1]).toEqual(['/file2.txt', data2])
          }
        )

        it(
          'should return empty calls array initially',
          () => {
            const mock = createMockWriteFile()
            expect(mock.getCalls()).toEqual([])
          }
        )
      }
    )
  }
)
