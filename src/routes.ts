/* eslint-disable tsdoc/syntax */
/**
 * Public routes are routes that are accessible to everyone, including unauthenticated users.
 * @type {string[]}
 */
export const publicRoutes = ['/', '/auth/new-verification'];

/**
 * Auth routes are routes that are only accessible to authenticated users.
 * @type {string[]}
 */
export const authRoutes = [
  '/auth/login',
  '/auth/register',
  '/auth/error',
  '/auth/reset-password',
  '/auth/new-password',
  // for confirmation
  '/auth/forgot-password',
  '/auth/verify-email',
  '/auth/callback',
  '/auth/signin',
  '/auth/signout',
  '/auth/session',
  '/auth/providers',
  '/auth/csrf',
  '/auth/credentials',
  '/auth/authorize',
  '/auth/oauth',
  '/auth/refresh-token',
];

/**
 * API prefix is the prefix for all API routes.
 * Routes that start with this prefix are considered API routes.
 * @type {string}
 */
export const apiAuthPrefix = '/api/auth';

/**
 * Default login redirect is the route that users are redirected to after logging in.
 * @type {string}
 */
export const DEFAULT_LOGIN_REDIRECT = '/settings';
