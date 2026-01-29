import { describe, expect, it } from 'bun:test'
import { GET_AES_GCM_KEY_BUFFER } from '../../ts/aes/get-aes-gcm-key-buffer.util.js'

describe(
  'GET_AES_GCM_KEY_BUFFER',
  () => {
    const testCases = [
      {
        name: 'should read and decode base64 AES key from file',
        base64Key: 'SGVsbG8gV29ybGQ=',
        filePath: '/path/to/aes-key.txt',
        chunks: [Buffer.from('SGVsbG8gV29ybGQ=')],
        expected: Buffer.from('SGVsbG8gV29ybGQ=', 'base64'),
      },
      {
        name: 'should handle multi-chunk file content',
        base64Key: 'SGVsbG8gV29ybGQ=',
        filePath: '/tmp/key.txt',
        chunks: [Buffer.from('SGVsbG8g'), Buffer.from('V29ybGQ=')],
        expected: Buffer.from('SGVsbG8gV29ybGQ=', 'base64'),
      },
      {
        name: 'should handle empty file',
        base64Key: '',
        filePath: '/tmp/empty.txt',
        chunks: [Buffer.from('')],
        expected: Buffer.from('', 'base64'),
      },
    ]

    it.each(testCases)(
      '%s',
      async testCase => {
        const mockReadStream = {
          async * [Symbol.asyncIterator] () {
            for (const chunk of testCase.chunks) {
              yield chunk
            }
          },
        }

        const mockCreateReadStream = (filePath: string) => mockReadStream

        const result = await GET_AES_GCM_KEY_BUFFER({
          Buffer,
          createReadStream: mockCreateReadStream,
          aes128GcmKeyFile: testCase.filePath,
        })

        expect(result).toEqual(testCase.expected)
      }
    )
  }
)
