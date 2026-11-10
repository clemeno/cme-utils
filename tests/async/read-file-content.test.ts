import { describe, expect, it } from 'bun:test'
import { READ_FILE_CONTENT } from '../../ts/async/read-file-content.util.js'

// the real Blob and File of the runtime: READ_FILE_CONTENT must run in a browser, on Node and on bun
describe(
  'READ_FILE_CONTENT',
  () => {
    const basicFileTests: Array<{ name: string, input: (() => File) | (() => Blob), expected: { exception: undefined, result: string } }> = [
      {
        name: 'should read text content from a File',
        input: () => new File(['Hello, World!'], 'test.txt', { type: 'text/plain' }),
        expected: { exception: undefined, result: 'Hello, World!' },
      },
      {
        name: 'should read text content from a Blob',
        input: () => new Blob(['Blob content'], { type: 'text/plain' }),
        expected: { exception: undefined, result: 'Blob content' },
      },
      {
        name: 'should handle different text encodings',
        input: () => new File(['Hello, 世界!'], 'test.txt', { type: 'text/plain' }),
        expected: { exception: undefined, result: 'Hello, 世界!' },
      },
    ]

    it.each(basicFileTests)(
      '$name',
      async ({ input, expected }) => {
        expect(await READ_FILE_CONTENT(input())).toEqual(expected)
      }
    )

    const edgeCaseTests: Array<{ name: string, input: (() => File) | (() => Blob), expected: { exception: undefined, result: string } }> = [
      {
        name: 'should handle empty files',
        input: () => new File([], 'empty.txt', { type: 'text/plain' }),
        expected: { exception: undefined, result: '' },
      },
      {
        name: 'should handle large text content',
        input: () => {
          const content = 'A'.repeat(1000)
          return new File([content], 'large.txt', { type: 'text/plain' })
        },
        expected: { exception: undefined, result: 'A'.repeat(1000) },
      },
      {
        name: 'should handle different file types',
        input: () => new File(['{"key": "value"}'], 'test.json', { type: 'application/json' }),
        expected: { exception: undefined, result: '{"key": "value"}' },
      },
      {
        name: 'should handle multiline text',
        input: () => new File(['Line 1\nLine 2\nLine 3'], 'multiline.txt', { type: 'text/plain' }),
        expected: { exception: undefined, result: 'Line 1\nLine 2\nLine 3' },
      },
      {
        name: 'should handle binary-like content',
        input: () => new File([new Uint8Array([72, 101, 108, 108, 111])], 'binary.txt', { type: 'application/octet-stream' }),
        expected: { exception: undefined, result: 'Hello' },
      },
      {
        name: 'should handle special Unicode characters',
        input: () => new File(['🚀 🌟 ✨ 🎉'], 'emoji.txt', { type: 'text/plain' }),
        expected: { exception: undefined, result: '🚀 🌟 ✨ 🎉' },
      },
      {
        name: 'should handle files with special filename characters',
        input: () => new File(['content'], 'file with spaces & special chars.txt', { type: 'text/plain' }),
        expected: { exception: undefined, result: 'content' },
      },
      {
        name: 'should handle very small content',
        input: () => new File(['x'], 'single-char.txt', { type: 'text/plain' }),
        expected: { exception: undefined, result: 'x' },
      },
      {
        name: 'should handle content with only whitespace',
        input: () => new File(['   \n\t  \r\n  '], 'whitespace.txt', { type: 'text/plain' }),
        expected: { exception: undefined, result: '   \n\t  \r\n  ' },
      },
      {
        name: 'should handle content with null bytes',
        input: () => new File(['Hello\x00World'], 'null-bytes.txt', { type: 'text/plain' }),
        expected: { exception: undefined, result: 'Hello\x00World' },
      },
      {
        name: 'should handle empty Blob',
        input: () => new Blob([], { type: 'text/plain' }),
        expected: { exception: undefined, result: '' },
      },
      {
        name: 'should handle Blob with multiple parts',
        input: () => new Blob(['Part 1', 'Part 2', 'Part 3'], { type: 'text/plain' }),
        expected: { exception: undefined, result: 'Part 1Part 2Part 3' },
      },
      {
        name: 'should handle File with lastModified property',
        input: () => {
          const file = new File(['content'], 'test.txt', { type: 'text/plain', lastModified: 1640995200000 })
          expect(file.lastModified).toBe(1640995200000)
          return file
        },
        expected: { exception: undefined, result: 'content' },
      },
      {
        name: 'should handle Blob with transparent endings',
        input: () => new Blob(['Line 1\nLine 2'], { type: 'text/plain', endings: 'transparent' }),
        expected: { exception: undefined, result: 'Line 1\nLine 2' },
      },
      {
        name: 'should handle large binary data',
        input: () => {
          const data = new Uint8Array(1024)
          for (const index of data.keys()) {
            data[index] = index % 256
          }
          return new File([data], 'large-binary.dat', { type: 'application/octet-stream' })
        },
        expected: {
          exception: undefined,
          result: new TextDecoder().decode(
            new Uint8Array(
              // eslint-disable-next-line max-params
              Array.from({ length: 1024 }, (_, i) => i % 256)
            )
          ),
        },
      },
      {
        name: 'should handle Blob with mixed content types',
        input: () => new Blob(['String part', new Uint8Array([72, 101, 108, 108, 111]), 'Another string'], { type: 'text/plain' }),
        expected: { exception: undefined, result: 'String partHelloAnother string' },
      },
      {
        name: 'should handle File with very long filename',
        input: () => {
          const longName = `${'a'.repeat(200)}.txt`
          return new File(['content'], longName, { type: 'text/plain' })
        },
        expected: { exception: undefined, result: 'content' },
      },
      {
        name: 'should handle different MIME types',
        input: () => new File(['<html><body>Hello</body></html>'], 'test.html', { type: 'text/html' }),
        expected: { exception: undefined, result: '<html><body>Hello</body></html>' },
      },
      {
        name: 'should handle zero-length Uint8Array',
        input: () => new File([new Uint8Array(0)], 'empty-binary.dat', { type: 'application/octet-stream' }),
        expected: { exception: undefined, result: '' },
      },
      {
        name: 'should handle Blob with size property',
        input: () => {
          const blob = new Blob(['test content'], { type: 'text/plain' })
          expect(blob.size).toBeGreaterThan(0)
          return blob
        },
        expected: { exception: undefined, result: 'test content' },
      },
      {
        name: 'should handle Blob with options',
        input: () => new Blob(['Blob with options'], { type: 'text/plain', endings: 'native' }),
        expected: { exception: undefined, result: 'Blob with options' },
      },
      {
        name: 'should handle File with empty filename',
        input: () => new File(['content'], '', { type: 'text/plain' }),
        expected: { exception: undefined, result: 'content' },
      },
      {
        name: 'should handle Blob with empty type',
        input: () => new Blob(['content'], { type: '' }),
        expected: { exception: undefined, result: 'content' },
      },
      {
        name: 'should handle File with special characters in name',
        input: () => new File(['content'], 'file with "quotes" and \'apostrophes\' [brackets] {braces}.txt', { type: 'text/plain' }),
        expected: { exception: undefined, result: 'content' },
      },
      {
        name: 'should handle Blob with ArrayBuffer content',
        input: () => {
          const buffer = new ArrayBuffer(8)
          const view = new Uint8Array(buffer)
          view.set([72, 101, 108, 108, 111]) // "Hello"
          return new Blob([buffer], { type: 'application/octet-stream' })
        },
        expected: { exception: undefined, result: 'Hello\x00\x00\x00' },
      },
      {
        name: 'should handle Blob with DataView content',
        input: () => {
          const buffer = new ArrayBuffer(8)
          const view = new DataView(buffer)
          view.setUint8(0, 72) // 'H'
          view.setUint8(1, 101) // 'e'
          view.setUint8(2, 108) // 'l'
          view.setUint8(3, 108) // 'l'
          view.setUint8(4, 111) // 'o'
          return new Blob([view], { type: 'application/octet-stream' })
        },
        expected: { exception: undefined, result: 'Hello\x00\x00\x00' },
      },
      {
        name: 'should handle Blob with multiple parts',
        input: () => new Blob(['Part 1', 'Part 2', 'Part 3'], { type: 'text/plain' }),
        expected: { exception: undefined, result: 'Part 1Part 2Part 3' },
      },
      {
        name: 'should handle File with lastModified property',
        input: () => {
          const file = new File(['content'], 'test.txt', { type: 'text/plain', lastModified: 1640995200000 })
          expect(file.lastModified).toBe(1640995200000)
          return file
        },
        expected: { exception: undefined, result: 'content' },
      },
      {
        name: 'should handle Blob with transparent endings',
        input: () => new Blob(['Line 1\nLine 2'], { type: 'text/plain', endings: 'transparent' }),
        expected: { exception: undefined, result: 'Line 1\nLine 2' },
      },
      {
        name: 'should handle large binary data',
        input: () => {
          const data = new Uint8Array(1024)

          for (const index of data.keys()) {
            data[index] = index % 256
          }

          return new File([data], 'large-binary.dat', { type: 'application/octet-stream' })
        },
        expected: {
          exception: undefined,
          result: new TextDecoder().decode(
            new Uint8Array(
              // eslint-disable-next-line max-params
              Array.from({ length: 1024 }, (_, i) => i % 256)
            )
          ),
        },
      },
      {
        name: 'should handle Blob with mixed content types',
        input: () => new Blob(['String part', new Uint8Array([72, 101, 108, 108, 111]), 'Another string'], { type: 'text/plain' }),
        expected: { exception: undefined, result: 'String partHelloAnother string' },
      },
      {
        name: 'should handle File with very long filename',
        input: () => {
          const longName = `${'a'.repeat(200)}.txt`
          return new File(['content'], longName, { type: 'text/plain' })
        },
        expected: { exception: undefined, result: 'content' },
      },
      {
        name: 'should handle different MIME types',
        input: () => new File(['<html><body>Hello</body></html>'], 'test.html', { type: 'text/html' }),
        expected: { exception: undefined, result: '<html><body>Hello</body></html>' },
      },
      {
        name: 'should handle zero-length Uint8Array',
        input: () => new File([new Uint8Array(0)], 'empty-binary.dat', { type: 'application/octet-stream' }),
        expected: { exception: undefined, result: '' },
      },
      {
        name: 'should handle Blob with size property',
        input: () => {
          const blob = new Blob(['test content'], { type: 'text/plain' })
          expect(blob.size).toBeGreaterThan(0)
          return blob
        },
        expected: { exception: undefined, result: 'test content' },
      },
      {
        name: 'should handle Blob with options',
        input: () => new Blob(['Blob with options'], { type: 'text/plain', endings: 'native' }),
        expected: { exception: undefined, result: 'Blob with options' },
      },
      {
        name: 'should handle File with empty filename',
        input: () => new File(['content'], '', { type: 'text/plain' }),
        expected: { exception: undefined, result: 'content' },
      },
      {
        name: 'should handle Blob with empty type',
        input: () => new Blob(['content'], { type: '' }),
        expected: { exception: undefined, result: 'content' },
      },
    ]

    it.each(edgeCaseTests)(
      '$name',
      async ({ input, expected }) => {
        expect(await READ_FILE_CONTENT(input())).toEqual(expected)
      }
    )

    // decoded as FileReader.readAsText does: byte order mark, else the charset of the type, else UTF-8
    const encodingTestCases: Array<{ name: string, input: Blob, expected: { exception: undefined, result: string } }> = [
      { name: 'decodes UTF-16LE by its byte order mark', input: new Blob([new Uint8Array([0xff, 0xfe, 0x68, 0, 0x69, 0])]), expected: { exception: undefined, result: 'hi' } },
      { name: 'decodes UTF-16BE by its byte order mark', input: new Blob([new Uint8Array([0xfe, 0xff, 0, 0x68, 0, 0x69])]), expected: { exception: undefined, result: 'hi' } },
      { name: 'drops the UTF-8 byte order mark', input: new Blob([new Uint8Array([0xef, 0xbb, 0xbf, 0x68, 0x69])]), expected: { exception: undefined, result: 'hi' } },
      { name: 'decodes by the charset of the type', input: new Blob([new Uint8Array([0xe9])], { type: 'text/plain;charset=windows-1252' }), expected: { exception: undefined, result: 'é' } },
      { name: 'decodes by a quoted charset', input: new Blob([new Uint8Array([0x68, 0, 0x69, 0])], { type: 'text/plain; charset="utf-16le"' }), expected: { exception: undefined, result: 'hi' } },
      { name: 'lets the byte order mark win over the charset', input: new Blob([new Uint8Array([0xff, 0xfe, 0x68, 0, 0x69, 0])], { type: 'text/plain;charset=windows-1252' }), expected: { exception: undefined, result: 'hi' } },
      { name: 'falls back to UTF-8 on an unknown charset', input: new Blob(['hi'], { type: 'text/plain;charset=nope' }), expected: { exception: undefined, result: 'hi' } },
    ]

    it.each(encodingTestCases)(
      '$name',
      async ({ input, expected }) => {
        expect(await READ_FILE_CONTENT(input)).toEqual(expected)
      }
    )

    const readError = new Error('read failed')

    const errorTestCases: Array<{ name: string, input: Blob, expected: { exception: unknown, result: undefined } }> = [
      // a Blob whose read rejects, as on a file removed or unreadable since it was picked
      { name: 'returns the read error as the exception', input: { arrayBuffer: async () => { throw readError } } as unknown as Blob, expected: { exception: readError, result: undefined } },
      // input.files?.[0] when no file is picked
      { name: 'returns a TypeError as the exception when there is no file', input: undefined as unknown as Blob, expected: { exception: expect.any(TypeError), result: undefined } },
    ]

    it.each(errorTestCases)(
      '$name',
      async ({ input, expected }) => {
        expect(await READ_FILE_CONTENT(input)).toEqual(expected)
      }
    )
  }
)
