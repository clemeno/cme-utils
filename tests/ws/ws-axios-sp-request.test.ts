import { describe, expect, it } from 'bun:test'
import { WS_AXIOS_SP_REQUEST } from '../../ts/ws/ws-axios-sp-request.util.js'
import { createMockAxiosForWS } from '../mocks/ws-mocks.js'

describe(
  'WS_AXIOS_SP_REQUEST',
  () => {
    // a node:https stand-in: the util builds its Agent with the TLS options
    class MockAgent {
      constructor (config: any) {
        this.config = config
      }

      config: any
    }

    const https = { Agent: MockAgent }

    const okResult = { exception: undefined, result: { data: 'response' } }

    const testCases: Array<{
      name: string
      input: Parameters<typeof WS_AXIOS_SP_REQUEST>[0] & { axios: ReturnType<typeof createMockAxiosForWS> }
      expected: { result: { exception: unknown, result: unknown }, request: unknown }
    }> = [
      {
        name: 'request with axios',
        input: {
          axios: createMockAxiosForWS({ data: 'response' }),
          wsResolve: 'example.com',
          wsUrl: 'http://example.com/api',
          method: 'GET',
        },
        expected: {
          result: okResult,
          request: { method: 'GET', url: 'http://example.com/api' },
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
          result: okResult,
          request: { method: 'POST', url: 'http://0.0.31.144/api', headers: { Host: 'host' } },
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
          result: okResult,
          request: { method: 'GET', url: 'http://realhost/api', headers: { Host: 'spoofhost:8080' } },
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
          result: okResult,
          request: { method: 'POST', url: 'http://realhost:9090/api', headers: { Host: 'spoofhost:8080' } },
        },
      },
      {
        name: 'https URL',
        input: {
          axios: createMockAxiosForWS({ data: 'response' }),
          https,
          wsResolve: 'secure.example.com',
          wsUrl: 'https://secure.example.com/api',
          method: 'GET',
        },
        expected: {
          result: okResult,
          request: {
            method: 'GET',
            url: 'https://secure.example.com/api',
            httpsAgent: new MockAgent({ rejectUnauthorized: false }),
          },
        },
      },
      {
        // a browser has no node:https: the request goes out with the browser's own certificate check
        name: 'https URL without the https module',
        input: {
          axios: createMockAxiosForWS({ data: 'response' }),
          wsResolve: 'secure.example.com',
          wsUrl: 'https://secure.example.com/api',
          method: 'GET',
        },
        expected: {
          result: okResult,
          request: { method: 'GET', url: 'https://secure.example.com/api' },
        },
      },
      {
        name: 'https URL with wsResolve',
        input: {
          axios: createMockAxiosForWS({ data: 'response' }),
          https,
          wsResolve: 'spoofhost:443:realhost',
          wsUrl: 'https://example.com/api',
          method: 'GET',
        },
        expected: {
          result: okResult,
          request: {
            method: 'GET',
            url: 'https://realhost/api',
            headers: { Host: 'spoofhost:443' },
            httpsAgent: new MockAgent({ rejectUnauthorized: false, servername: 'spoofhost:443' }),
          },
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
          result: okResult,
          request: { method: 'GET', url: 'http://example.com:3000/api' },
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
          result: okResult,
          request: {
            method: 'POST',
            url: 'http://example.com/api',
            data: '{"key":"value"}',
            headers: { 'Content-Length': 15, 'Content-Type': 'application/json' },
          },
        },
      },
      {
        name: 'https URL with wsResolve 4 parts port 443',
        input: {
          axios: createMockAxiosForWS({ data: 'response' }),
          https,
          wsResolve: 'spoofhost:443:realhost:443',
          wsUrl: 'https://example.com/api',
          method: 'GET',
        },
        expected: {
          result: okResult,
          request: {
            method: 'GET',
            url: 'https://realhost/api',
            headers: { Host: 'spoofhost:443' },
            httpsAgent: new MockAgent({ rejectUnauthorized: false, servername: 'spoofhost:443' }),
          },
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
          result: okResult,
          request: {
            method: 'POST',
            url: 'http://example.com/api',
            data: 'key=value&other=test',
            headers: { 'Content-Length': 20, 'Content-Type': 'application/x-www-form-urlencoded' },
          },
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
          result: okResult,
          request: {
            method: 'POST',
            url: 'http://example.com/api',
            data: '{"key":"value"}',
            headers: { 'Content-Length': 15, 'Content-Type': 'application/xml' },
          },
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
          result: okResult,
          request: { method: 'POST', url: 'http://example.com/api' },
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
          result: { exception: new Error('Network error'), result: undefined },
          request: { method: 'GET', url: 'http://example.com/api' },
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
          result: okResult,
          request: {
            method: 'POST',
            url: 'http://example.com/api',
            data: '{}',
            headers: { 'Content-Length': 2, 'Content-Type': 'application/json' },
          },
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
          result: okResult,
          request: { method: 'POST', url: 'http://example.com/api' },
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
          result: okResult,
          request: { method: 'POST', url: 'http://example.com/api' },
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
          result: okResult,
          request: { method: 'GET', url: 'http://realhost/api', headers: { Host: 'host' } },
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
          result: okResult,
          request: { method: 'GET', url: 'http://0.0.31.144/api?param1=value1&param2=value2', headers: { Host: 'host' } },
        },
      },
    ]

    it.each(testCases)(
      'should handle $name',
      async ({ input, expected }) => {
        const result = await WS_AXIOS_SP_REQUEST(input)

        expect(result).toEqual(expected.result)
        expect(input.axios.getRequestCalls()).toEqual([expected.request])
      }
    )
  }
)
