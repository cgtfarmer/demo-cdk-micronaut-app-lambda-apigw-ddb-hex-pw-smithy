import { test, expect } from "@playwright/test";
import { PlaywrightUtils } from "./playwright-utils";
import { CreateUserCommand, DestroyUserCommand, GetUserCommand, ListUsersCommand, PutUserCommand, UserServiceClient } from '@cgtfarmer/user-service-client';

const client = new UserServiceClient({
  endpoint: 'https://h2dvwnlsj7.execute-api.us-east-1.amazonaws.com'
});

test("retrieve users", async () => {
  await PlaywrightUtils.createDefaultUser();

  const response = await client.send(
    new ListUsersCommand()
  );

  expect(response.$metadata.httpStatusCode).toEqual(200);

  expect(response.users?.length).toBeGreaterThan(0);
});

test("create user", async () => {
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

  expect(response.user?.userId?.length).toBeGreaterThan(0);
  expect(response.user?.firstName).toBe(request.input.user?.firstName);
  expect(response.user?.lastName).toBe(request.input.user?.lastName);
  expect(response.user?.age).toBe(request.input.user?.age);
  expect(response.user?.weight).toBe(request.input.user?.weight);
  expect(response.user?.smoker).toBe(request.input.user?.smoker);
});

test("retrieve user", async () => {
  const createdUser = await PlaywrightUtils.createDefaultUser();

  const response = await client.send(
    new GetUserCommand({ userId: createdUser.userId })
  );

  // console.log(getUserResponse);

  expect(response.$metadata.httpStatusCode).toEqual(200);

  expect(response.user?.userId).toBe(createdUser.userId);
});

test("update user", async () => {
  const createdUser = await PlaywrightUtils.createDefaultUser();

  const newFirstName = "Test";

  const request = new PutUserCommand({
    userId: createdUser.userId,
    user: {
      firstName: newFirstName,
      lastName: "Doe",
      age: 32,
      weight: 185.3,
      smoker: false
    }
  });

  const response = await client.send(request);

  expect(response.$metadata.httpStatusCode).toEqual(200);

  expect(response.user?.userId).toBe(request.input.userId);
  expect(response.user?.firstName).toBe(request.input.user?.firstName);
  expect(response.user?.lastName).toBe(request.input.user?.lastName);
  expect(response.user?.age).toBe(request.input.user?.age);
  expect(response.user?.weight).toBe(request.input.user?.weight);
  expect(response.user?.smoker).toBe(request.input.user?.smoker);
});

test("destroy user", async () => {
  const createdUser = await PlaywrightUtils.createDefaultUser();

  const response = await client.send(
    new DestroyUserCommand({ userId: createdUser.userId })
  );

  // console.log(destroyUserResponse);

  expect(response.$metadata.httpStatusCode).toEqual(200);

  expect(response.success).toBe(true);
});
