import { afterEach, describe, expect, it, mock, spyOn } from 'bun:test'
import { GET_RANDOM_BYTE_LIST } from '../../ts/number/get-random-byte-list.util.js'

describe(
  'GET_RANDOM_BYTE_LIST',
  () => {
    const originalCrypto = Object.getOwnPropertyDescriptor(globalThis, 'crypto') ?? {}
    const originalRandom = Math.random

    // restore even when an assertion fails, so a broken case can't leak stubs into other tests
    afterEach(() => {
      Object.defineProperty(globalThis, 'crypto', originalCrypto)
      Math.random = originalRandom
      mock.restore()
    })

    const injectedCases: Array<{ name: string, input: Parameters<typeof GET_RANDOM_BYTE_LIST>[0], expected: Uint8Array }> = [
      { name: 'fills the bytes from the injected getRandomValues', input: { length: 3, getRandomValues: array => array.fill(7) }, expected: new Uint8Array([7, 7, 7]) },
      { name: 'returns no byte for a length of 0', input: { length: 0, getRandomValues: array => array.fill(7) }, expected: new Uint8Array(0) },
    ]

    it.each(injectedCases)(
      '$name',
      ({ input, expected }) => {
        expect(GET_RANDOM_BYTE_LIST(input)).toEqual(expected)
      }
    )

    it(
      'asks for at most 65536 bytes per call, the getRandomValues quota',
      () => {
        const callLengthList: number[] = []
        const bytes = GET_RANDOM_BYTE_LIST({ length: 65536 * 2 + 1, getRandomValues: array => { callLengthList.push(array.length); return array.fill(1) } })
        expect(callLengthList).toEqual([65536, 65536, 1])
        expect(bytes).toEqual(new Uint8Array(65536 * 2 + 1).fill(1))
      }
    )

    // the real getRandomValues runs, so the call must keep it bound to crypto; its bytes can only be counted
    it(
      'draws from the global crypto when nothing is injected',
      () => {
        const getRandomValuesSpy = spyOn(crypto, 'getRandomValues')
        expect(GET_RANDOM_BYTE_LIST({ length: 16 }).length).toBe(16)
        expect(getRandomValuesSpy).toHaveBeenCalledTimes(1)
      }
    )

    it(
      'falls back to Math.random without a global crypto',
      () => {
        Object.defineProperty(globalThis, 'crypto', { value: undefined, configurable: true, writable: true })
        Math.random = () => 0.5
        expect(GET_RANDOM_BYTE_LIST({ length: 3 })).toEqual(new Uint8Array([128, 128, 128]))
      }
    )
  }
)
