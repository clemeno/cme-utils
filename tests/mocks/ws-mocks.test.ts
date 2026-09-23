import { describe, expect, it } from 'bun:test'
import { createMockAxiosForWS } from './ws-mocks.js'

describe(
  'WS Mocks',
  () => {
    describe(
      'createMockAxiosForWS',
      () => {
        it.each<{ name: string, input: Parameters<typeof createMockAxiosForWS>[0], expected: { data: unknown } }>([
          { name: 'should create a mock axios for WS with default data', input: undefined, expected: { data: 'response' } },
          { name: 'should create a mock axios for WS with custom data', input: { data: { message: 'custom response' } }, expected: { data: { message: 'custom response' } } },
        ])(
          '$name',
          async ({ input, expected }) => {
            const mock = createMockAxiosForWS(input)
            expect(await mock.request({ url: 'ws://example.com' })).toEqual(expected)
          }
        )

        it.each<{ name: string, input: Parameters<typeof createMockAxiosForWS>[0], expected: string }>([
          { name: 'should throw error when shouldThrow is true', input: { shouldThrow: true, errorMessage: 'ws error' }, expected: 'ws error' },
          { name: 'should throw the default error message when shouldThrow is true without errorMessage', input: { shouldThrow: true }, expected: 'mock error' },
        ])(
          '$name',
          async ({ input, expected }) => {
            const mock = createMockAxiosForWS(input)
            await expect(mock.request({ url: 'ws://example.com' })).rejects.toThrow(new Error(expected))
            expect(mock.getRequestCalls()).toEqual([{ url: 'ws://example.com' }])
          }
        )

        it.each<{ name: string, input: unknown[] }>([
          { name: 'should return empty calls array initially', input: [] },
          {
            name: 'should track request calls',
            input: [
              { url: 'ws://example1.com', method: 'POST' },
              { url: 'ws://example2.com', headers: { 'content-type': 'application/json' } },
            ],
          },
          {
            name: 'should handle complex config objects',
            input: [
              {
                url: 'ws://example.com',
                method: 'POST',
                data: { message: 'hello' },
                headers: { authorization: 'Bearer token' },
                timeout: 5000,
              },
            ],
          },
        ])(
          '$name',
          async ({ input }) => {
            const mock = createMockAxiosForWS()
            await Promise.all(input.map(async config => await mock.request(config)))
            expect(mock.getRequestCalls()).toEqual(input)
          }
        )
      }
    )
  }
)
