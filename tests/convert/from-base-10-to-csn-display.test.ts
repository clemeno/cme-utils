import { describe, expect, it } from 'bun:test'
import { FROM_BASE_10_TO_CSN_DISPLAY } from '../../ts/convert/from-base-10-to-csn-display.util.js'

describe(
  'FROM_BASE_10_TO_CSN_DISPLAY',
  () => {
    const testCases = [
      {
        name: 'no conversion flags — returns decimal string',
        from: '42',
        bCsnHexNumber: false,
        bCsnHexCard: false,
        expected: '42',
      },
      {
        name: 'bCsnHexNumber — converts to hex',
        from: '255',
        bCsnHexNumber: true,
        bCsnHexCard: false,
        expected: 'ff',
      },
      {
        name: 'bCsnHexCard — converts to hex then card serial',
        from: '255',
        bCsnHexNumber: false,
        bCsnHexCard: true,
        expected: '00000000 000000ff',
      },
      {
        name: 'both flags — bCsnHexCard takes precedence, card serial returned',
        from: '255',
        bCsnHexNumber: true,
        bCsnHexCard: true,
        expected: '00000000 000000ff',
      },
      {
        name: 'zero with no flags',
        from: '0',
        bCsnHexNumber: false,
        bCsnHexCard: false,
        expected: '0',
      },
    ]

    it.each(testCases)(
      '$name',
      ({ from, bCsnHexNumber, bCsnHexCard, expected }) => {
        expect(FROM_BASE_10_TO_CSN_DISPLAY({ from, bCsnHexNumber, bCsnHexCard })).toBe(expected)
      }
    )
  }
)
