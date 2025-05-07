import { getFunctionNameWithKind } from 'eslint-utils'

/**
 * @fileoverview A rule to set the maximum number of return statements in a function.
 * Based on tomyam2020's work
 * @see https://github.com/tomyam2020/eslint-plugin-max-return-statements-per-function
 */

const DEFAULT_MAX_COUNT = 1

/**
 * Converts the first letter of a string to uppercase.
 * @param {string} s The string to operate on
 * @returns {string} The converted string
 */
function upperCaseFirst (s: string): string {
  return (s.length <= 1) ? s.toUpperCase() : s[0].toUpperCase() + s.slice(1)
}

/** @type {import('eslint').Rule.RuleModule} */
export const MAX_RETURN_STATEMENTS_PER_FUNCTION_RULE = {
  meta: {
    type: 'suggestion',
    docs: {
      description: 'enforce a maximum number of return statements allowed in function blocks',
      recommended: false,
      url: 'https://github.com/tomyam2020/eslint-plugin-max-return-statements-per-function/blob/main/README.md',
    },
    schema: [
      {
        type: 'integer',
        minimum: 0,
        default: DEFAULT_MAX_COUNT,
      },
    ],
    messages: {
      exceed: '{{ name }} has too many return statements ({{ count }}). Maximum allowed is {{ max }}.',
    },
  },

  create (context: any): any {
    /**
     * =====================================================================
     * Helpers
     * =====================================================================
     */
    const functionStack: number[] = []

    const maxReturnStatements = Number(context.options[0] ?? DEFAULT_MAX_COUNT)

    /**
     * Reports a node if it has too many statements
     * @param {import('eslint').Rule.Node} node node to evaluate
     * @param {any} count Number of statements in node
     * @param {any} max Maximum number of statements allowed
     * @returns {void}
     * @private
     */
    // eslint-disable-next-line max-params
    function reportIfTooManyStatements (node: any, count: any, max: any) {
      if (count > max) {
        const name = upperCaseFirst(getFunctionNameWithKind(node))

        context.report({
          node,
          messageId: 'exceed',
          data: { name, count, max },
        })
      }
    }

    /**
     * When parsing a new function, store it in our function stack
     * @returns {void}
     * @private
     */
    function startFunction (): void {
      functionStack.push(0)
    }

    /**
     * Evaluate the node at the end of function
     * @param {import('eslint').Rule.Node} node node to evaluate
     * @returns {void}
     * @private
     */
    function endFunction (node: any): void {
      const count = functionStack.pop()

      /*
       * This rule does not apply to class static blocks, but we have to track them so
       * that statements in them do not count as statements in the enclosing function.
       */
      if (node.type !== 'StaticBlock') {
        reportIfTooManyStatements(node, count, maxReturnStatements)
      }
    }

    /**
     * Increment the count of return statements in the function.
     * @param {import('eslint').Rule.Node | undefined} node node to evaluate
     * @returns {void}
     * @private
     */
    function countReturnStatements (node: any): void {
      functionStack[functionStack.length - 1] += 1
    }

    /**
     * =====================================================================
     * Public API
     * =====================================================================
     */

    return {
      FunctionDeclaration: startFunction,
      FunctionExpression: startFunction,
      ArrowFunctionExpression: startFunction,
      StaticBlock: startFunction,

      ReturnStatement: countReturnStatements,

      'FunctionDeclaration:exit': endFunction,
      'FunctionExpression:exit': endFunction,
      'ArrowFunctionExpression:exit': endFunction,
      'StaticBlock:exit': endFunction,
    }
  },
}

export default MAX_RETURN_STATEMENTS_PER_FUNCTION_RULE
