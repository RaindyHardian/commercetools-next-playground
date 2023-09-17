import {
  ClientBuilder,
  TokenCacheOptions,
  TokenStore,

  // Import middlewares
  type AnonymousAuthMiddlewareOptions, // Required for auth
  type HttpMiddlewareOptions, // Required for sending HTTP requests
} from '@commercetools/sdk-client-v2';

const projectKey = process.env.NEXT_PUBLIC_CTP_PROJECT_KEY as string;
const scopes = (process.env.NEXT_PUBLIC_CTP_SCOPES || '').split(' ');

// Configure authMiddlewareOptions
const authMiddlewareOptions: AnonymousAuthMiddlewareOptions = {
  host: process.env.NEXT_PUBLIC_CTP_AUTH_URL as string,
  projectKey: projectKey,
  credentials: {
    clientId: process.env.NEXT_PUBLIC_CTP_CLIENT_ID as string,
    clientSecret: process.env.NEXT_PUBLIC_CTP_CLIENT_SECRET as string,
  },
  scopes,
  fetch,
  // tokenCache: {
  //   get: () => {
  //     const tokenCache = localStorage.getItem('anonymousTokenCache');

  //     if (tokenCache) {
  //       return JSON.parse(tokenCache);
  //     }

  //     return {
  //       token: '',
  //       expirationTime: 0,
  //     };
  //   },
  //   set: (cache: TokenStore, tokenCacheOptions?: TokenCacheOptions) => {
  //     localStorage.setItem('anonymousTokenCache', JSON.stringify(cache));
  //   },
  // },
};

// Configure httpMiddlewareOptions
const httpMiddlewareOptions: HttpMiddlewareOptions = {
  host: process.env.NEXT_PUBLIC_CTP_API_URL as string,
  fetch,
};

// Export the ClientBuilder
export const ctpAnonymousClient = new ClientBuilder()
  .withProjectKey(projectKey) // .withProjectKey() is not required if the projectKey is included in authMiddlewareOptions
  .withAnonymousSessionFlow(authMiddlewareOptions)
  .withHttpMiddleware(httpMiddlewareOptions)
  .withLoggerMiddleware() // Include middleware for logging
  .build();
