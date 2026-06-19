const nodeEnv = (globalThis as { process?: { env?: { NODE_ENV?: string } } }).process?.env
  ?.NODE_ENV;
const hostname = (globalThis as { location?: { hostname?: string } }).location?.hostname;
const isLocalDevHost = hostname === 'localhost' || hostname === '127.0.0.1';

/**
 * True if the environment is development or localhost.
 */
export const isDev = nodeEnv === 'development' || isLocalDevHost;
