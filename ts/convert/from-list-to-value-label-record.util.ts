import { FROM_LIST_TO_A_B_RECORD } from './from-list-to-a-b-record.util.js'

/**
 * Convert a list of options to a mapping of each `{ [value]: label }` in a single object
 * @param list - list of objects matching `{ value, label }`
 * @returns a `Record` where the keys are the stringified values and the values are the labels
 * @example
 * ```typescript
 * FROM_LIST_TO_VALUE_LABEL_RECORD([{ value: 1, label: 'One' }, { value: 2, label: 'Two' }]) // returns { 1: 'One', 2: 'Two' }
 * FROM_LIST_TO_VALUE_LABEL_RECORD([]) // returns {}
 * ```
 */
export function FROM_LIST_TO_VALUE_LABEL_RECORD<T extends Record<PropertyKey, any>> (
  list: T[] | ReadonlyArray<T>
): Record<T['value'], T['label']> {
  return FROM_LIST_TO_A_B_RECORD({ list, keyA: 'value', keyB: 'label' })
}
