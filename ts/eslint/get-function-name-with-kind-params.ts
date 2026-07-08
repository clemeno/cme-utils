import type { EsNode } from './es-node-type.js'

/** Parameters for GET_FUNCTION_NAME_WITH_KIND. */
export interface GetFunctionNameWithKindParams {
  node: EsNode
  sourceCode?: { getText: (node: EsNode) => string }
}
