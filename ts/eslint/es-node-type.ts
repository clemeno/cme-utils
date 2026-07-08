/**
 * Minimal structural shape of the ESLint/ESTree AST nodes read by the eslint
 * utils. Only the fields these utils touch are declared, so the library stays
 * free of an @types/estree dependency.
 */
export interface EsNode {
  type: string
  parent: EsNode
  computed?: boolean
  static?: boolean
  async?: boolean
  generator?: boolean
  kind?: string
  name?: string
  id?: EsNode | null
  key?: EsNode
  property?: EsNode
  left?: EsNode
  value?: unknown
}
