import { User } from "@prisma/client";
import { compareSync, genSaltSync, hashSync } from "bcrypt";
import { HandleLoginData, HandleRegistrationData } from "src/model/auth";
import { prismaClient } from "src/prisma/client";
import { digestPassword } from "src/utils/auth";
import { ServiceResult } from ".";
import { sign } from "./jwt";

export async function handleRegistration(
  data: HandleRegistrationData,
): Promise<ServiceResult<User>> {
  const { email, password } = data;

  // Check if the email is already in use
  const existingUser = await prismaClient.user.findUnique({
    where: {
      email,
    },
  });

  if (existingUser) {
    return {
      success: false,
      data: null,
      error: "Email already in use.",
    };
  }

  const digestedPassword = digestPassword(password);
  const salt = genSaltSync(10);
  const hashedPassword = hashSync(digestedPassword, salt);

  // Create the user
  const user = await prismaClient.user.create({
    data: {
      email,
      password: hashedPassword,
    },
  });

  return {
    success: true,
    data: user,
  };
}

export async function handleLogin({
  email,
  password,
}: HandleLoginData): Promise<
  ServiceResult<{
    accessToken: string;
    refreshToken: string;
    userId: string;
  }>
> {
  // Get the user
  const user = await prismaClient.user.findUnique({
    where: {
      email,
    },
  });

  // If the user does not exist, return an error
  if (!user) {
    return {
      success: false,
      data: null,
      error: "Invalid email or password.",
    };
  }

  // Check if the password is correct
  const digestedPassword = digestPassword(password);
  const isPasswordCorrect = compareSync(digestedPassword, user.password);

  if (!isPasswordCorrect) {
    return {
      success: false,
      data: null,
      error: "Invalid credentials.",
    };
  }

  const accessToken = sign({ userId: user.id, email: user.email }, "30s");
  const refreshToken = sign({ userId: user.id, email: user.email }, "30d");

  return {
    success: true,
    data: {
      accessToken,
      refreshToken,
      userId: user.id,
    },
  };
}
