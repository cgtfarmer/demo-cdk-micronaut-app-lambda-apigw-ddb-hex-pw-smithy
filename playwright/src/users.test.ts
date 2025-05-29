import { test, expect } from "@playwright/test";
import { User } from "./dto/user";
import { PlaywrightUtils } from "./playwright-utils";
import { CreateUserRequest } from './dto/create-user-request';
import { UserResponse } from './dto/user-response';

test("retrieve users", async ({ request }) => {
  const response = await request.get("/users");

  expect(response.status()).toEqual(200);

  const body = (await response.json()) as { users: User[] };

  expect(body.users.length).toBeGreaterThanOrEqual(0);
});

test("create user", async ({ request }) => {
  const requestBody: CreateUserRequest = {
    user: {
      firstName: "John",
      lastName: "Doe",
      age: 32,
      weight: 185.3,
      smoker: false
    }
  };

  const response = await request.post("/users", { data: requestBody });

  // console.log(response);

  expect(response.status()).toEqual(200);

  const responseBody = (await response.json()) as UserResponse;

  expect(responseBody.user.id?.length).toBeGreaterThan(0);
  expect(responseBody.user.firstName).toBe(requestBody.user.firstName);
  expect(responseBody.user.lastName).toBe(requestBody.user.lastName);
  expect(responseBody.user.age).toBe(requestBody.user.age);
  expect(responseBody.user.weight).toBe(requestBody.user.weight);
  expect(responseBody.user.smoker).toBe(requestBody.user.smoker);
});

test("retrieve user", async ({ request }) => {
  const createUserBody = await PlaywrightUtils.createDefaultUser(request);

  if (!createUserBody.user.id) throw new Error("User ID not present");

  const getUserResponse = await request.get(`/users/${createUserBody.user.id}`);

  // console.log(getUserResponse);

  expect(getUserResponse.status()).toEqual(200);

  const getUserBody = (await getUserResponse.json()) as UserResponse;

  expect(getUserBody.user.id).toBe(createUserBody.user.id);
});

test("update user", async ({ request }) => {
  const createUserBody = await PlaywrightUtils.createDefaultUser(request);

  const newFirstName = "Test";

  // TODO: Create PUT request
  const requestBody: CreateUserRequest = {
    user: {
      id: createUserBody.user.id,
      firstName: newFirstName,
      lastName: createUserBody.user.lastName,
      age: createUserBody.user.age,
      weight: createUserBody.user.weight,
      smoker: createUserBody.user.smoker
    }
  };

  if (!requestBody.user.id) throw new Error("User ID not present");

  const response = await request.put(`/users/${requestBody.user.id}`, {
    data: requestBody
  });

  expect(response.status()).toEqual(200);

  const responseBody = (await response.json()) as UserResponse;

  expect(responseBody.user.id).toBe(requestBody.user.id);
  expect(responseBody.user.firstName).toBe(requestBody.user.firstName);
  expect(responseBody.user.lastName).toBe(requestBody.user.lastName);
  expect(responseBody.user.age).toBe(requestBody.user.age);
  expect(responseBody.user.weight).toBe(requestBody.user.weight);
  expect(responseBody.user.smoker).toBe(requestBody.user.smoker);
});

test("destroy user", async ({ request }) => {
  const createUserBody = await PlaywrightUtils.createDefaultUser(request);

  if (!createUserBody.user.id) throw new Error("User ID not present");

  const destroyUserResponse = await request.delete(
    `/users/${createUserBody.user.id}`
  );

  // console.log(destroyUserResponse);

  expect(destroyUserResponse.status()).toEqual(200);

  const destroyUserBody = (await destroyUserResponse.json()) as {
    success: boolean;
  };

  expect(destroyUserBody.success).toBe(true);
});
