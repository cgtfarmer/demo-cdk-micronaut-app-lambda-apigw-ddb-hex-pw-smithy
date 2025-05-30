import { expect } from '@playwright/test';
import { CreateUserCommand, UserDto, UserServiceClient } from '@cgtfarmer/user-service-client';

const createDefaultUser = async (): Promise<UserDto> => {
  console.log("[PlaywrightUtils#createDefaultUser]");

  const client = new UserServiceClient({ endpoint: 'https://h2dvwnlsj7.execute-api.us-east-1.amazonaws.com' });

  const request = new CreateUserCommand({
    user: {
      firstName: "John",
      lastName: "Doe",
      age: 32,
      weight: 185.3,
      smoker: false
    }
  });

  const response = await client.send(request);

  expect(response.$metadata.httpStatusCode).toEqual(201);

  // console.log(responseBody);

  if (!response.user) throw new Error("Default user failed to create");

  return response.user
};

export const PlaywrightUtils = { createDefaultUser };
