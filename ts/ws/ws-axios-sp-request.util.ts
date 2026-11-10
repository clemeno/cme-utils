import type { AppExceptionResult } from '../app-exception-result.js'
import { GET_EXCEPTION_RESULT_OF } from '../async/get-exception-result-of.util.js'
import { IS_A_STRING_AND_NOT_EMPTY } from '../string/is-a-string-and-not-empty.util.js'
import { IS_SET } from '../check/is-set.util.js'
import { TO_STRING } from '../convert/to-string.util.js'
import type { numeric } from '../numeric.js'

/**
 * Emulates a curl request to an HTTP WebSevice using Axios
 * * provide axios -> import axios from 'axios'
 * * provide https -> import https from 'node:https' (optional, Node and bun only: its Agent skips the certificate check of an "https:" URL)
 * * axios: AxiosStatic
 * * type AE = AxiosError
 * * type AR = AxiosResponse
 *
 * `wsResolve` mimics `curl --resolve`: `'spoofHost:realHost'`, `'spoofHost:spoofPort:realHost'` or `'spoofHost:spoofPort:realHost:realPort'`.
 * The request goes to the real host, with the spoofed `Host` header (and, when `https` is given, the spoofed TLS server name). An empty string disables it.
 * In a browser, which refuses to set the `Host` and `Content-Length` headers, `wsResolve` only changes the target host, and the browser checks the certificate.
 * @param _ - The parameter object
 * @param _.axios - The `axios` instance, whose `request` sends the request
 * @param _.https - The `node:https` module (Node and bun), optional: for an `https:` URL, its `Agent` skips the certificate check; without it, the runtime checks the certificate
 * @param _.wsResolve - The resolve rule, or an empty string for none
 * @param _.method - The HTTP method, `'POST'` by default
 * @param _.wsUrl - The URL of the WebService
 * @param _.dataObject - The body to send as JSON (wins over `dataString`)
 * @param _.dataString - The raw body to send
 * @param _.contentType - The Content-Type header, JSON for a `dataObject` and form-urlencoded otherwise by default
 * @returns A promise of `{ exception, result }`: the axios response in `result`, or the thrown error in `exception`
 * @example
 * ```typescript
 * // a stand-in for axios that returns the request config it receives
 * const axios = { request: async (config: unknown) => config }
 * await WS_AXIOS_SP_REQUEST({ axios, wsResolve: '', wsUrl: 'http://example.com/api' }) // returns { exception: undefined, result: { method: 'POST', url: 'http://example.com/api' } }
 * await WS_AXIOS_SP_REQUEST({ axios, wsResolve: '', wsUrl: 'http://example.com/api', method: 'PUT', dataObject: { a: 1 } }) // returns { exception: undefined, result: { method: 'PUT', url: 'http://example.com/api', data: '{"a":1}', headers: { 'Content-Length': 7, 'Content-Type': 'application/json' } } }
 * // wsResolve sends the request to 10.0.0.5 with the Host header example.com
 * await WS_AXIOS_SP_REQUEST({ axios, wsResolve: 'example.com:10.0.0.5', wsUrl: 'http://example.com/api', dataString: 'a=1' }) // returns { exception: undefined, result: { method: 'POST', url: 'http://10.0.0.5/api', data: 'a=1', headers: { 'Content-Length': 3, 'Content-Type': 'application/x-www-form-urlencoded', Host: 'example.com' } } }
 * // a rejected request ends in `exception`
 * const failingAxios = { request: async () => { throw 'boom' } }
 * await WS_AXIOS_SP_REQUEST({ axios: failingAxios, wsResolve: '', wsUrl: 'http://example.com' }) // returns { exception: 'boom', result: undefined }
 * ```
 */
export async function WS_AXIOS_SP_REQUEST<AxiosStatic = any, NodeHttps = any, AxiosResult = any, AxiosError = any> (_: {
  axios: AxiosStatic
  https?: NodeHttps
  wsResolve: string
  method?: string
  wsUrl: string
  dataObject?: unknown
  dataString?: string
  contentType?: string
}): Promise<AppExceptionResult<AxiosError, AxiosResult>> {
  const method = _.method ?? 'POST'

  const envWsResolvePartList = _.wsResolve.split(':')
  const envWsResolvePartListLength = envWsResolvePartList.length

  const bWsResolve = envWsResolvePartListLength > 1

  const bEnvWsResolve2Parts = envWsResolvePartListLength === 2
  const bEnvWsResolve3Parts = envWsResolvePartListLength === 3
  const bEnvWsResolve4Parts = envWsResolvePartListLength === 4

  let url = _.wsUrl

  const urlObject = new URL(url)

  const _https = 'https:'

  const bUrlHttps = urlObject.protocol === _https

  const bUrlCustomPort = IS_A_STRING_AND_NOT_EMPTY(urlObject.port)

  let envWsResolveSpoofHostname = urlObject.hostname
  let envWsResolveSpoofPort = urlObject.port
  let envWsResolveSpoofHost = urlObject.host

  let envWsResolveRealHostname = urlObject.hostname
  let envWsResolveRealPort = urlObject.port
  let envWsResolveRealHost = urlObject.host

  if (bWsResolve) {
    envWsResolveSpoofHostname = envWsResolvePartList[0]

    if (bEnvWsResolve2Parts) {
      envWsResolveRealHostname = envWsResolvePartList[1]

      envWsResolveSpoofHost = envWsResolveSpoofHostname

      envWsResolveRealHost = envWsResolveRealHostname

      urlObject.hostname = envWsResolveRealHostname
      url = urlObject.href
    } else if (bEnvWsResolve3Parts || (bEnvWsResolve4Parts && !IS_A_STRING_AND_NOT_EMPTY(envWsResolvePartList[3]))) {
      envWsResolveSpoofPort = envWsResolvePartList[1]
      const bEnvWsResolveSpoofPort = IS_A_STRING_AND_NOT_EMPTY(envWsResolveSpoofPort)

      envWsResolveSpoofHost = `${envWsResolveSpoofHostname}${bEnvWsResolveSpoofPort ? `:${envWsResolveSpoofPort}` : ''}`

      envWsResolveRealHostname = envWsResolvePartList[2]

      envWsResolveRealHost = `${envWsResolveRealHostname}${bEnvWsResolveSpoofPort ? `:${envWsResolveSpoofPort}` : ''}`

      urlObject.hostname = envWsResolveRealHostname
      url = urlObject.href
    } else if (bEnvWsResolve4Parts && IS_A_STRING_AND_NOT_EMPTY(envWsResolvePartList[3])) {
      envWsResolveSpoofPort = envWsResolvePartList[1]
      const bEnvWsResolveSpoofPort = IS_A_STRING_AND_NOT_EMPTY(envWsResolveSpoofPort)

      envWsResolveSpoofHost = `${envWsResolveSpoofHostname}${bEnvWsResolveSpoofPort ? `:${envWsResolveSpoofPort}` : ''}`

      envWsResolveRealHostname = envWsResolvePartList[2]
      envWsResolveRealPort = envWsResolvePartList[3]
      const bEnvWsResolveRealPort = IS_A_STRING_AND_NOT_EMPTY(envWsResolveRealPort)

      envWsResolveRealHost = `${envWsResolveRealHostname}${bEnvWsResolveRealPort ? `:${envWsResolveRealPort}` : ''}`

      if (!bUrlCustomPort && bUrlHttps && (envWsResolveRealPort === '443')) {
        urlObject.hostname = envWsResolveRealHostname
        url = urlObject.href
      } else {
        urlObject.host = envWsResolveRealHost
        url = urlObject.href
      }
    }
  }

  /** AxiosRequestConfig */
  const axiosConfig: {
    method: string
    url: string
    data?: string
    headers?: Record<string, numeric>
    httpsAgent?: unknown
  } = { method, url }

  const dataObject = _.dataObject
  const bDataObject = IS_SET(dataObject)

  const dataString = bDataObject ? JSON.stringify(_.dataObject) : TO_STRING(_.dataString)
  const dataStringLength = dataString.length
  const bSataString = 0 < dataStringLength

  const contentType = _.contentType ?? (bDataObject ? 'application/json' : 'application/x-www-form-urlencoded')

  if (bSataString) {
    axiosConfig.data = dataString
    axiosConfig.headers = {
      ...(axiosConfig.headers ?? {}),
      'Content-Length': dataStringLength,
      'Content-Type': contentType,
    }
  }

  if (bWsResolve) {
    axiosConfig.headers = {
      ...(axiosConfig.headers ?? {}),
      Host: envWsResolveSpoofHost,
    }
  }

  // a browser has no node:https: it sends the request with its own certificate check
  if (bUrlHttps && _.https != null) {
    // ? https.AgentOptions
    const agentConfig: Record<string, unknown> = { rejectUnauthorized: false }

    if (bWsResolve) {
      agentConfig.servername = envWsResolveSpoofHost
    }

    axiosConfig.httpsAgent = new (_.https as any).Agent(agentConfig)
  }

  const exceptionResult = await GET_EXCEPTION_RESULT_OF<AxiosError, AxiosResult>((_.axios as any).request(axiosConfig))

  return exceptionResult
}
