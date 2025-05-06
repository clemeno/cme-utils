/** CHECK (is a `number`) */
export const IS_A_NUMBER = (v: any): v is number => (typeof v === 'number') && !isNaN(v)
