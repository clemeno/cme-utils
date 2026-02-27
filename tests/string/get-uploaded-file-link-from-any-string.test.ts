import { describe, expect, it } from 'bun:test'
import { basename } from 'node:path'
import { GET_UPLOADED_FILE_LINK_FROM_ANY_STRING } from '../../ts/string/get-uploaded-file-link-from-any-string.util.js'

describe(
  'GET_UPLOADED_FILE_LINK_FROM_ANY_STRING',
  () => {
    const testCases = [
      {
        input: {
          basename,
          s: 'file.png',
          publicStaticImageFolder: '/static',
        },
        expected: '/static/file.png',
      },
      {
        input: {
          basename,
          s: '123e4567-e89b-12d3-a456-426614174000',
          fileUploadFolder: '/uploads',
          publicStaticImageFolder: '/static',
        },
        expected: { contains: '/static/' },
      },
      {
        input: {
          basename,
          s: '/uploads/myfile.txt',
          fileUploadFolder: '/uploads',
          publicStaticImageFolder: '/static',
        },
        expected: '/static/myfile.txt',
      },
      {
        input: {
          basename,
          s: '/static/image.png',
          fileUploadFolder: '/uploads',
          publicStaticImageFolder: '/static',
        },
        expected: '/static/image.png',
      },
      {
        input: {
          basename,
          s: 'https://example.com/path/to/file.jpg',
          fileUploadFolder: '/uploads',
          publicStaticImageFolder: '/static',
        },
        expected: '/static/file.jpg',
      },
    ]

    it.each(testCases)(
      'handles "$input.s"',
      ({ input, expected }) => {
        const result = GET_UPLOADED_FILE_LINK_FROM_ANY_STRING(input)
        if (typeof expected === 'string') {
          expect(result).toBe(expected)
        } else {
          expect(result).toContain(expected.contains)
        }
      }
    )
  }
)
