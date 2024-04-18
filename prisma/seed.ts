import { PrismaClient } from "@prisma/client";

const db = new PrismaClient();

async function seed() {
  const user = await db.user.create({
    data: {
      username: "hashmi",
      passwordHash:
        "$2b$10$K7L1OJ45/4Y2nIvhRVpCe.FSmhDdWoXehVzJptJ/op0lSsvqNu/1u",
    },
  });

  await Promise.all(
    getPosts().map((post) => {
      const data = { ...post, userId: user.id };
      return db.post.create({ data });
    })
  );
}

seed();

function getPosts() {
  return [
    { title: "road worker", body: "a tough guy" },
    { title: "frisbee", body: "a frisbee" },
  ];
}
