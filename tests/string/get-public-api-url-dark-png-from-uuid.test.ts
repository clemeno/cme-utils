import { describe, expect, it } from 'bun:test'
import { GET_PUBLIC_API_URL_DARK_PNG_FROM_UUID } from '../../ts/string/get-public-api-url-dark-png-from-uuid.util.js'

describe(
  'GET_PUBLIC_API_URL_DARK_PNG_FROM_UUID',
  () => {
    it(
      'should return public API URL for dark PNG',
      () => {
        const result = GET_PUBLIC_API_URL_DARK_PNG_FROM_UUID({
          uuid: '123',
          rootUrlPublicImg: 'https://api.example.com',
        })
        expect(result).toBe('https://api.example.com/123_dark.png')
      }
    )
  }
)
