import { describe, expect, it } from 'bun:test'
import { AppSort } from '../ts/app-sort.js'

describe(
  'AppSort',
  () => {
    it.each<{ name: string, input: ConstructorParameters<typeof AppSort>, expected: AppSort }>([
      { name: 'default constructor creates instance with empty column', input: [], expected: { column: '' } },
      { name: 'constructor with undefined argument', input: [undefined], expected: { column: '' } },
      { name: 'assigns column and asc order', input: [{ column: 'name', order: 'asc' }], expected: { column: 'name', order: 'asc' } },
      { name: 'assigns desc order', input: [{ column: 'created_at', order: 'desc' }], expected: { column: 'created_at', order: 'desc' } },
      { name: 'assigns empty string order', input: [{ column: 'id', order: '' }], expected: { column: 'id', order: '' } },
      { name: 'assigns bDisabled', input: [{ column: 'id', bDisabled: true }], expected: { column: 'id', bDisabled: true } },
      { name: 'keeps the empty column when only order is given', input: [{ order: 'asc' }], expected: { column: '', order: 'asc' } },
    ])(
      '$name',
      ({ input, expected }) => {
        expect(new AppSort(...input)).toEqual(expected)
      }
    )
  }
)
