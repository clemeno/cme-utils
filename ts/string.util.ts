import { IS_A_STRING_AND_NOT_EMPTY, IS_AN_ARRAY_AND_NOT_EMPTY } from 'check/check.util'
import { IS_SET } from 'check/is-set.util'
import { TO_STRING } from 'convert/to-string.util.js'
import dotenv from 'dotenv'
import { basename } from 'node:path'
import { IS_UUID_STRING } from 'uuid.util'

dotenv.config()

const ENV: Record<string, any> = process.env

/** `string` to lowercase for the first character */
export const STRING_LCF = (input: string): string => `${TO_STRING(input[0]).toLowerCase()}${input.slice(1)}`

/** `string` to uppercase for the first character */
export const STRING_UCF = (input: string): string => `${TO_STRING(input[0]).toUpperCase()}${input.slice(1)}`

/** Unicode Character 'ZERO WIDTH SPACE' (U+200B) */
export const ZWSP = '​'

// * url
/** @returns {boolean} `s` is a url string. It must be safe to instantiate a new URL(`s`) */
export const IS_A_URL = (s: string): boolean => /^(https?:)?\/\//.test(s)

// * file extension

/** @returns {boolean} `s` has the .png extension - case insensitive - in the end? */
export const IS_A_DOT_PNG = (s: string): boolean => /\.png$/i.test(s)

// * uuid

/** @returns {boolean} `s` is a valid UUID? */
export const IS_UUID = (s: string): boolean => IS_UUID_STRING(s)

export const REGEX_UUID_MATCH_A_SUBSTRING = /[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}/
export const REGEX_UUID_MATCH_EACH_SUBSTRING = /[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}/g

/**
 * Extracts a UUID from a string `s`, if any substring is a UUID
 * @returns {string} the first UUID found or '' (empty string) if no UUID is found
 */
export const EXTRACT_UUID_FROM_STRING = (s: string): string => {
  let res = ''

  if (IS_UUID(s)) {
    res = s
  } else {
    const matchList = s.match(REGEX_UUID_MATCH_A_SUBSTRING)

    if (IS_AN_ARRAY_AND_NOT_EMPTY(matchList)) {
      res = matchList[0]
    }
  }

  return res
}

/**
 * Extracts all UUIDs from a string `s`, if any substring is a UUID
 * @returns {string[]} an array of UUIDs or [] (empty array) if no UUID is found
 */
export const EXTRACT_ALL_UUIDS_FROM_STRING = (s: string): string[] => {
  return s.match(REGEX_UUID_MATCH_EACH_SUBSTRING) ?? []
}

// * png filename from uuid

/** @returns {string} `uuid`.png */
export const GET_LIGHT_PNG_NAME_FROM_UUID = (uuid: string): string => {
  return `${uuid}.png`
}

/** @returns {string} `uuid`_dark.png */
export const GET_DARK_PNG_NAME_FROM_UUID = (uuid: string): string => {
  return `${uuid}_dark.png`
}

// * uploaded file path

/** @returns {string} ./uploads/`filename` */
export const GET_UPLOADED_FILE_PATH = (filename: string): string => {
  const envFolder = ENV.APP_FILE_UPLOAD_FOLDER
  const folder = (envFolder[envFolder.length - 1] === '/') ? envFolder : `${envFolder}/`
  return `${folder}${filename}`
}

/** @returns {string} ./uploads/`uuid`.png */
export const GET_UPLOADED_LIGHT_PNG_FROM_UUID = (uuid: string): string => {
  const filename = GET_LIGHT_PNG_NAME_FROM_UUID(uuid)
  const envFolder = ENV.APP_FILE_UPLOAD_FOLDER
  const folder = (envFolder[envFolder.length - 1] === '/') ? envFolder : `${envFolder}/`
  return `${folder}${filename}`
}

/** @returns {string} ./uploads/`uuid`_dark.png */
export const GET_UPLOADED_DARK_PNG_FROM_UUID = (uuid: string): string => {
  const filename = GET_DARK_PNG_NAME_FROM_UUID(uuid)
  const envFolder = ENV.APP_FILE_UPLOAD_FOLDER
  const folder = (envFolder[envFolder.length - 1] === '/') ? envFolder : `${envFolder}/`
  return `${folder}${filename}`
}

// * uploaded file symlink path

/** @returns {string} /opt/spirtech/svd/www/svd/public_html/static/`filename` */
export const GET_CLOUDFRONT_LINK_PATH = (filename: string): string => {
  const envFolder = ENV.APP_PUBLIC_STATIC_IMAGE_FOLDER
  const folder = (envFolder[envFolder.length - 1] === '/') ? envFolder : `${envFolder}/`
  return `${folder}${filename}`
}

/** @returns {string} /opt/spirtech/svd/www/svd/public_html/static/`uuid`.png */
export const GET_CLOUDFRONT_LIGHT_LINK_FROM_UUID = (uuid: string): string => {
  const filename = GET_LIGHT_PNG_NAME_FROM_UUID(uuid)
  const envFolder = ENV.APP_PUBLIC_STATIC_IMAGE_FOLDER
  const folder = (envFolder[envFolder.length - 1] === '/') ? envFolder : `${envFolder}/`
  return `${folder}${filename}`
}

/** @returns {string} /opt/spirtech/svd/www/svd/public_html/static/`uuid`_dark.png */
export const GET_CLOUDFRONT_DARK_LINK_FROM_UUID = (uuid: string): string => {
  const filename = GET_DARK_PNG_NAME_FROM_UUID(uuid)
  const envFolder = ENV.APP_PUBLIC_STATIC_IMAGE_FOLDER
  const folder = (envFolder[envFolder.length - 1] === '/') ? envFolder : `${envFolder}/`
  return `${folder}${filename}`
}

// * public api file url

/** @returns {string} https:\//dev.opus.svd.spiws.net/borlapi/public_img/`filename` */
export const GET_PUBLIC_API_URL_FILE = (filename: string): string => {
  const envEndpoint = ENV.APP_ROOT_URL_PUBLIC_IMG
  const endpointSlash = (envEndpoint[envEndpoint.length - 1] === '/') ? envEndpoint : `${envEndpoint}/`
  return `${endpointSlash}${filename}`
}

/** @returns {string} https:\//dev.opus.svd.spiws.net/borlapi/public_img/`uuid`.png */
export const GET_PUBLIC_API_URL_LIGHT_PNG_FROM_UUID = (uuid: string): string => {
  const filename = GET_LIGHT_PNG_NAME_FROM_UUID(uuid)
  const envEndpoint = ENV.APP_ROOT_URL_PUBLIC_IMG
  const endpointSlash = (envEndpoint[envEndpoint.length - 1] === '/') ? envEndpoint : `${envEndpoint}/`
  return `${endpointSlash}${filename}`
}

/** @returns {string} https:\//dev.opus.svd.spiws.net/borlapi/public_img/`uuid`_dark.png */
export const GET_PUBLIC_API_URL_DARK_PNG_FROM_UUID = (uuid: string): string => {
  const filename = GET_DARK_PNG_NAME_FROM_UUID(uuid)
  const envEndpoint = ENV.APP_ROOT_URL_PUBLIC_IMG
  const endpointSlash = (envEndpoint[envEndpoint.length - 1] === '/') ? envEndpoint : `${envEndpoint}/`
  return `${endpointSlash}${filename}`
}

// * cloudfront static file url

/** @returns {string} https:\//d244upthqj9aru.cloudfront.net/`filename` */
export const GET_CLOUDFRONT_URL_FILE = (filename: string): string => {
  const envEndpoint = ENV.APP_CLOUDFRONT_URI
  const endpoint = (envEndpoint[envEndpoint.length - 1] === '/') ? envEndpoint : `${envEndpoint}/`
  return `${endpoint}${filename}`
  // return `${ENV.APP_CLOUDFRONT_URI}/${filename}`
}

/** @returns {string} https:\//d244upthqj9aru.cloudfront.net/`uuid`.png */
export const GET_CLOUDFRONT_URL_PNG_LIGHT_FROM_UUID = (uuid: string): string => {
  const filename = GET_LIGHT_PNG_NAME_FROM_UUID(uuid)
  const envEndpoint = ENV.APP_CLOUDFRONT_URI
  const endpointSlash = (envEndpoint[envEndpoint.length - 1] === '/') ? envEndpoint : `${envEndpoint}/`
  return `${endpointSlash}${filename}`
}

/** @returns {string} https:\//d244upthqj9aru.cloudfront.net/`uuid`_dark.png */
export const GET_CLOUDFRONT_URL_PNG_DARK_FROM_UUID = (uuid: string): string => {
  const filename = GET_DARK_PNG_NAME_FROM_UUID(uuid)
  const envEndpoint = ENV.APP_CLOUDFRONT_URI
  const endpointSlash = (envEndpoint[envEndpoint.length - 1] === '/') ? envEndpoint : `${envEndpoint}/`
  return `${endpointSlash}${filename}`
}

// * switch

/** @returns {string} (path|url)?file`.png` -> (path|url)?file`_dark.png` */
export const GET_DARK_FROM_LIGHT_PNG_FILE = (lightPngPath: string): string => {
  return lightPngPath.replace(/\.png$/i, '_dark.png')
}

/** @returns {string} (path|url)?file`_dark.png` -> (path|url)?file`.png` */
export const GET_LIGHT_FROM_DARK_PNG_FILE = (darkPngPath: string): string => {
  return darkPngPath.replace(/_dark\.png$/i, '.png')
}

/** @returns {string} ./uploads/`filename` -> /opt/spirtech/svd/www/svd/public_html/static/`filename` */
export const GET_SYMLINK_PATH_FROM_FILE_PATH = (filePath: string): string => {
  return filePath.replace(ENV.APP_FILE_UPLOAD_FOLDER, ENV.APP_PUBLIC_STATIC_IMAGE_FOLDER)
}

/** @returns {string} /opt/spirtech/svd/www/svd/public_html/static/`filename` -> ./uploads/`filename` */
export const GET_FILE_PATH_FROM_SYMLINK_PATH = (symlinkPath: string): string => {
  return symlinkPath.replace(ENV.APP_PUBLIC_STATIC_IMAGE_FOLDER, ENV.APP_FILE_UPLOAD_FOLDER)
}

/** @returns {string} https:\//d244upthqj9aru.cloudfront.net/`filename` -> https:\//dev.opus.svd.spiws.net/borlapi/public_img/`filename` */
export const GET_PUBLIC_API_URL_FROM_CLOUDFRONT_URL = (cloudfrontUrl: string): string => {
  return cloudfrontUrl.replace(ENV.APP_CLOUDFRONT_URI, ENV.APP_ROOT_URL_PUBLIC_IMG)
}

/** @returns {string} https:\//dev.opus.svd.spiws.net/borlapi/public_img/`filename` -> https:\//d244upthqj9aru.cloudfront.net/`filename` */
export const GET_CLOUDFRONT_URL_FROM_PUBLIC_API_URL = (publicImgUrl: string): string => {
  return publicImgUrl.replace(ENV.APP_ROOT_URL_PUBLIC_IMG, ENV.APP_CLOUDFRONT_URI)
}

/** @returns {string} (path|url)?`filename` -> ./uploads/`filename` */
export const GET_UPLOADED_FILE_FROM_ANY_STRING = (s: string): string => {
  const uuid = EXTRACT_UUID_FROM_STRING(s)

  const strategyList = [
    { if: () => IS_A_STRING_AND_NOT_EMPTY(uuid), then: () => GET_UPLOADED_LIGHT_PNG_FROM_UUID(uuid) },
    { if: () => s.includes(ENV.APP_FILE_UPLOAD_FOLDER), then: () => s },
    { if: () => s.includes(ENV.APP_PUBLIC_STATIC_IMAGE_FOLDER), then: () => GET_UPLOADED_FILE_PATH(basename(s)) },
    {
      if: () => IS_A_URL(s),
      then: () => {
        const pathList = (new URL(s)).pathname.split('/')
        const filename = pathList[pathList.length - 1]
        return IS_SET(filename) ? GET_UPLOADED_FILE_PATH(filename) : ''
      },
    },
  ]

  return strategyList.find(_s => _s.if())?.then() ?? GET_UPLOADED_FILE_PATH(s)
}

/** @returns {string} (path|url)?`filename` -> /opt/spirtech/svd/www/svd/public_html/static/`filename` */
export const GET_UPLOADED_FILE_LINK_FROM_ANY_STRING = (s: string): string => {
  const uuid = EXTRACT_UUID_FROM_STRING(s)

  const strategyList = [
    { if: () => IS_A_STRING_AND_NOT_EMPTY(uuid), then: () => GET_CLOUDFRONT_LIGHT_LINK_FROM_UUID(uuid) },
    { if: () => s.includes(ENV.APP_FILE_UPLOAD_FOLDER), then: () => GET_CLOUDFRONT_LINK_PATH(basename(s)) },
    { if: () => s.includes(ENV.APP_PUBLIC_STATIC_IMAGE_FOLDER), then: () => s },
    {
      if: () => IS_A_URL(s),
      then: () => {
        const pathList = (new URL(s)).pathname.split('/')
        const filename = pathList[pathList.length - 1]
        return IS_SET(filename) ? GET_CLOUDFRONT_LINK_PATH(filename) : ''
      },
    },
  ]

  return strategyList.find(_s => _s.if())?.then() ?? GET_CLOUDFRONT_LINK_PATH(s)
}

/** @returns {string} (path|url)?`filename` -> https:\//d244upthqj9aru.cloudfront.net/`filename` */
export const GET_CLOUDFRONT_URL_FROM_ANY_STRING = (s: string): string => {
  const uuid = EXTRACT_UUID_FROM_STRING(s)

  const strategyList = [
    { if: () => IS_A_STRING_AND_NOT_EMPTY(uuid), then: () => GET_CLOUDFRONT_URL_PNG_LIGHT_FROM_UUID(uuid) },
    { if: () => s.includes(ENV.APP_FILE_UPLOAD_FOLDER), then: () => GET_CLOUDFRONT_URL_FILE(basename(s)) },
    { if: () => s.includes(ENV.APP_PUBLIC_STATIC_IMAGE_FOLDER), then: () => GET_CLOUDFRONT_URL_FILE(basename(s)) },
    {
      if: () => IS_A_URL(s),
      then: () => {
        const pathList = (new URL(s)).pathname.split('/')
        const filename = pathList[pathList.length - 1]
        return IS_SET(filename) ? GET_CLOUDFRONT_URL_FILE(filename) : ''
      },
    },
  ]

  return strategyList.find(_s => _s.if())?.then() ?? GET_CLOUDFRONT_URL_FILE(s)
}
