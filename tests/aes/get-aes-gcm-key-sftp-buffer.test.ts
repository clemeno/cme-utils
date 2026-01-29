import { describe, expect, it } from 'bun:test'
import { GET_AES_GCM_KEY_SFTP_BUFFER } from '../../ts/aes/get-aes-gcm-key-sftp-buffer.util.js'

describe(
  'GET_AES_GCM_KEY_SFTP_BUFFER',
  () => {
    const testCases = [
      {
        name: 'should read and decode base64 AES SFTP key from file',
        base64Key: 'U0ZUUCBLZXkgQ29udGVudA==',
        filePath: '/path/to/sftp-key.txt',
        chunks: [Buffer.from('U0ZUUCBLZXkgQ29udGVudA==')],
        expected: Buffer.from('U0ZUUCBLZXkgQ29udGVudA==', 'base64'),
      },
      {
        name: 'should handle multi-chunk SFTP key file',
        base64Key: 'U0ZUUCBLZXkgUGFydCAy',
        filePath: '/tmp/sftp-key.txt',
        chunks: [Buffer.from('U0ZUUCBLZXkg'), Buffer.from('UGFydCAy')],
        expected: Buffer.from('U0ZUUCBLZXkgUGFydCAy', 'base64'),
      },
      {
        name: 'should handle empty SFTP key file',
        base64Key: '',
        filePath: '/tmp/empty-sftp.txt',
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

        const result = await GET_AES_GCM_KEY_SFTP_BUFFER({
          Buffer,
          createReadStream: mockCreateReadStream,
          aes128GcmKeySftpFile: testCase.filePath,
        })

        expect(result).toEqual(testCase.expected)
      }
    )
  }
)
