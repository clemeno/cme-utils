import { describe, expect, it } from 'bun:test'
import { basename } from 'node:path'
import { GET_FILE_NAME_AND_KIND_FROM_ANY_STRING } from '../../ts/string/get-file-name-and-kind-from-any-string.util.js'

describe(
  'GET_FILE_NAME_AND_KIND_FROM_ANY_STRING',
  () => {
    const folders = { basename, fileUploadFolder: '/uploads', publicStaticImageFolder: '/static' }

    const testCases: Array<{ name: string, s: string, expected: ReturnType<typeof GET_FILE_NAME_AND_KIND_FROM_ANY_STRING> }> = [
      { name: 'bare uuid → its light png', s: '123e4567-e89b-12d3-a456-426614174000', expected: { kind: 'uuid', filename: '123e4567-e89b-12d3-a456-426614174000.png' } },
      { name: 'dark png of an uuid → the light png', s: '/uploads/123e4567-e89b-12d3-a456-426614174000_dark.png', expected: { kind: 'uuid', filename: '123e4567-e89b-12d3-a456-426614174000.png' } },
      { name: 'other extension of an uuid → the light png', s: '/uploads/123e4567-e89b-12d3-a456-426614174000.pdf', expected: { kind: 'uuid', filename: '123e4567-e89b-12d3-a456-426614174000.png' } },
      { name: 'url holding an uuid → the light png', s: 'https://example.com/123e4567-e89b-12d3-a456-426614174000_dark.png', expected: { kind: 'uuid', filename: '123e4567-e89b-12d3-a456-426614174000.png' } },
      { name: 'path in upload folder → its basename', s: '/uploads/myfile.txt', expected: { kind: 'upload', filename: 'myfile.txt' } },
      { name: 'path holding both folders → upload, before static', s: '/uploads/static/a.png', expected: { kind: 'upload', filename: 'a.png' } },
      { name: 'path in static folder → its basename', s: '/static/image.png', expected: { kind: 'static', filename: 'image.png' } },
      { name: 'url holding the static folder → static, before url', s: 'https://example.com/static/a.png', expected: { kind: 'static', filename: 'a.png' } },
      { name: 'url → its last path segment', s: 'https://example.com/path/to/file.jpg', expected: { kind: 'url', filename: 'file.jpg' } },
      { name: 'url without filename → no file', s: 'https://example.com/path/', expected: { kind: 'url-without-file', filename: '' } },
      { name: 'plain filename → itself', s: 'file.png', expected: { kind: 'name', filename: 'file.png' } },
      { name: 'empty string → an empty name', s: '', expected: { kind: 'name', filename: '' } },
    ]

    it.each(testCases)(
      '$name',
      ({ s, expected }) => {
        expect(GET_FILE_NAME_AND_KIND_FROM_ANY_STRING({ ...folders, s })).toEqual(expected)
      }
    )
  }
)
