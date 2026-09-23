import { describe, expect, it } from 'bun:test'
import { FROM_LIST_TO_A_B_RECORD } from '../../ts/convert/from-list-to-a-b-record.util.js'
import { FROM_LIST_TO_VALUE_LABEL_RECORD } from '../../ts/convert/from-list-to-value-label-record.util.js'

describe(
  'FROM_LIST_TO_A_B_RECORD',
  () => {
    it.each<{ name: string, input: { list: ReadonlyArray<Record<PropertyKey, unknown>>, keyA: PropertyKey, keyB: PropertyKey }, expected: Record<PropertyKey, unknown> }>([
      {
        name: 'converts a list to a record using specified keys',
        input: {
          list: [
            { id: 1, name: 'Alice' },
            { id: 2, name: 'Bob' },
          ],
          keyA: 'id',
          keyB: 'name',
        },
        expected: { 1: 'Alice', 2: 'Bob' },
      },
      { name: 'returns an empty object for an empty list', input: { list: [], keyA: 'id', keyB: 'name' }, expected: {} },
      {
        name: 'later entries overwrite earlier ones for duplicate keys',
        input: {
          list: [
            { id: 1, name: 'Alice' },
            { id: 1, name: 'Alicia' },
          ],
          keyA: 'id',
          keyB: 'name',
        },
        expected: { 1: 'Alicia' },
      },
      {
        name: 'works with string keys',
        input: {
          list: [
            { code: 'a', label: 'Alpha' },
            { code: 'b', label: 'Beta' },
            { code: 'c', label: 'Gamma' },
          ],
          keyA: 'code',
          keyB: 'label',
        },
        expected: { a: 'Alpha', b: 'Beta', c: 'Gamma' },
      },
      { name: 'keyA k / keyB v maps k values to v values', input: { list: [{ k: 'foo', v: 'bar' }], keyA: 'k', keyB: 'v' }, expected: { foo: 'bar' } },
      { name: 'swapping keyA / keyB produces the inverse record', input: { list: [{ k: 'foo', v: 'bar' }], keyA: 'v', keyB: 'k' }, expected: { bar: 'foo' } },
      { name: 'works with readonly arrays', input: { list: [{ id: 10, val: 'x' }] as const, keyA: 'id', keyB: 'val' }, expected: { 10: 'x' } },
    ])(
      '$name',
      ({ input, expected }) => {
        expect(FROM_LIST_TO_A_B_RECORD(input)).toEqual(expected)
      }
    )
  }
)

describe(
  'FROM_LIST_TO_VALUE_LABEL_RECORD',
  () => {
    it.each<{ name: string, input: ReadonlyArray<{ value: PropertyKey, label: string }>, expected: Record<PropertyKey, string> }>([
      {
        name: 'converts value/label list to a record',
        input: [
          { value: 1, label: 'One' },
          { value: 2, label: 'Two' },
          { value: 3, label: 'Three' },
        ],
        expected: { 1: 'One', 2: 'Two', 3: 'Three' },
      },
      { name: 'returns empty object for empty list', input: [], expected: {} },
      {
        name: 'works with string values',
        input: [
          { value: 'active', label: 'Active' },
          { value: 'inactive', label: 'Inactive' },
        ],
        expected: { active: 'Active', inactive: 'Inactive' },
      },
      {
        name: 'later duplicates overwrite earlier ones',
        input: [
          { value: 1, label: 'First' },
          { value: 1, label: 'Second' },
        ],
        expected: { 1: 'Second' },
      },
    ])(
      '$name',
      ({ input, expected }) => {
        expect(FROM_LIST_TO_VALUE_LABEL_RECORD(input)).toEqual(expected)
      }
    )
  }
)
