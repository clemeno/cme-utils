import { describe, expect, it } from 'bun:test'
import { GET_PUBLIC_API_URL_FROM_CLOUDFRONT_URL } from '../../ts/string/get-public-api-url-from-cloudfront-url.util.js'

describe(
  'GET_PUBLIC_API_URL_FROM_CLOUDFRONT_URL',
  () => {
    it(
      'should convert cloudfront URL to public API URL',
      () => {
        const result = GET_PUBLIC_API_URL_FROM_CLOUDFRONT_URL({
          cloudfrontUrl: 'https://cdn.example.com/file.png',
          cloudfrontUri: 'https://cdn.example.com',
          rootUrlPublicImg: 'https://api.example.com',
        })
        expect(result).toBe('https://api.example.com/file.png')
      }
    )
  }
)
