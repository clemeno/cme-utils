import { describe, expect, it } from 'bun:test'
import { GET_PUBLIC_API_URL_FILE } from '../../ts/string/get-public-api-url-file.util.js'

describe(
  'GET_PUBLIC_API_URL_FILE',
  () => {
    it(
      'should return public API URL for file',
      () => {
        const result = GET_PUBLIC_API_URL_FILE({
          filename: 'file.png',
          rootUrlPublicImg: 'https://api.example.com',
        })
        expect(result).toBe('https://api.example.com/file.png')
      }
    )
  }
)
