import { describe, expect, it } from 'bun:test'
import { GET_CLOUDFRONT_URL_FROM_ANY_STRING } from '../../ts/string/get-cloudfront-url-from-any-string.util.js'

describe(
  'GET_CLOUDFRONT_URL_FROM_ANY_STRING',
  () => {
    const basenameFn = (s: string) => s.split('/').pop() ?? ''

    const testCases = [
      {
        input: {
          basename: basenameFn,
          s: '123e4567-e89b-12d3-a456-426614174000',
          cloudfrontUri: 'https://cdn.example.com',
          fileUploadFolder: '/uploads',
          publicStaticImageFolder: '/static',
        },
        expected: { contains: 'https://cdn.example.com' },
      },
      {
        input: {
          basename: basenameFn,
          s: '/uploads/myfile.txt',
          cloudfrontUri: 'https://cdn.example.com',
          fileUploadFolder: '/uploads',
          publicStaticImageFolder: '/static',
        },
        expected: 'https://cdn.example.com/myfile.txt',
      },
      {
        input: {
          basename: basenameFn,
          s: '/static/image.png',
          cloudfrontUri: 'https://cdn.example.com',
          fileUploadFolder: '/uploads',
          publicStaticImageFolder: '/static',
        },
        expected: 'https://cdn.example.com/image.png',
      },
      {
        input: {
          basename: basenameFn,
          s: 'https://example.com/path/to/file.jpg',
          cloudfrontUri: 'https://cdn.example.com',
          fileUploadFolder: '/uploads',
          publicStaticImageFolder: '/static',
        },
        expected: 'https://cdn.example.com/file.jpg',
      },
      {
        input: {
          basename: basenameFn,
          s: 'plainfile.doc',
          cloudfrontUri: 'https://cdn.example.com',
          fileUploadFolder: '/uploads',
          publicStaticImageFolder: '/static',
        },
        expected: 'https://cdn.example.com/plainfile.doc',
      },
    ]

    it.each(testCases)(
      'handles "$input.s"',
      ({ input, expected }) => {
        const result = GET_CLOUDFRONT_URL_FROM_ANY_STRING(input)
        if (typeof expected === 'string') {
          expect(result).toBe(expected)
        } else {
          expect(result).toContain(expected.contains)
        }
      }
    )
  }
)
