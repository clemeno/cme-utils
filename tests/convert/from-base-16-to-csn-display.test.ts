import { describe, expect, it } from 'bun:test'
import { FROM_BASE_16_TO_CSN_DISPLAY } from '../../ts/convert/from-base-16-to-csn-display.util.js'

describe(
  'FROM_BASE_16_TO_CSN_DISPLAY',
  () => {
    const testCases = [
      {
        name: 'no flags — returns hex string as-is',
        from: 'ff',
        bCsnHexCard: false,
        bCsnDecNumber: false,
        expected: 'ff',
      },
      {
        name: 'bCsnHexCard — converts to card serial',
        from: 'ff',
        bCsnHexCard: true,
        bCsnDecNumber: false,
        expected: '00000000 000000ff',
      },
      {
        name: 'bCsnDecNumber — converts hex to decimal',
        from: 'ff',
        bCsnHexCard: false,
        bCsnDecNumber: true,
        expected: '255',
      },
      {
        name: 'bCsnHexCard takes precedence over bCsnDecNumber',
        from: 'ff',
        bCsnHexCard: true,
        bCsnDecNumber: true,
        expected: '00000000 000000ff',
      },
      {
        name: 'full 16-char hex with bCsnHexCard',
        from: '1122334455667788',
        bCsnHexCard: true,
        bCsnDecNumber: false,
        expected: '11223344 55667788',
      },
    ]

    it.each(testCases)(
      '$name',
      ({ from, bCsnHexCard, bCsnDecNumber, expected }) => {
        expect(FROM_BASE_16_TO_CSN_DISPLAY({ from, bCsnHexCard, bCsnDecNumber })).toBe(expected)
      }
    )
  }
)
