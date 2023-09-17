import {
  ClientBuilder,

  // Import middlewares
  type ExistingTokenMiddlewareOptions, // Required for auth
  type HttpMiddlewareOptions, // Required for sending HTTP requests
} from '@commercetools/sdk-client-v2';

const projectKey = process.env.NEXT_PUBLIC_CTP_PROJECT_KEY as string;

// Configure ExistingTokenMiddlewareOptions
const existingTokenMiddlewareOptions: ExistingTokenMiddlewareOptions = {
  force: true,
};

// Configure httpMiddlewareOptions
const httpMiddlewareOptions: HttpMiddlewareOptions = {
  host: process.env.NEXT_PUBLIC_CTP_API_URL as string,
  fetch,
};

// Export the ClientBuilder
export const ctpExistingTokenFlowClient = ({
  accessToken,
}: {
  accessToken: string;
}) =>
  new ClientBuilder()
    .withProjectKey(projectKey) // .withProjectKey() is not required if the projectKey is included in authMiddlewareOptions
    .withExistingTokenFlow(accessToken, existingTokenMiddlewareOptions)
    .withHttpMiddleware(httpMiddlewareOptions)
    .withLoggerMiddleware() // Include middleware for logging
    .build();
