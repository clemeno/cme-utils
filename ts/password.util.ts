import { TO_STRING } from './convert/to-string.util.js'

export type hashFnType = (clear: string, iterationCount: number) => Promise<string>

export const ENCRYPT_PASSWORD = async (_: {
  clear: any
  hashFn: hashFnType
  iterations?: number
}): Promise<string> => {
  const res = await _.hashFn(TO_STRING(_.clear), 12)
  return res
}

export type compareFnType = (clear: string, hash: string) => Promise<boolean>

export const COMPARE_PASSWORD = async (_: {
  clear: any
  hash: string
  compareFn: compareFnType
}): Promise<boolean> => {
  const res = await _.compareFn(TO_STRING(_.clear), _.hash)
  return res
}
