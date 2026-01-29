import { describe, expect, it } from 'bun:test'
import {
  HTTP_ACCEPTED,
  HTTP_ALREADY_REPORTED,
  HTTP_A_TIMEOUT_OCCURRED,
  HTTP_BAD_GATEWAY,
  HTTP_BAD_MAPPING,
  HTTP_BAD_REQUEST,
  HTTP_CONFLICT,
  HTTP_CONNECTION_TIMED_OUT,
  HTTP_CONTENT_DIFFERENT,
  HTTP_CONTINUE,
  HTTP_CREATED,
  HTTP_EARLY_HINTS,
  HTTP_EXPECTATION_FAILED,
  HTTP_FAILED_DEPENDENCY,
  HTTP_FORBIDDEN,
  HTTP_FOUND,
  HTTP_GATEWAY_TIMEOUT,
  HTTP_GONE,
  HTTP_HTTP_VERSION_NOT_SUPPORTED,
  HTTP_IM_A_TEAPOT,
  HTTP_IM_USED,
  HTTP_INSUFFICIENT_STORAGE,
  HTTP_INTERNAL_SERVER_ERROR,
  HTTP_INVALID_SSL_CERTIFICATE,
  HTTP_LARAVEL_PAGE_EXPIRED,
  HTTP_LENGTH_REQUIRED,
  HTTP_LOCKED,
  HTTP_LOOP_DETECTED,
  HTTP_METHOD_FAILURE,
  HTTP_METHOD_NOT_ALLOWED,
  HTTP_MISDIRECTED_REQUEST,
  HTTP_MOVED_PERMANENTLY,
  HTTP_MULTIPLE_CHOICES,
  HTTP_MULTI_STATUS,
  HTTP_NETWORK_AUTHENTICATION_REQUIRED,
  HTTP_NETWORK_CONNECT_TIMEOUT_ERROR,
  HTTP_NETWORK_READ_TIMEOUT_ERROR,
  HTTP_NON_AUTHORITATIVE_INFORMATION,
  HTTP_NOT_ACCEPTABLE,
  HTTP_NOT_EXTENDED,
  HTTP_NOT_FOUND,
  HTTP_NOT_IMPLEMENTED,
  HTTP_NOT_MODIFIED,
  HTTP_NO_CONTENT,
  HTTP_OK,
  HTTP_ORIGIN_IS_UNREACHABLE,
  HTTP_PARTIAL_CONTENT,
  HTTP_PAYLOAD_TOO_LARGE,
  HTTP_PAYMENT_REQUIRED,
  HTTP_PERMANENT_REDIRECT,
  HTTP_PRECONDITION_FAILED,
  HTTP_PRECONDITION_REQUIRED,
  HTTP_PROCESSING,
  HTTP_PROXY_AUTHENTICATION_REQUIRED,
  HTTP_RAILGUN_ERROR,
  HTTP_RANGE_NOT_SATISFIABLE,
  HTTP_REQUEST_HEADER_FIELDS_TOO_LARGE,
  HTTP_REQUEST_TIMEOUT,
  HTTP_RESERVED_306,
  HTTP_RESET_CONTENT,
  HTTP_SEE_OTHER,
  HTTP_SERVICE_UNAVAILABLE,
  HTTP_SITE_IS_FROZEN,
  HTTP_SITE_IS_OVERLOADED,
  HTTP_SPRING_METHOD_FAILURE,
  HTTP_SSL_HANDSHAKE_FAILED,
  HTTP_SWITCHING_PROTOCOLS,
  HTTP_TEMPORARY_REDIRECT,
  HTTP_TOO_EARLY,
  HTTP_TOO_MANY_REDIRECTS,
  HTTP_TOO_MANY_REQUESTS,
  HTTP_TWITTER_ENHANCE_YOUR_CALM,
  HTTP_UNAUTHORIZED,
  HTTP_UNAVAILABLE_FOR_LEGAL_REASONS,
  HTTP_UNKNOWN_ERROR,
  HTTP_UNPROCESSABLE_ENTITY,
  HTTP_UNSUPPORTED_MEDIA_TYPE,
  HTTP_UPGRADE_REQUIRED,
  HTTP_URI_TOO_LONG,
  HTTP_USE_PROXY,
  HTTP_VARIANT_ALSO_NEGOTIATES,
  HTTP_WEB_SERVER_IS_DOWN,
} from '../../ts/http/http.util.js'

describe(
  'HTTP Status Code Constants',
  () => {
    const status1xxTestCases = [
      { name: 'HTTP_CONTINUE', constant: HTTP_CONTINUE, expected: 100 },
      { name: 'HTTP_SWITCHING_PROTOCOLS', constant: HTTP_SWITCHING_PROTOCOLS, expected: 101 },
      { name: 'HTTP_PROCESSING', constant: HTTP_PROCESSING, expected: 102 },
      { name: 'HTTP_EARLY_HINTS', constant: HTTP_EARLY_HINTS, expected: 103 },
    ]

    it.each(status1xxTestCases)(
      'should have correct 1xx status codes - $name',
      ({ constant, expected }) => {
        expect(constant).toBe(expected)
      }
    )

    const status2xxTestCases = [
      { name: 'HTTP_OK', constant: HTTP_OK, expected: 200 },
      { name: 'HTTP_CREATED', constant: HTTP_CREATED, expected: 201 },
      { name: 'HTTP_ACCEPTED', constant: HTTP_ACCEPTED, expected: 202 },
      { name: 'HTTP_NON_AUTHORITATIVE_INFORMATION', constant: HTTP_NON_AUTHORITATIVE_INFORMATION, expected: 203 },
      { name: 'HTTP_NO_CONTENT', constant: HTTP_NO_CONTENT, expected: 204 },
      { name: 'HTTP_RESET_CONTENT', constant: HTTP_RESET_CONTENT, expected: 205 },
      { name: 'HTTP_PARTIAL_CONTENT', constant: HTTP_PARTIAL_CONTENT, expected: 206 },
      { name: 'HTTP_MULTI_STATUS', constant: HTTP_MULTI_STATUS, expected: 207 },
      { name: 'HTTP_ALREADY_REPORTED', constant: HTTP_ALREADY_REPORTED, expected: 208 },
      { name: 'HTTP_CONTENT_DIFFERENT', constant: HTTP_CONTENT_DIFFERENT, expected: 210 },
      { name: 'HTTP_IM_USED', constant: HTTP_IM_USED, expected: 226 },
    ]

    it.each(status2xxTestCases)(
      'should have correct 2xx status codes - $name',
      ({ constant, expected }) => {
        expect(constant).toBe(expected)
      }
    )

    const status3xxTestCases = [
      { name: 'HTTP_MULTIPLE_CHOICES', constant: HTTP_MULTIPLE_CHOICES, expected: 300 },
      { name: 'HTTP_MOVED_PERMANENTLY', constant: HTTP_MOVED_PERMANENTLY, expected: 301 },
      { name: 'HTTP_FOUND', constant: HTTP_FOUND, expected: 302 },
      { name: 'HTTP_SEE_OTHER', constant: HTTP_SEE_OTHER, expected: 303 },
      { name: 'HTTP_NOT_MODIFIED', constant: HTTP_NOT_MODIFIED, expected: 304 },
      { name: 'HTTP_USE_PROXY', constant: HTTP_USE_PROXY, expected: 305 },
      { name: 'HTTP_RESERVED_306', constant: HTTP_RESERVED_306, expected: 306 },
      { name: 'HTTP_TEMPORARY_REDIRECT', constant: HTTP_TEMPORARY_REDIRECT, expected: 307 },
      { name: 'HTTP_PERMANENT_REDIRECT', constant: HTTP_PERMANENT_REDIRECT, expected: 308 },
      { name: 'HTTP_TOO_MANY_REDIRECTS', constant: HTTP_TOO_MANY_REDIRECTS, expected: 310 },
    ]

    it.each(status3xxTestCases)(
      'should have correct 3xx status codes - $name',
      ({ constant, expected }) => {
        expect(constant).toBe(expected)
      }
    )

    const status4xxTestCases = [
      { name: 'HTTP_BAD_REQUEST', constant: HTTP_BAD_REQUEST, expected: 400 },
      { name: 'HTTP_UNAUTHORIZED', constant: HTTP_UNAUTHORIZED, expected: 401 },
      { name: 'HTTP_PAYMENT_REQUIRED', constant: HTTP_PAYMENT_REQUIRED, expected: 402 },
      { name: 'HTTP_FORBIDDEN', constant: HTTP_FORBIDDEN, expected: 403 },
      { name: 'HTTP_NOT_FOUND', constant: HTTP_NOT_FOUND, expected: 404 },
      { name: 'HTTP_METHOD_NOT_ALLOWED', constant: HTTP_METHOD_NOT_ALLOWED, expected: 405 },
      { name: 'HTTP_NOT_ACCEPTABLE', constant: HTTP_NOT_ACCEPTABLE, expected: 406 },
      { name: 'HTTP_PROXY_AUTHENTICATION_REQUIRED', constant: HTTP_PROXY_AUTHENTICATION_REQUIRED, expected: 407 },
      { name: 'HTTP_REQUEST_TIMEOUT', constant: HTTP_REQUEST_TIMEOUT, expected: 408 },
      { name: 'HTTP_CONFLICT', constant: HTTP_CONFLICT, expected: 409 },
      { name: 'HTTP_GONE', constant: HTTP_GONE, expected: 410 },
      { name: 'HTTP_LENGTH_REQUIRED', constant: HTTP_LENGTH_REQUIRED, expected: 411 },
      { name: 'HTTP_PRECONDITION_FAILED', constant: HTTP_PRECONDITION_FAILED, expected: 412 },
      { name: 'HTTP_PAYLOAD_TOO_LARGE', constant: HTTP_PAYLOAD_TOO_LARGE, expected: 413 },
      { name: 'HTTP_URI_TOO_LONG', constant: HTTP_URI_TOO_LONG, expected: 414 },
      { name: 'HTTP_UNSUPPORTED_MEDIA_TYPE', constant: HTTP_UNSUPPORTED_MEDIA_TYPE, expected: 415 },
      { name: 'HTTP_RANGE_NOT_SATISFIABLE', constant: HTTP_RANGE_NOT_SATISFIABLE, expected: 416 },
      { name: 'HTTP_EXPECTATION_FAILED', constant: HTTP_EXPECTATION_FAILED, expected: 417 },
      { name: 'HTTP_IM_A_TEAPOT', constant: HTTP_IM_A_TEAPOT, expected: 418 },
      { name: 'HTTP_LARAVEL_PAGE_EXPIRED', constant: HTTP_LARAVEL_PAGE_EXPIRED, expected: 419 },
      { name: 'HTTP_TWITTER_ENHANCE_YOUR_CALM', constant: HTTP_TWITTER_ENHANCE_YOUR_CALM, expected: 420 },
      { name: 'HTTP_SPRING_METHOD_FAILURE', constant: HTTP_SPRING_METHOD_FAILURE, expected: 420 },
      { name: 'HTTP_BAD_MAPPING', constant: HTTP_BAD_MAPPING, expected: 421 },
      { name: 'HTTP_MISDIRECTED_REQUEST', constant: HTTP_MISDIRECTED_REQUEST, expected: 421 },
      { name: 'HTTP_UNPROCESSABLE_ENTITY', constant: HTTP_UNPROCESSABLE_ENTITY, expected: 422 },
      { name: 'HTTP_LOCKED', constant: HTTP_LOCKED, expected: 423 },
      { name: 'HTTP_FAILED_DEPENDENCY', constant: HTTP_FAILED_DEPENDENCY, expected: 424 },
      { name: 'HTTP_METHOD_FAILURE', constant: HTTP_METHOD_FAILURE, expected: 424 },
      { name: 'HTTP_TOO_EARLY', constant: HTTP_TOO_EARLY, expected: 425 },
      { name: 'HTTP_UPGRADE_REQUIRED', constant: HTTP_UPGRADE_REQUIRED, expected: 426 },
      { name: 'HTTP_PRECONDITION_REQUIRED', constant: HTTP_PRECONDITION_REQUIRED, expected: 428 },
      { name: 'HTTP_TOO_MANY_REQUESTS', constant: HTTP_TOO_MANY_REQUESTS, expected: 429 },
      { name: 'HTTP_REQUEST_HEADER_FIELDS_TOO_LARGE', constant: HTTP_REQUEST_HEADER_FIELDS_TOO_LARGE, expected: 431 },
      { name: 'HTTP_UNAVAILABLE_FOR_LEGAL_REASONS', constant: HTTP_UNAVAILABLE_FOR_LEGAL_REASONS, expected: 451 },
    ]

    it.each(status4xxTestCases)(
      'should have correct 4xx status codes - $name',
      ({ constant, expected }) => {
        expect(constant).toBe(expected)
      }
    )

    const status5xxTestCases = [
      { name: 'HTTP_INTERNAL_SERVER_ERROR', constant: HTTP_INTERNAL_SERVER_ERROR, expected: 500 },
      { name: 'HTTP_NOT_IMPLEMENTED', constant: HTTP_NOT_IMPLEMENTED, expected: 501 },
      { name: 'HTTP_BAD_GATEWAY', constant: HTTP_BAD_GATEWAY, expected: 502 },
      { name: 'HTTP_SERVICE_UNAVAILABLE', constant: HTTP_SERVICE_UNAVAILABLE, expected: 503 },
      { name: 'HTTP_GATEWAY_TIMEOUT', constant: HTTP_GATEWAY_TIMEOUT, expected: 504 },
      { name: 'HTTP_HTTP_VERSION_NOT_SUPPORTED', constant: HTTP_HTTP_VERSION_NOT_SUPPORTED, expected: 505 },
      { name: 'HTTP_VARIANT_ALSO_NEGOTIATES', constant: HTTP_VARIANT_ALSO_NEGOTIATES, expected: 506 },
      { name: 'HTTP_INSUFFICIENT_STORAGE', constant: HTTP_INSUFFICIENT_STORAGE, expected: 507 },
      { name: 'HTTP_LOOP_DETECTED', constant: HTTP_LOOP_DETECTED, expected: 508 },
      { name: 'HTTP_NOT_EXTENDED', constant: HTTP_NOT_EXTENDED, expected: 510 },
      { name: 'HTTP_NETWORK_AUTHENTICATION_REQUIRED', constant: HTTP_NETWORK_AUTHENTICATION_REQUIRED, expected: 511 },
    ]

    it.each(status5xxTestCases)(
      'should have correct 5xx status codes - $name',
      ({ constant, expected }) => {
        expect(constant).toBe(expected)
      }
    )

    const cloudflareTestCases = [
      { name: 'HTTP_UNKNOWN_ERROR', constant: HTTP_UNKNOWN_ERROR, expected: 520 },
      { name: 'HTTP_WEB_SERVER_IS_DOWN', constant: HTTP_WEB_SERVER_IS_DOWN, expected: 521 },
      { name: 'HTTP_CONNECTION_TIMED_OUT', constant: HTTP_CONNECTION_TIMED_OUT, expected: 522 },
      { name: 'HTTP_ORIGIN_IS_UNREACHABLE', constant: HTTP_ORIGIN_IS_UNREACHABLE, expected: 523 },
      { name: 'HTTP_A_TIMEOUT_OCCURRED', constant: HTTP_A_TIMEOUT_OCCURRED, expected: 524 },
      { name: 'HTTP_SSL_HANDSHAKE_FAILED', constant: HTTP_SSL_HANDSHAKE_FAILED, expected: 525 },
      { name: 'HTTP_INVALID_SSL_CERTIFICATE', constant: HTTP_INVALID_SSL_CERTIFICATE, expected: 526 },
      { name: 'HTTP_RAILGUN_ERROR', constant: HTTP_RAILGUN_ERROR, expected: 527 },
      { name: 'HTTP_SITE_IS_OVERLOADED', constant: HTTP_SITE_IS_OVERLOADED, expected: 529 },
      { name: 'HTTP_SITE_IS_FROZEN', constant: HTTP_SITE_IS_FROZEN, expected: 530 },
      { name: 'HTTP_NETWORK_READ_TIMEOUT_ERROR', constant: HTTP_NETWORK_READ_TIMEOUT_ERROR, expected: 598 },
      { name: 'HTTP_NETWORK_CONNECT_TIMEOUT_ERROR', constant: HTTP_NETWORK_CONNECT_TIMEOUT_ERROR, expected: 599 },
    ]

    it.each(cloudflareTestCases)(
      'should have correct Cloudflare/Arbitrary status codes - $name',
      ({ constant, expected }) => {
        expect(constant).toBe(expected)
      }
    )

    const typeTestCases = [
      { name: 'HTTP_OK', constant: HTTP_OK },
      { name: 'HTTP_NOT_FOUND', constant: HTTP_NOT_FOUND },
      { name: 'HTTP_INTERNAL_SERVER_ERROR', constant: HTTP_INTERNAL_SERVER_ERROR },
    ]

    it.each(typeTestCases)(
      'should be numbers - $name',
      ({ constant }) => {
        expect(typeof constant).toBe('number')
      }
    )

    it.each(typeTestCases)(
      'should be integers - $name',
      ({ constant }) => {
        expect(Number.isInteger(constant)).toBe(true)
      }
    )
  }
)
