import { GetHealthCommand, UserServiceClient } from '@cgtfarmer/user-service-client';
import { test, expect } from "@playwright/test";

const client = new UserServiceClient({
  endpoint: 'https://h2dvwnlsj7.execute-api.us-east-1.amazonaws.com'
});

test("healthcheck", async () => {
  const response = await client.send(new GetHealthCommand());

  expect(response.$metadata.httpStatusCode).toEqual(200);

  expect(response.message).toBe("Healthy");
});
