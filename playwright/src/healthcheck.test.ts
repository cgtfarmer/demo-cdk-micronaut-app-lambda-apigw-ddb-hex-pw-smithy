import { GetHealthCommand, UserServiceClient } from '@cgtfarmer/user-service-client';
import { test, expect } from "@playwright/test";

test("healthcheck", async () => {
  const client = new UserServiceClient({ endpoint: 'https://h2dvwnlsj7.execute-api.us-east-1.amazonaws.com' });

  const response = await client.send(new GetHealthCommand());

  // const response = await request.get("/health");

  // expect(response.status()).toEqual(200);
  expect(response.$metadata.httpStatusCode).toEqual(200);

  // const body = await response.json() as { message: string };
  // const message = response.message;

  expect(response.message).toBe("Healthy");
});
