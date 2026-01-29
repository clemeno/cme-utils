import { describe, expect, it } from 'bun:test'
import { GET_CLOUDFRONT_URL_FILE } from '../../ts/string/get-cloudfront-url-file.util.js'

describe(
  'GET_CLOUDFRONT_URL_FILE',
  () => {
    it(
      'should return the URL with filename',
      () => {
        const result = GET_CLOUDFRONT_URL_FILE({ filename: 'image.png', cloudfrontUri: 'https://subdomain.cloudfront.com' })
        expect(result).toBe('https://subdomain.cloudfront.com/image.png')
      }
    )

    it(
      'should add slash if missing',
      () => {
        const result = GET_CLOUDFRONT_URL_FILE({ filename: 'image.png', cloudfrontUri: 'https://subdomain.cloudfront.com' })
        expect(result).toBe('https://subdomain.cloudfront.com/image.png')
      }
    )

    it(
      'should not add extra slash if present',
      () => {
        const result = GET_CLOUDFRONT_URL_FILE({ filename: 'image.png', cloudfrontUri: 'https://subdomain.cloudfront.com/' })
        expect(result).toBe('https://subdomain.cloudfront.com/image.png')
      }
    )
  }
)
