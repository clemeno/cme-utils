import { describe, expect, it } from 'bun:test'
import { basename } from 'node:path'
import { GET_UPLOADED_FILE_FROM_ANY_STRING } from '../../ts/string/get-uploaded-file-from-any-string.util.js'

describe(
  'GET_UPLOADED_FILE_FROM_ANY_STRING',
  () => {
    const folders = { basename, fileUploadFolder: '/uploads', publicStaticImageFolder: '/static' }

    const testCases: Array<{ name: string, s: string, expected: string }> = [
      { name: 'plain filename → upload folder path', s: 'file.png', expected: '/uploads/file.png' },
      { name: 'bare uuid → light png in upload folder', s: '123e4567-e89b-12d3-a456-426614174000', expected: '/uploads/123e4567-e89b-12d3-a456-426614174000.png' },
      { name: 'path already in upload folder → unchanged', s: '/uploads/myfile.txt', expected: '/uploads/myfile.txt' },
      { name: 'path in static folder → moved to upload folder', s: '/static/image.png', expected: '/uploads/image.png' },
      { name: 'url → last path segment in upload folder', s: 'https://example.com/path/to/file.jpg', expected: '/uploads/file.jpg' },
      { name: 'url without filename → empty string', s: 'https://example.com/path/', expected: '' },
    ]

    it.each(testCases)(
      '$name',
      ({ s, expected }) => {
        expect(GET_UPLOADED_FILE_FROM_ANY_STRING({ ...folders, s })).toBe(expected)
      }
    )
  }
)
