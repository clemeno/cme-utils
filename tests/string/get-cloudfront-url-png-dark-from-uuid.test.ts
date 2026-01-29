import { describe, expect, it } from 'bun:test'
import { GET_CLOUDFRONT_URL_PNG_DARK_FROM_UUID } from '../../ts/string/get-cloudfront-url-png-dark-from-uuid.util.js'

describe(
  'GET_CLOUDFRONT_URL_PNG_DARK_FROM_UUID',
  () => {
    it(
      'should return cloudfront URL for dark PNG',
      () => {
        const result = GET_CLOUDFRONT_URL_PNG_DARK_FROM_UUID({
          uuid: '123',
          cloudfrontUri: 'https://cdn.example.com',
        })
        expect(result).toBe('https://cdn.example.com/123_dark.png')
      }
    )
  }
)
