import { FROM_LIST_TO_A_B_RECORD } from './from-list-to-a-b-record.util.js'

/**
 * Convert a list of options to a mapping of each `{ [value]: label }` in a single object
 * @param optionList list of objects matching `{ value, label }`
 * @returns a `Record` where the keys are the stringified values and the values are the stringified labels
 * @example `[{ value: 1, label: 'One' }, { value: 2, label: 'Two' }]` -> `{ '1': 'One', '2': 'Two' }`
 */
export const FROM_LIST_TO_VALUE_LABEL_RECORD = <T extends Record<PropertyKey, any>> (
  list: T[] | ReadonlyArray<T>
): Record<T['value'], T['label']> => FROM_LIST_TO_A_B_RECORD({ list, keyA: 'value', keyB: 'label' })
