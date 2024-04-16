/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { faker } from "@faker-js/faker";
import { PrismaClient } from "@prisma/client";

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

  const data = [
    {
      title: "Berita",
      slug: "berita",
    },
    {
      title: "Penelitian",
      slug: "penelitian",
    },
    {
      title: "Pengembangan Diri",
      slug: "pengembangan-diri",
    },
    {
      title: "Aktivitas",
      slug: "aktivitas",
    },
    {
      title: "Perkualiahan",
      slug: "perkualiahan",
    },
    {
      title: "Teknologi",
      slug: "teknologi",
    },
    {
      title: "Perangkat Lunak",
      slug: "perangkat-lunak",
    },
    {
      title: "Sosial",
      slug: "sosial",
    },
    {
      title: "Budaya",
      slug: "budaya",
    },
    {
      title: "Media",
      slug: "media",
    },
    ...[...Array(25)].map(() => ({
      title: faker.lorem.sentence(),
      slug: faker.lorem.slug(),
    })),
  ];

  console.log(data);

  // const postTags = await prisma.postTag.createMany({
  //   data: data,
  // });

  const postTags = await prisma.postTag.create({
    data: {
      title: "Berita",
      slug: "berita",
    },
  });

  console.log(postTags);
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
