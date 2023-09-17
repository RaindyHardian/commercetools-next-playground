import {
  ClientBuilder,

  // Import middlewares
  type PasswordAuthMiddlewareOptions, // Required for auth
  type HttpMiddlewareOptions, // Required for sending HTTP requests
} from '@commercetools/sdk-client-v2';

const projectKey = process.env.NEXT_PUBLIC_CTP_PROJECT_KEY as string;
const scopes = (process.env.NEXT_PUBLIC_CTP_SCOPES || '').split(' ');

// Configure httpMiddlewareOptions
const httpMiddlewareOptions: HttpMiddlewareOptions = {
  host: process.env.NEXT_PUBLIC_CTP_API_URL as string,
  fetch,
};

// Export the ClientBuilder
export const ctpPasswordFlowClient = ({
  username,
  password,
}: {
  username: string;
  password: string;
}) => {
  // Configure authMiddlewareOptions
  const passwordAuthMiddlewareOptions: PasswordAuthMiddlewareOptions = {
    host: process.env.NEXT_PUBLIC_CTP_AUTH_URL as string,
    projectKey: projectKey,
    credentials: {
      clientId: process.env.NEXT_PUBLIC_CTP_CLIENT_ID as string,
      clientSecret: process.env.NEXT_PUBLIC_CTP_CLIENT_SECRET as string,
      user: {
        username: username,
        password: password,
      },
    },
    scopes,
    fetch,
  };

  return new ClientBuilder()
    .withProjectKey(projectKey) // .withProjectKey() is not required if the projectKey is included in authMiddlewareOptions
    .withPasswordFlow(passwordAuthMiddlewareOptions)
    .withHttpMiddleware(httpMiddlewareOptions)
    .withLoggerMiddleware() // Include middleware for logging
    .build();
};
