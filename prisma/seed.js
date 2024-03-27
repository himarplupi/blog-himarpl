/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { PrismaClient } from "@prisma/client";
import { faker } from "@faker-js/faker";
const prisma = new PrismaClient();

async function main() {
  // const posts = await prisma.post.createMany({
  //   data: [...Array(50)].map(() => ({
  //     authorId: "clu89j9sq0000s8madq1o1cbc",
  //     title: faker.lorem.sentence(),
  //     slug: faker.lorem.slug(),
  //     metaTitle: faker.lorem.sentence(),
  //     content: faker.lorem.paragraph(),
  //     publishedAt: faker.date.between({ from: "2024-03-1", to: "2024-03-27" }),
  //   })),
  // });

  const users = await prisma.user.createMany({
    data: [...Array(25)].map(() => ({
      name: faker.person.fullName(),
      email: faker.internet.email(),
      image: faker.image.avatar(),
      role: faker.helpers.arrayElement(["member", "admin"]),
    })),
  });

  console.log({ users });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
