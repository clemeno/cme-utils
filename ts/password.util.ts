import { compare, hash } from 'bcryptjs'
import { TO_STRING } from 'convert/to-string.util'

export const ENCRYPT_PASSWORD = async (clear: any): Promise<string> => await hash(TO_STRING(clear), 12)

export const COMPARE_PASSWORD = async (_: { clear: any, hash: string }): Promise<boolean> => await compare(TO_STRING(_.clear), _.hash)
