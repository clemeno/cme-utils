import { describe, expect, it } from 'bun:test'
import { GET_UPLOADED_FILE_FROM_ANY_STRING } from '../../ts/string/get-uploaded-file-from-any-string.util.js'

describe(
  'GET_UPLOADED_FILE_FROM_ANY_STRING',
  () => {
    const basenameFn = (s: string) => s.split('/').pop() ?? ''

    const testCases = [
      {
        input: {
          s: 'file.png',
          fileUploadFolder: '/uploads',
        },
        expected: '/uploads/file.png',
      },
      {
        input: {
          basename: basenameFn,
          s: '123e4567-e89b-12d3-a456-426614174000',
          fileUploadFolder: '/uploads',
          publicStaticImageFolder: '/static',
        },
        expected: { contains: '/uploads/' },
      },
      {
        input: {
          basename: basenameFn,
          s: '/uploads/myfile.txt',
          fileUploadFolder: '/uploads',
          publicStaticImageFolder: '/static',
        },
        expected: '/uploads/myfile.txt',
      },
      {
        input: {
          basename: basenameFn,
          s: '/static/image.png',
          fileUploadFolder: '/uploads',
          publicStaticImageFolder: '/static',
        },
        expected: '/uploads/image.png',
      },
      {
        input: {
          basename: basenameFn,
          s: 'https://example.com/path/to/file.jpg',
          fileUploadFolder: '/uploads',
          publicStaticImageFolder: '/static',
        },
        expected: '/uploads/file.jpg',
      },
    ]

    it(
      'should handle various inputs correctly',
      () => {
        for (const { input, expected } of testCases) {
          const result = GET_UPLOADED_FILE_FROM_ANY_STRING(input)
          if (typeof expected === 'string') {
            expect(result).toBe(expected)
          } else if (expected.contains !== undefined) {
            expect(result).toContain(expected.contains)
          }
        }
      }
    )
  }
)
