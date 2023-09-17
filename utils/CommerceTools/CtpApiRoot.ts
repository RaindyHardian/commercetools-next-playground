import { ctpClient } from './BuildClient';
import { createApiBuilderFromCtpClient } from '@commercetools/platform-sdk';
import { ctpAnonymousClient } from './BuildAnonymousSessionFlowClient';
import { ctpPasswordFlowClient } from './BuildPasswordFlowClient';

// Create apiRoot from the imported ClientBuilder and include your Project key
export const CtpApiRoot = createApiBuilderFromCtpClient(
  ctpClient
).withProjectKey({
  projectKey: process.env.NEXT_PUBLIC_CTP_PROJECT_KEY as string,
});

export const CtpAnonymousApiRoot = createApiBuilderFromCtpClient(
  ctpAnonymousClient
).withProjectKey({
  projectKey: process.env.NEXT_PUBLIC_CTP_PROJECT_KEY as string,
});

export const CtpPasswordFlowApiRoot = ({
  username,
  password,
}: {
  username: string;
  password: string;
}) => {
  return createApiBuilderFromCtpClient(
    ctpPasswordFlowClient({ username, password })
  ).withProjectKey({
    projectKey: process.env.NEXT_PUBLIC_CTP_PROJECT_KEY as string,
  });
};

// Example call to return Project information
// This code has the same effect as sending a GET request to the commercetools Composable Commerce API without any endpoints.
