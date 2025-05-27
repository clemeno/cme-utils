import type { AppExceptionResult } from '../app-exception-result.js'
import { GET_EXCEPTION_RESULT_OF } from '../async/get-exception-result-of.util.js'
import { IS_A_STRING_AND_NOT_EMPTY } from '../check/is-a-string-and-not-empty.util.js'
import { IS_SET } from '../check/is-set.util.js'
import { TO_STRING } from '../convert/to-string.util.js'
import type { numeric } from '../numeric.js'

/**
 * Emulates a curl request to an HTTP WebSevice using Axios
 * * provide axios -> import axios from 'axios'
 * * provide https -> import https from 'node:https' (optional, required only for an "https:" URL protocol)
 * * axios: AxiosStatic
 * * type AE = AxiosError
 * * type AR = AxiosResponse
 */
export const WS_AXIOS_SP_REQUEST = async <AxiosStatic = any, NodeHttps = any, AxiosResult = any, AxiosError = any> (_: {
  axios: AxiosStatic
  https?: NodeHttps
  wsResolve: string
  method?: string
  wsUrl: string
  dataObject?: any
  dataString?: string
  contentType?: string
}): Promise<AppExceptionResult<AxiosError, AxiosResult>> => {
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
    data?: any
    headers?: Record<string, numeric>
    httpsAgent?: any
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

  if (bUrlHttps) {
    // ? https.AgentOptions
    const agentConfig: any = { rejectUnauthorized: false }

    if (bWsResolve) {
      agentConfig.servername = envWsResolveSpoofHost
    }

    axiosConfig.httpsAgent = new (_.https as any).Agent(agentConfig)
  }

  const exceptionResult = await GET_EXCEPTION_RESULT_OF<AxiosError, AxiosResult>((_.axios as any).request(axiosConfig))

  return exceptionResult
}
