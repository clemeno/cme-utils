import { describe, expect, it } from 'bun:test'
import { createMockAxiosForWS } from './ws-mocks.js'

describe(
  'WS Mocks',
  () => {
    describe(
      'createMockAxiosForWS',
      () => {
        it(
          'should create a mock axios for WS with default data',
          async () => {
            const mock = createMockAxiosForWS()
            const response = await mock.request({ url: 'ws://example.com' })
            expect(response.data).toBe('response')
          }
        )

        it(
          'should create a mock axios for WS with custom data',
          async () => {
            const customData = { message: 'custom response' }
            const mock = createMockAxiosForWS({ data: customData })
            const response = await mock.request({ url: 'ws://example.com' })
            expect(response.data).toEqual(customData)
          }
        )

        it(
          'should throw error when shouldThrow is true',
          async () => {
            const mock = createMockAxiosForWS({ shouldThrow: true, errorMessage: 'ws error' })
            await expect(mock.request({ url: 'ws://example.com' })).rejects.toThrow('ws error')
          }
        )

        it(
          'should track request calls',
          async () => {
            const mock = createMockAxiosForWS()
            const config1 = { url: 'ws://example1.com', method: 'POST' }
            const config2 = { url: 'ws://example2.com', headers: { 'content-type': 'application/json' } }

            await mock.request(config1)
            await mock.request(config2)

            const calls = mock.getRequestCalls()
            expect(calls).toHaveLength(2)
            expect(calls[0]).toEqual(config1)
            expect(calls[1]).toEqual(config2)
          }
        )

        it(
          'should return empty calls array initially',
          () => {
            const mock = createMockAxiosForWS()
            expect(mock.getRequestCalls()).toEqual([])
          }
        )

        it(
          'should handle complex config objects',
          async () => {
            const mock = createMockAxiosForWS()
            const complexConfig = {
              url: 'ws://example.com',
              method: 'POST',
              data: { message: 'hello' },
              headers: { authorization: 'Bearer token' },
              timeout: 5000,
            }

            await mock.request(complexConfig)

            const calls = mock.getRequestCalls()
            expect(calls).toHaveLength(1)
            expect(calls[0]).toEqual(complexConfig)
          }
        )
      }
    )
  }
)
