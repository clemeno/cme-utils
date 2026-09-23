import { describe, expect, it } from 'bun:test'
import {
  MSAL_GRAPH_ENDPOINT,
  MSAL_GRAPH_ENDPOINT_VERSION,
  MSAL_GRAPH_ENDPOINT_URL,
  MSAL_GRAPH_PROFILE_URL,
  MSAL_GRAPH_GROUP_LIST_URL,
} from '../../ts/microsoft/microsoft.util.js'

describe(
  'microsoft constants',
  () => {
    it.each<{ name: string, input: string, expected: string }>([
      { name: 'MSAL_GRAPH_ENDPOINT is the Graph base URL', input: MSAL_GRAPH_ENDPOINT, expected: 'https://graph.microsoft.com' },
      { name: 'MSAL_GRAPH_ENDPOINT_VERSION is v1.0', input: MSAL_GRAPH_ENDPOINT_VERSION, expected: 'v1.0' },
      { name: 'MSAL_GRAPH_ENDPOINT_URL combines endpoint and version', input: MSAL_GRAPH_ENDPOINT_URL, expected: `${MSAL_GRAPH_ENDPOINT}/${MSAL_GRAPH_ENDPOINT_VERSION}` },
      { name: 'MSAL_GRAPH_ENDPOINT_URL is the exact versioned Graph URL', input: MSAL_GRAPH_ENDPOINT_URL, expected: 'https://graph.microsoft.com/v1.0' },
      { name: 'MSAL_GRAPH_PROFILE_URL ends with /me', input: MSAL_GRAPH_PROFILE_URL, expected: `${MSAL_GRAPH_ENDPOINT_URL}/me` },
      { name: 'MSAL_GRAPH_PROFILE_URL is the exact profile URL', input: MSAL_GRAPH_PROFILE_URL, expected: 'https://graph.microsoft.com/v1.0/me' },
      { name: 'MSAL_GRAPH_GROUP_LIST_URL ends with /transitiveMemberOf', input: MSAL_GRAPH_GROUP_LIST_URL, expected: `${MSAL_GRAPH_PROFILE_URL}/transitiveMemberOf` },
      { name: 'MSAL_GRAPH_GROUP_LIST_URL is the exact group list URL', input: MSAL_GRAPH_GROUP_LIST_URL, expected: 'https://graph.microsoft.com/v1.0/me/transitiveMemberOf' },
    ])(
      '$name',
      ({ input, expected }) => {
        expect(input).toBe(expected)
      }
    )
  }
)
