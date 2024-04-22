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

// get session secret
const sessionSecret = process.env.SESSION_SECRET;
if (!sessionSecret) {
  throw new Error("SESSION_SECRET must be set");
}

// create session storage
const storage = createCookieSessionStorage({
  cookie: {
    name: "remixblog",
    secure: process.env.NODE_ENV === "production",
    secrets: [sessionSecret],
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 30,
    httpOnly: true,
  },
});

// create session

export const createUserSession = async (userId: string, redirectTo: string) => {
  const session = await storage.getSession();
  session.set("userId", userId);
  return redirect(redirectTo, {
    headers: {
      setCookie: await storage.commitSession(session),
    },
  });
};
