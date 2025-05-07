import { basename } from 'node:path'
import { IS_A_STRING_AND_NOT_EMPTY } from '../check/is-a-string-and-not-empty.util.js'
import { IS_SET } from '../check/is-set.util.js'
import { EXTRACT_UUID_FROM_STRING } from './extract-uuid-from-string.util.js'
import { GET_CLOUDFRONT_URL_FILE } from './get-cloudfront-url-file.util.js'
import { GET_CLOUDFRONT_URL_PNG_LIGHT_FROM_UUID } from './get-cloudfront-url-png-light-from-uuid.util.js'
import { IS_A_URL } from './is-a-url.util.js'

/** @returns {string} (path|url)?`filename` -> https:\//subdomain.cloudfront.com/`filename` */
export const GET_CLOUDFRONT_URL_FROM_ANY_STRING = (_: {
  s: string
  cloudfrontUri: string
  fileUploadFolder: string
  publicStaticImageFolder: string
}): string => {
  const s = _.s

  const uuid = EXTRACT_UUID_FROM_STRING(s)

  const cloudfrontUri = _.cloudfrontUri
  const fileUploadFolder = _.fileUploadFolder
  const publicStaticImageFolder = _.publicStaticImageFolder

  const strategyList = [
    { if: () => IS_A_STRING_AND_NOT_EMPTY(uuid), then: () => GET_CLOUDFRONT_URL_PNG_LIGHT_FROM_UUID({ uuid, cloudfrontUri }) },
    { if: () => s.includes(fileUploadFolder), then: () => GET_CLOUDFRONT_URL_FILE({ filename: basename(s), cloudfrontUri }) },
    { if: () => s.includes(publicStaticImageFolder), then: () => GET_CLOUDFRONT_URL_FILE({ filename: basename(s), cloudfrontUri }) },
    {
      if: () => IS_A_URL(s),
      then: () => {
        const pathList = (new URL(s)).pathname.split('/')
        const filename = pathList[pathList.length - 1]
        return IS_SET(filename) ? GET_CLOUDFRONT_URL_FILE({ filename, cloudfrontUri }) : ''
      },
    },
  ]

  return strategyList.find(_s => _s.if())?.then() ?? GET_CLOUDFRONT_URL_FILE({ filename: s, cloudfrontUri })
}
