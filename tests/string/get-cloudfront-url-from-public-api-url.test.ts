import { describe, expect, it } from 'bun:test'
import { GET_CLOUDFRONT_URL_FROM_PUBLIC_API_URL } from '../../ts/string/get-cloudfront-url-from-public-api-url.util.js'

describe(
  'GET_CLOUDFRONT_URL_FROM_PUBLIC_API_URL',
  () => {
    it(
      'should convert public API URL to cloudfront URL',
      () => {
        const result = GET_CLOUDFRONT_URL_FROM_PUBLIC_API_URL({
          publicImgUrl: 'https://api.example.com/file.png',
          rootUrlPublicImg: 'https://api.example.com',
          cloudfrontUri: 'https://cdn.example.com',
        })
        expect(result).toBe('https://cdn.example.com/file.png')
      }
    )
  }
)
