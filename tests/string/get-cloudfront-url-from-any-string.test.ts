import { describe, expect, it } from 'bun:test'
import { basename } from 'node:path'
import { GET_CLOUDFRONT_URL_FROM_ANY_STRING } from '../../ts/string/get-cloudfront-url-from-any-string.util.js'

describe(
  'GET_CLOUDFRONT_URL_FROM_ANY_STRING',
  () => {
    const folders = { basename, cloudfrontUri: 'https://cdn.example.com', fileUploadFolder: '/uploads', publicStaticImageFolder: '/static' }

    const testCases: Array<{ name: string, s: string, expected: string }> = [
      { name: 'bare uuid → light png on cloudfront', s: '123e4567-e89b-12d3-a456-426614174000', expected: 'https://cdn.example.com/123e4567-e89b-12d3-a456-426614174000.png' },
      { name: 'path in upload folder → basename on cloudfront', s: '/uploads/myfile.txt', expected: 'https://cdn.example.com/myfile.txt' },
      { name: 'path in static folder → basename on cloudfront', s: '/static/image.png', expected: 'https://cdn.example.com/image.png' },
      { name: 'url → last path segment on cloudfront', s: 'https://example.com/path/to/file.jpg', expected: 'https://cdn.example.com/file.jpg' },
      { name: 'url without filename → empty string', s: 'https://example.com/path/', expected: '' },
      { name: 'plain filename → cloudfront file', s: 'plainfile.doc', expected: 'https://cdn.example.com/plainfile.doc' },
    ]

    it.each(testCases)(
      '$name',
      ({ s, expected }) => {
        expect(GET_CLOUDFRONT_URL_FROM_ANY_STRING({ ...folders, s })).toBe(expected)
      }
    )
  }
)
