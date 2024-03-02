"use server";

import { Clerk } from "@clerk/clerk-sdk-node";

const clerk = Clerk({ secretKey: process.env.CLERK_SECRET_KEY });

const getUsers = async () => {
  await clerk.users
    .getUserList()
    .then((data) => data.map((user) => console.log(user.username)));
};

const isUsernameAvailable = async (username) => {
  if (!username) return false;

  try {
    const data = await clerk.users.getUserList({ limit: 499 });
    const exists = data.find((user) => user.username === username);

    return !exists;
  } catch (error) {
    console.log(error);
    return false;
  }
};

export { getUsers, isUsernameAvailable };
