import { SORT_OBJECTS } from './sort-objects.util.js'

// eslint-disable-next-line max-params
export const SORT_BY_LABEL = <T extends { label: any }> (a: T, b: T) => {
  return SORT_OBJECTS({ on: (x: T) => x.label, order: 'asc' })(a, b)
}
