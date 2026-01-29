import { describe, expect, it } from 'bun:test'
import { GET_BASE_URI } from '../../ts/http/base-uri.util.js'

describe(
  'GET_BASE_URI',
  () => {
    it(
      'should return baseURI without trailing slash',
      () => {
        // Mock window.document
        const originalWindow = global.window
        global.window = {
          document: {
            documentElement: {
              baseURI: 'https://example.com/app/',
            },
          },
        } as any

        try {
          const result = GET_BASE_URI()
          expect(result).toBe('https://example.com/app')
        } finally {
          global.window = originalWindow
        }
      }
    )

    it(
      'should return baseURI as-is when no trailing slash',
      () => {
        const originalWindow = global.window
        global.window = {
          document: {
            documentElement: {
              baseURI: 'https://example.com',
            },
          },
        } as any

        try {
          const result = GET_BASE_URI()
          expect(result).toBe('https://example.com')
        } finally {
          global.window = originalWindow
        }
      }
    )

    it(
      'should return empty string when window.document is not available',
      () => {
        const originalWindow = global.window
        // Remove window or make document access throw
        delete (global as any).window

        const result = GET_BASE_URI()
        expect(result).toBe('')

        // Restore
        global.window = originalWindow
      }
    )

    it(
      'should handle errors gracefully',
      () => {
        const originalWindow = global.window
        global.window = {
          document: {
            documentElement: {
              get baseURI () {
                throw new Error('Access denied')
              },
            },
          },
        } as any

        try {
          const result = GET_BASE_URI()
          expect(result).toBe('')
        } finally {
          global.window = originalWindow
        }
      }
    )

    it(
      'should handle complex URIs',
      () => {
        const originalWindow = global.window
        global.window = {
          document: {
            documentElement: {
              baseURI: 'https://example.com:8080/path/to/app/',
            },
          },
        } as any

        try {
          const result = GET_BASE_URI()
          expect(result).toBe('https://example.com:8080/path/to/app')
        } finally {
          global.window = originalWindow
        }
      }
    )
  }
)
