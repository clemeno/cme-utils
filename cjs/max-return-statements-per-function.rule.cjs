/**
 * @fileoverview A rule to set the maximum number of return statements in a function.
 * Based on tomyam2020's work
 * @see https://github.com/tomyam2020/eslint-plugin-max-return-statements-per-function
 */

/** @type {number} */
const DEFAULT_MAX_COUNT = 1

const { getFunctionNameWithKind } = require('eslint-utils')

/**
 * Converts the first letter of a string to uppercase.
 * @param {string} string The string to operate on
 * @returns {string} The converted string
 */
function upperCaseFirst (string) {
  return (string.length <= 1) ? string.toUpperCase() : string[0].toUpperCase() + string.slice(1)
}

/** @type {import('eslint').Rule.RuleModule} */
module.exports = {
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

  create (context) {
    /**
     * =====================================================================
     * Helpers
     * =====================================================================
     */

    /** @type {number[]} */
    const functionStack = []

    /** @type {number} */
    const maxReturnStatements = context.options[0] ?? DEFAULT_MAX_COUNT

    /**
     * Reports a node if it has too many statements
     * @param {import('eslint').Rule.Node} node node to evaluate
     * @param {any} count Number of statements in node
     * @param {any} max Maximum number of statements allowed
     * @returns {void}
     * @private
     */
    // eslint-disable-next-line max-params
    function reportIfTooManyStatements (node, count, max) {
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
    function startFunction () {
      functionStack.push(0)
    }

    /**
     * Evaluate the node at the end of function
     * @param {import('eslint').Rule.Node} node node to evaluate
     * @returns {void}
     * @private
     */
    function endFunction (node) {
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
    function countReturnStatements (node) {
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
