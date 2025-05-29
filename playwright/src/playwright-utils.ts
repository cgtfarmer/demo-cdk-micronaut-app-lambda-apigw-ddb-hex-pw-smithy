import { APIRequestContext } from "playwright-core";
import { CreateUserRequest } from './dto/create-user-request';
import { UserResponse } from './dto/user-response';
import { expect } from '@playwright/test';

const createDefaultUser = async (request: APIRequestContext) => {
  console.log("[PlaywrightUtils#createDefaultUser]");

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

  expect(response.status()).toEqual(200);

  const responseBody = (await response.json()) as UserResponse;

  // console.log(responseBody);

  return responseBody;
};

export const PlaywrightUtils = { createDefaultUser };
