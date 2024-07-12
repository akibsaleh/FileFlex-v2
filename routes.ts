/**
 * An array of routes that do not requires authentication
 * @type {string[]}
 */
export const publicRoutes = ['/'];

/**
 * An array of routes that are used for authentication
 * This routes will redirect logged in users to /feeds
 * @type {string[]}
 */
export const authRoutes = [
  '/auth/login',
  '/auth/register',
  '/auth/forgot-password',
  '/auth/new-password',
];

/**
 * The prefix for API authentication routes
 * Routes that start with this prefix are used for API authentication process
 * @type {string}
 */
export const apiAuthPrefix = '/api/auth';

/**
 * The prefix for API uploadThing routes
 * Routes that start with this prefix are used for API uploadThing process
 * @type {string}
 */
export const apiUploadThingPrefix = '/api/uploadthing';

export const DEFAULT_LOGIN_REDIRECT = '/dashboard';
