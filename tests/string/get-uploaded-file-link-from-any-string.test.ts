import { describe, expect, it } from 'bun:test'
import { basename } from 'node:path'
import { GET_UPLOADED_FILE_LINK_FROM_ANY_STRING } from '../../ts/string/get-uploaded-file-link-from-any-string.util.js'

describe(
  'GET_UPLOADED_FILE_LINK_FROM_ANY_STRING',
  () => {
    const folders = { basename, fileUploadFolder: '/uploads', publicStaticImageFolder: '/static' }

    const testCases: Array<{ name: string, s: string, expected: string }> = [
      { name: 'plain filename → static folder link', s: 'file.png', expected: '/static/file.png' },
      { name: 'bare uuid → light png link in static folder', s: '123e4567-e89b-12d3-a456-426614174000', expected: '/static/123e4567-e89b-12d3-a456-426614174000.png' },
      { name: 'path in upload folder → static folder link', s: '/uploads/myfile.txt', expected: '/static/myfile.txt' },
      { name: 'path already in static folder → unchanged', s: '/static/image.png', expected: '/static/image.png' },
      { name: 'url → last path segment in static folder', s: 'https://example.com/path/to/file.jpg', expected: '/static/file.jpg' },
      { name: 'url without filename → empty string', s: 'https://example.com/path/', expected: '' },
    ]

    it.each(testCases)(
      '$name',
      ({ s, expected }) => {
        expect(GET_UPLOADED_FILE_LINK_FROM_ANY_STRING({ ...folders, s })).toBe(expected)
      }
    )
  }
)
