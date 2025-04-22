import { type bool } from 'bool'
import { IS_NUMERIC, IS_ON } from 'check/check.util'
import { TO_NUMBER } from 'convert/convert.util'

export const SORT_OBJECTS = (_: { on: (x: any) => any, order?: any, bPureNumeric?: bool }): ((a: any, b: any) => number) => {
  let res: ((a: any, b: any) => number)

  if (_.order === 'desc') {
    if (IS_ON(_.bPureNumeric)) {
      // eslint-disable-next-line max-params
      res = (a, b) => TO_NUMBER(_.on(b)) - TO_NUMBER(_.on(a))
    } else {
      // eslint-disable-next-line max-params
      res = (a, b) => {
        const onA = _.on(a)
        const va = IS_NUMERIC(onA) ? TO_NUMBER(onA) : onA

        const onB = _.on(b)
        const vb = IS_NUMERIC(onB) ? TO_NUMBER(onB) : onB

        return (va < vb) ? 1 : ((vb < va) ? -1 : 0)
      }
    }
  } else {
    if (IS_ON(_.bPureNumeric)) {
      // eslint-disable-next-line max-params
      res = (a, b) => TO_NUMBER(_.on(a)) - TO_NUMBER(_.on(b))
    } else {
      // eslint-disable-next-line max-params
      res = (a, b) => {
        const onA = _.on(a)
        const va = IS_NUMERIC(onA) ? TO_NUMBER(onA) : onA

        const onB = _.on(b)
        const vb = IS_NUMERIC(onB) ? TO_NUMBER(onB) : onB

        return (vb < va) ? 1 : ((va < vb) ? -1 : 0)
      }
    }
  }
  return res
}

// eslint-disable-next-line max-params
export const SORT_BY_LABEL = <T extends { label: any }> (a: T, b: T) => {
  return SORT_OBJECTS({ on: (x: T) => x.label, order: 'asc' })(a, b)
}
