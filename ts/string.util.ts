import { IS_A_STRING_AND_NOT_EMPTY, IS_AN_ARRAY_AND_NOT_EMPTY } from 'check/check.util'
import { IS_SET } from 'check/is-set.util'
import { TO_STRING } from 'convert/to-string.util.js'
// import dotenv from 'dotenv'
import { basename } from 'node:path'
import { IS_UUID_STRING } from 'uuid.util'

// dotenv.config()

// const ENV: Record<string, any> = process.env

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
export const GET_UPLOADED_FILE_PATH = (_: { filename: string, fileUploadFolder: string }): string => {
  const envFolder = _.fileUploadFolder
  const folder = (envFolder[envFolder.length - 1] === '/') ? envFolder : `${envFolder}/`
  return `${folder}${_.filename}`
}

/** @returns {string} ./uploads/`uuid`.png */
export const GET_UPLOADED_LIGHT_PNG_FROM_UUID = (_: { uuid: string, fileUploadFolder: string }): string => {
  const filename = GET_LIGHT_PNG_NAME_FROM_UUID(_.uuid)
  const envFolder = _.fileUploadFolder
  const folder = (envFolder[envFolder.length - 1] === '/') ? envFolder : `${envFolder}/`
  return `${folder}${filename}`
}

/** @returns {string} ./uploads/`uuid`_dark.png */
export const GET_UPLOADED_DARK_PNG_FROM_UUID = (_: { uuid: string, fileUploadFolder: string }): string => {
  const filename = GET_DARK_PNG_NAME_FROM_UUID(_.uuid)
  const envFolder = _.fileUploadFolder
  const folder = (envFolder[envFolder.length - 1] === '/') ? envFolder : `${envFolder}/`
  return `${folder}${filename}`
}

// * uploaded file symlink path

/** @returns {string} /opt/cme/svd/www/svd/public_html/static/`filename` */
export const GET_CLOUDFRONT_LINK_PATH = (_: { filename: string, publicStaticImageFolder: string }): string => {
  const envFolder = _.publicStaticImageFolder
  const folder = (envFolder[envFolder.length - 1] === '/') ? envFolder : `${envFolder}/`
  return `${folder}${_.filename}`
}

/** @returns {string} /opt/cme/svd/www/svd/public_html/static/`uuid`.png */
export const GET_CLOUDFRONT_LIGHT_LINK_FROM_UUID = (_: { uuid: string, publicStaticImageFolder: string }): string => {
  const filename = GET_LIGHT_PNG_NAME_FROM_UUID(_.uuid)
  const envFolder = _.publicStaticImageFolder
  const folder = (envFolder[envFolder.length - 1] === '/') ? envFolder : `${envFolder}/`
  return `${folder}${filename}`
}

/** @returns {string} /opt/cme/svd/www/svd/public_html/static/`uuid`_dark.png */
export const GET_CLOUDFRONT_DARK_LINK_FROM_UUID = (_: { uuid: string, publicStaticImageFolder: string }): string => {
  const filename = GET_DARK_PNG_NAME_FROM_UUID(_.uuid)
  const envFolder = _.publicStaticImageFolder
  const folder = (envFolder[envFolder.length - 1] === '/') ? envFolder : `${envFolder}/`
  return `${folder}${filename}`
}

// * public api file url

/** @returns {string} https:\//subdomain.domain.com/api/public_img/`filename` */
export const GET_PUBLIC_API_URL_FILE = (_: { filename: string, rootUrlPublicImg: string }): string => {
  const envEndpoint = _.rootUrlPublicImg
  const endpointSlash = (envEndpoint[envEndpoint.length - 1] === '/') ? envEndpoint : `${envEndpoint}/`
  return `${endpointSlash}${_.filename}`
}

/** @returns {string} https:\//subdomain.domain.com/api/public_img/`uuid`.png */
export const GET_PUBLIC_API_URL_LIGHT_PNG_FROM_UUID = (_: { uuid: string, rootUrlPublicImg: string }): string => {
  const filename = GET_LIGHT_PNG_NAME_FROM_UUID(_.uuid)
  const envEndpoint = _.rootUrlPublicImg
  const endpointSlash = (envEndpoint[envEndpoint.length - 1] === '/') ? envEndpoint : `${envEndpoint}/`
  return `${endpointSlash}${filename}`
}

/** @returns {string} https:\//subdomain.domain.com/api/public_img/`uuid`_dark.png */
export const GET_PUBLIC_API_URL_DARK_PNG_FROM_UUID = (_: { uuid: string, rootUrlPublicImg: string }): string => {
  const filename = GET_DARK_PNG_NAME_FROM_UUID(_.uuid)
  const envEndpoint = _.rootUrlPublicImg
  const endpointSlash = (envEndpoint[envEndpoint.length - 1] === '/') ? envEndpoint : `${envEndpoint}/`
  return `${endpointSlash}${filename}`
}

// * cloudfront static file url

/** @returns {string} https:\//subdomain.cloudfront.com/`filename` */
export const GET_CLOUDFRONT_URL_FILE = (_: { filename: string, cloudfrontUri: string }): string => {
  const envEndpoint = _.cloudfrontUri
  const endpoint = (envEndpoint[envEndpoint.length - 1] === '/') ? envEndpoint : `${envEndpoint}/`
  return `${endpoint}${_.filename}`
  // return `${ENV.cloudfrontUri}/${filename}`
}

/** @returns {string} https:\//subdomain.cloudfront.com/`uuid`.png */
export const GET_CLOUDFRONT_URL_PNG_LIGHT_FROM_UUID = (_: { uuid: string, cloudfrontUri: string }): string => {
  const filename = GET_LIGHT_PNG_NAME_FROM_UUID(_.uuid)
  const envEndpoint = _.cloudfrontUri
  const endpointSlash = (envEndpoint[envEndpoint.length - 1] === '/') ? envEndpoint : `${envEndpoint}/`
  return `${endpointSlash}${filename}`
}

/** @returns {string} https:\//subdomain.cloudfront.com/`uuid`_dark.png */
export const GET_CLOUDFRONT_URL_PNG_DARK_FROM_UUID = (_: { uuid: string, cloudfrontUri: string }): string => {
  const filename = GET_DARK_PNG_NAME_FROM_UUID(_.uuid)
  const envEndpoint = _.cloudfrontUri
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

/** @returns {string} ./uploads/`filename` -> /opt/cme/svd/www/svd/public_html/static/`filename` */
export const GET_SYMLINK_PATH_FROM_FILE_PATH = (_: {
  filePath: string
  fileUploadFolder: string
  publicStaticImageFolder: string
}): string => {
  return _.filePath.replace(_.fileUploadFolder, _.publicStaticImageFolder)
}

/** @returns {string} /opt/cme/svd/www/svd/public_html/static/`filename` -> ./uploads/`filename` */
export const GET_FILE_PATH_FROM_SYMLINK_PATH = (_: {
  symlinkPath: string
  publicStaticImageFolder: string
  fileUploadFolder: string
}): string => {
  return _.symlinkPath.replace(_.publicStaticImageFolder, _.fileUploadFolder)
}

/** @returns {string} https:\//subdomain.cloudfront.com/`filename` -> https:\//subdomain.domain.com/api/public_img/`filename` */
export const GET_PUBLIC_API_URL_FROM_CLOUDFRONT_URL = (_: {
  cloudfrontUrl: string
  cloudfrontUri: string
  rootUrlPublicImg: string
}): string => {
  return _.cloudfrontUrl.replace(_.cloudfrontUri, _.rootUrlPublicImg)
}

/** @returns {string} https:\//subdomain.domain.com/api/public_img/`filename` -> https:\//subdomain.cloudfront.com/`filename` */
export const GET_CLOUDFRONT_URL_FROM_PUBLIC_API_URL = (_: {
  publicImgUrl: string
  rootUrlPublicImg: string
  cloudfrontUri: string
}): string => {
  return _.publicImgUrl.replace(_.rootUrlPublicImg, _.cloudfrontUri)
}

/** @returns {string} (path|url)?`filename` -> ./uploads/`filename` */
export const GET_UPLOADED_FILE_FROM_ANY_STRING = (_: {
  s: string
  fileUploadFolder: string
  publicStaticImageFolder: string
}): string => {
  const s = _.s

  const uuid = EXTRACT_UUID_FROM_STRING(s)

  const fileUploadFolder = _.fileUploadFolder
  const publicStaticImageFolder = _.publicStaticImageFolder

  const strategyList = [
    { if: () => IS_A_STRING_AND_NOT_EMPTY(uuid), then: () => GET_UPLOADED_LIGHT_PNG_FROM_UUID({ uuid, fileUploadFolder }) },
    { if: () => s.includes(fileUploadFolder), then: () => s },
    { if: () => s.includes(publicStaticImageFolder), then: () => GET_UPLOADED_FILE_PATH({ filename: basename(s), fileUploadFolder }) },
    {
      if: () => IS_A_URL(s),
      then: () => {
        const pathList = (new URL(s)).pathname.split('/')
        const filename = pathList[pathList.length - 1]
        return IS_SET(filename) ? GET_UPLOADED_FILE_PATH({ filename, fileUploadFolder }) : ''
      },
    },
  ]

  return strategyList.find(_s => _s.if())?.then() ?? GET_UPLOADED_FILE_PATH({ filename: s, fileUploadFolder })
}

/** @returns {string} (path|url)?`filename` -> /opt/cme/svd/www/svd/public_html/static/`filename` */
export const GET_UPLOADED_FILE_LINK_FROM_ANY_STRING = (_: {
  s: string
  fileUploadFolder: string
  publicStaticImageFolder: string
}): string => {
  const s = _.s

  const uuid = EXTRACT_UUID_FROM_STRING(s)

  const fileUploadFolder = _.fileUploadFolder
  const publicStaticImageFolder = _.publicStaticImageFolder

  const strategyList = [
    { if: () => IS_A_STRING_AND_NOT_EMPTY(uuid), then: () => GET_CLOUDFRONT_LIGHT_LINK_FROM_UUID({ uuid, publicStaticImageFolder }) },
    { if: () => s.includes(fileUploadFolder), then: () => GET_CLOUDFRONT_LINK_PATH({ filename: basename(s), publicStaticImageFolder }) },
    { if: () => s.includes(publicStaticImageFolder), then: () => s },
    {
      if: () => IS_A_URL(s),
      then: () => {
        const pathList = (new URL(s)).pathname.split('/')
        const filename = pathList[pathList.length - 1]
        return IS_SET(filename) ? GET_CLOUDFRONT_LINK_PATH({ filename, publicStaticImageFolder }) : ''
      },
    },
  ]

  return strategyList.find(_s => _s.if())?.then() ?? GET_CLOUDFRONT_LINK_PATH({ filename: s, publicStaticImageFolder })
}

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
