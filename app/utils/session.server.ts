import bcrypt from "bcrypt";
import { db } from "./db.server";
import { createCookieSessionStorage, redirect } from "@remix-run/node";

// login user

export const login = async ({ username, password }: any) => {
  const findUser = await db.user.findUnique({
    where: {
      username,
    },
  });
  if (!findUser) throw new Error("user not found");
  const match = await bcrypt.compare(password, findUser.passwordHash);
  if (!match) throw new Error("password is not correct");
  return findUser;
};

export const register = async ({ username, password }: any) => {
  const user = await db.user.create({
    data: {
      username,
      passwordHash: await bcrypt.hash(password, 10),
    },
  });
  return user;
};
