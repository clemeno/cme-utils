import { SORT_OBJECTS } from './sort-objects.util.js'

export const SORT_BY_LABEL = SORT_OBJECTS({ on: x => x.label, order: 'asc' })
