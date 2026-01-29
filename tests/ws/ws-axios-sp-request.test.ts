import { describe, expect, it } from 'bun:test'
import { WS_AXIOS_SP_REQUEST } from '../../ts/ws/ws-axios-sp-request.util.js'
import { createMockAxiosForWS } from '../mocks/ws-mocks.js'

describe(
  'WS_AXIOS_SP_REQUEST',
  () => {
    const testCases = [
      {
        name: 'request with axios',
        input: {
          axios: createMockAxiosForWS({ data: 'response' }),
          wsResolve: 'example.com',
          wsUrl: 'http://example.com/api',
          method: 'GET',
        },
        expected: {
          bHasResult: true,
          resultData: { data: 'response' },
          method: 'GET',
          url: 'http://example.com/api',
        },
      },
      {
        name: 'wsResolve with 2 parts',
        input: {
          axios: createMockAxiosForWS({ data: 'response' }),
          wsResolve: 'host:8080',
          wsUrl: 'http://example.com/api',
          method: 'POST',
        },
        expected: {
          bHasResult: true,
          resultData: { data: 'response' },
          method: 'POST',
          url: 'http://0.0.31.144/api',
          hostHeader: 'host',
        },
      },
      {
        name: 'wsResolve with 3 parts',
        input: {
          axios: createMockAxiosForWS({ data: 'response' }),
          wsResolve: 'spoofhost:8080:realhost',
          wsUrl: 'http://example.com/api',
          method: 'GET',
        },
        expected: {
          bHasResult: true,
          resultData: { data: 'response' },
          method: 'GET',
          url: 'http://realhost/api',
          hostHeader: 'spoofhost:8080',
        },
      },
      {
        name: 'wsResolve with 4 parts',
        input: {
          axios: createMockAxiosForWS({ data: 'response' }),
          wsResolve: 'spoofhost:8080:realhost:9090',
          wsUrl: 'http://example.com/api',
          method: 'POST',
        },
        expected: {
          bHasResult: true,
          resultData: { data: 'response' },
          method: 'POST',
          url: 'http://realhost:9090/api',
          hostHeader: 'spoofhost:8080',
        },
      },
      {
        name: 'https URL',
        input: {
          axios: createMockAxiosForWS({ data: 'response' }),
          https: {
            Agent: class MockAgent {
              constructor (config: any) {
                this.config = config
              }

              config: any
            },
          },
          wsResolve: 'secure.example.com',
          wsUrl: 'https://secure.example.com/api',
          method: 'GET',
        },
        expected: {
          bHasResult: true,
          resultData: { data: 'response' },
          method: 'GET',
          url: 'https://secure.example.com/api',
          bHasHttpsAgent: true,
        },
      },
      {
        name: 'https URL with wsResolve',
        input: {
          axios: createMockAxiosForWS({ data: 'response' }),
          https: {
            Agent: class MockAgent {
              constructor (config: any) {
                this.config = config
              }

              config: any
            },
          },
          wsResolve: 'spoofhost:443:realhost',
          wsUrl: 'https://example.com/api',
          method: 'GET',
        },
        expected: {
          bHasResult: true,
          resultData: { data: 'response' },
          method: 'GET',
          url: 'https://realhost/api',
          hostHeader: 'spoofhost:443',
          bHasHttpsAgent: true,
          agentServername: 'spoofhost:443',
        },
      },
      {
        name: 'URL with custom port',
        input: {
          axios: createMockAxiosForWS({ data: 'response' }),
          wsResolve: 'example.com',
          wsUrl: 'http://example.com:3000/api',
          method: 'GET',
        },
        expected: {
          bHasResult: true,
          resultData: { data: 'response' },
          method: 'GET',
          url: 'http://example.com:3000/api',
        },
      },
      {
        name: 'request with data object',
        input: {
          axios: createMockAxiosForWS({ data: 'response' }),
          wsResolve: 'example.com',
          wsUrl: 'http://example.com/api',
          method: 'POST',
          dataObject: { key: 'value' },
        },
        expected: {
          bHasResult: true,
          resultData: { data: 'response' },
          method: 'POST',
          url: 'http://example.com/api',
          data: '{"key":"value"}',
          contentType: 'application/json',
          bHasContentLength: true,
        },
      },
      {
        name: 'https URL with wsResolve 4 parts port 443',
        input: {
          axios: createMockAxiosForWS({ data: 'response' }),
          https: {
            Agent: class MockAgent {
              constructor (config: any) {
                this.config = config
              }

              config: any
            },
          },
          wsResolve: 'spoofhost:443:realhost:443',
          wsUrl: 'https://example.com/api',
          method: 'GET',
        },
        expected: {
          bHasResult: true,
          resultData: { data: 'response' },
          method: 'GET',
          url: 'https://realhost/api',
          hostHeader: 'spoofhost:443',
          bHasHttpsAgent: true,
          agentServername: 'spoofhost:443',
        },
      },
      {
        name: 'request with data string',
        input: {
          axios: createMockAxiosForWS({ data: 'response' }),
          wsResolve: 'example.com',
          wsUrl: 'http://example.com/api',
          method: 'POST',
          dataString: 'key=value&other=test',
        },
        expected: {
          bHasResult: true,
          resultData: { data: 'response' },
          method: 'POST',
          url: 'http://example.com/api',
          data: 'key=value&other=test',
          contentType: 'application/x-www-form-urlencoded',
          bHasContentLength: true,
        },
      },
      {
        name: 'request with custom content type',
        input: {
          axios: createMockAxiosForWS({ data: 'response' }),
          wsResolve: 'example.com',
          wsUrl: 'http://example.com/api',
          method: 'POST',
          dataObject: { key: 'value' },
          contentType: 'application/xml',
        },
        expected: {
          bHasResult: true,
          resultData: { data: 'response' },
          method: 'POST',
          url: 'http://example.com/api',
          data: '{"key":"value"}',
          contentType: 'application/xml',
          bHasContentLength: true,
        },
      },
      {
        name: 'default method POST',
        input: {
          axios: createMockAxiosForWS({ data: 'response' }),
          wsResolve: 'example.com',
          wsUrl: 'http://example.com/api',
        },
        expected: {
          bHasResult: true,
          resultData: { data: 'response' },
          method: 'POST',
          url: 'http://example.com/api',
        },
      },
      {
        name: 'error response',
        input: {
          axios: createMockAxiosForWS({ shouldThrow: true, errorMessage: 'Network error' }),
          wsResolve: 'example.com',
          wsUrl: 'http://example.com/api',
          method: 'GET',
        },
        expected: {
          bHasException: true,
          exceptionMessage: 'Network error',
          method: 'GET',
          url: 'http://example.com/api',
        },
      },
      {
        name: 'empty data object',
        input: {
          axios: createMockAxiosForWS({ data: 'response' }),
          wsResolve: 'example.com',
          wsUrl: 'http://example.com/api',
          method: 'POST',
          dataObject: {},
        },
        expected: {
          bHasResult: true,
          resultData: { data: 'response' },
          method: 'POST',
          url: 'http://example.com/api',
          data: '{}',
          contentType: 'application/json',
          bHasContentLength: true,
        },
      },
      {
        name: 'null data object',
        input: {
          axios: createMockAxiosForWS({ data: 'response' }),
          wsResolve: 'example.com',
          wsUrl: 'http://example.com/api',
          method: 'POST',
          dataObject: null,
        },
        expected: {
          bHasResult: true,
          resultData: { data: 'response' },
          method: 'POST',
          url: 'http://example.com/api',
          bHasData: false,
        },
      },
      {
        name: 'empty data string',
        input: {
          axios: createMockAxiosForWS({ data: 'response' }),
          wsResolve: 'example.com',
          wsUrl: 'http://example.com/api',
          method: 'POST',
          dataString: '',
        },
        expected: {
          bHasResult: true,
          resultData: { data: 'response' },
          method: 'POST',
          url: 'http://example.com/api',
          bHasData: false,
        },
      },
      {
        name: 'wsResolve with empty parts',
        input: {
          axios: createMockAxiosForWS({ data: 'response' }),
          wsResolve: 'host::realhost',
          wsUrl: 'http://example.com/api',
          method: 'GET',
        },
        expected: {
          bHasResult: true,
          resultData: { data: 'response' },
          method: 'GET',
          url: 'http://realhost/api',
          hostHeader: 'host',
        },
      },
      {
        name: 'complex URL with query parameters',
        input: {
          axios: createMockAxiosForWS({ data: 'response' }),
          wsResolve: 'host:8080',
          wsUrl: 'http://example.com/api?param1=value1&param2=value2',
          method: 'GET',
        },
        expected: {
          bHasResult: true,
          resultData: { data: 'response' },
          method: 'GET',
          url: 'http://0.0.31.144/api?param1=value1&param2=value2',
          hostHeader: 'host',
        },
      },
    ]

    it.each(testCases)(
      'should handle $name',
      async ({ input, expected }) => {
        const result = await WS_AXIOS_SP_REQUEST(input)
        const axiosInstance = input.axios
        const requestCalls = axiosInstance.getRequestCalls()
        const requestConfig = requestCalls[0]

        // Check result/exception
        if (true === expected.bHasResult) {
          expect(result.exception).toBeUndefined()
          expect(result.result).toEqual(expected.resultData)
        }

        if (true === expected.bHasException) {
          expect(result.exception).toBeDefined()
          expect(result.exception?.message).toBe(expected.exceptionMessage)
          expect(result.result).toBeUndefined()
        }

        // Check axios request configuration
        expect(requestConfig.method).toBe(expected.method)
        expect(requestConfig.url).toBe(expected.url)

        if (typeof expected.data !== 'undefined') {
          expect(requestConfig.data).toBe(expected.data)
        }

        if (false === expected.bHasData) {
          expect(requestConfig.data).toBeUndefined()
        }

        if (typeof expected.contentType !== 'undefined') {
          expect(requestConfig.headers['Content-Type']).toBe(expected.contentType)
        }

        if (true === expected.bHasContentLength) {
          expect(requestConfig.headers).toHaveProperty('Content-Length')
          expect(typeof requestConfig.headers['Content-Length']).toBe('number')
        }

        if (typeof expected.hostHeader !== 'undefined') {
          expect(requestConfig.headers.Host).toBe(expected.hostHeader)
        }

        if (true === expected.bHasHttpsAgent) {
          expect(requestConfig.httpsAgent).toBeDefined()

          if (typeof expected.agentServername !== 'undefined') {
            expect(requestConfig.httpsAgent.config.servername).toBe(expected.agentServername)
          }
        }
      }
    )
  }
)
