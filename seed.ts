import { PrismaClient } from "@prisma/client";
const db = new PrismaClient();

async function main() {
  await db.post.createMany({
    data: [
      {
        title: "First Post",
        body: "This is the content of the first post.",
      },
      {
        title: "Second Post",
        body: "This is the content of the second post.",
      },
    ],
  });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await db.$disconnect();
  });
