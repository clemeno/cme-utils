import { describe, expect, it } from 'bun:test'
import { GET_CLOUDFRONT_URL_PNG_LIGHT_FROM_UUID } from '../../ts/string/get-cloudfront-url-png-light-from-uuid.util.js'

describe(
  'GET_CLOUDFRONT_URL_PNG_LIGHT_FROM_UUID',
  () => {
    it(
      'should return cloudfront URL for light PNG',
      () => {
        const result = GET_CLOUDFRONT_URL_PNG_LIGHT_FROM_UUID({
          uuid: '123',
          cloudfrontUri: 'https://cdn.example.com',
        })
        expect(result).toBe('https://cdn.example.com/123.png')
      }
    )
  }
)
