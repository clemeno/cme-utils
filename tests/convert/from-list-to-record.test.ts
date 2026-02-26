import { describe, expect, it } from 'bun:test'
import { FROM_LIST_TO_A_B_RECORD } from '../../ts/convert/from-list-to-a-b-record.util.js'
import { FROM_LIST_TO_VALUE_LABEL_RECORD } from '../../ts/convert/from-list-to-value-label-record.util.js'

describe(
  'FROM_LIST_TO_A_B_RECORD',
  () => {
    it('converts a list to a record using specified keys', () => {
      const list = [
        { id: 1, name: 'Alice' },
        { id: 2, name: 'Bob' },
      ]
      expect(FROM_LIST_TO_A_B_RECORD({ list, keyA: 'id', keyB: 'name' })).toEqual({ 1: 'Alice', 2: 'Bob' })
    })

    it('returns an empty object for an empty list', () => {
      expect(FROM_LIST_TO_A_B_RECORD({ list: [], keyA: 'id', keyB: 'name' })).toEqual({})
    })

    it('later entries overwrite earlier ones for duplicate keys', () => {
      const list = [
        { id: 1, name: 'Alice' },
        { id: 1, name: 'Alicia' },
      ]
      expect(FROM_LIST_TO_A_B_RECORD({ list, keyA: 'id', keyB: 'name' })).toEqual({ 1: 'Alicia' })
    })

    it('works with string keys', () => {
      const list = [
        { code: 'a', label: 'Alpha' },
        { code: 'b', label: 'Beta' },
        { code: 'c', label: 'Gamma' },
      ]
      expect(FROM_LIST_TO_A_B_RECORD({ list, keyA: 'code', keyB: 'label' })).toEqual({
        a: 'Alpha',
        b: 'Beta',
        c: 'Gamma',
      })
    })

    it('swapping keyA / keyB produces the inverse record', () => {
      const list = [{ k: 'foo', v: 'bar' }]
      const ab = FROM_LIST_TO_A_B_RECORD({ list, keyA: 'k', keyB: 'v' })
      const ba = FROM_LIST_TO_A_B_RECORD({ list, keyA: 'v', keyB: 'k' })
      expect(ab).toEqual({ foo: 'bar' })
      expect(ba).toEqual({ bar: 'foo' })
    })

    it('works with readonly arrays', () => {
      const list = [{ id: 10, val: 'x' }] as const
      expect(FROM_LIST_TO_A_B_RECORD({ list, keyA: 'id', keyB: 'val' })).toEqual({ 10: 'x' })
    })
  }
)

describe(
  'FROM_LIST_TO_VALUE_LABEL_RECORD',
  () => {
    it('converts value/label list to a record', () => {
      const list = [
        { value: 1, label: 'One' },
        { value: 2, label: 'Two' },
        { value: 3, label: 'Three' },
      ]
      expect(FROM_LIST_TO_VALUE_LABEL_RECORD(list)).toEqual({ 1: 'One', 2: 'Two', 3: 'Three' })
    })

    it('returns empty object for empty list', () => {
      expect(FROM_LIST_TO_VALUE_LABEL_RECORD([])).toEqual({})
    })

    it('works with string values', () => {
      const list = [
        { value: 'active', label: 'Active' },
        { value: 'inactive', label: 'Inactive' },
      ]
      expect(FROM_LIST_TO_VALUE_LABEL_RECORD(list)).toEqual({
        active: 'Active',
        inactive: 'Inactive',
      })
    })

    it('later duplicates overwrite earlier ones', () => {
      const list = [
        { value: 1, label: 'First' },
        { value: 1, label: 'Second' },
      ]
      expect(FROM_LIST_TO_VALUE_LABEL_RECORD(list)).toEqual({ 1: 'Second' })
    })
  }
)
