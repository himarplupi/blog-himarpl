import { promises as fs } from "fs"; // 'fs/promises' not available in node 12
import neatCsv from "neat-csv";

import { db } from "@/server/db";

async function main() {
  await clearDatabase();

  await generatePeriods();
  await generatePositions();
  await userMigration();
  await accountMigration();
  await departmentMigration();
  await postTagMigration();
}

async function generatePositions() {
  console.log("\n\nPOSITION GENERATION STARTED\n\n");
  await db.position.createMany({
    data: [
      {
        name: "ketua",
      },
      {
        name: "wakil ketua",
      },
      {
        name: "sekretaris",
      },
      {
        name: "bendahara",
      },
      {
        name: "staff",
      },
      {
        name: "administrator",
      },
    ],
  });
}

async function generatePeriods() {
  console.log("\n\nPERIOD GENERATION STARTED\n\n");
  await db.period.createMany({
    data: [
      {
        year: 2024,
        name: "ascendia",
        logo: "",
      },
      {
        year: 2025,
        name: "devoria",
        logo: "",
      },
    ],
  });
}

async function departmentMigration() {
  console.log("\n\nDEPARTMENT MIGRATION STARTED\n\n");
  // DEFINE DEPARTMENT CSV TYPE
  type DepartmentCSV = {
    id: string;
    name: string;
    acronym: string;
    image: string;
    description: string;
    type: "BE" | "DP";
    createdAt: string;
    updatedAt: string;
    programs: string; // this should mapped to programs table
  };

  const departmentContent = await fs.readFile(
    `./prisma/exports/department.csv`,
    {
      encoding: "utf8",
    },
  );
  const departments = await neatCsv<DepartmentCSV>(departmentContent);

  await db.department.createMany({
    data: departments.map((department) => ({
      id: department.id,
      name: department.name,
      acronym: department.acronym,
      image: department.image,
      type: department.type,
      periodYear: 2024,
      description: department.description,
      createdAt: new Date(department.createdAt),
      updatedAt: new Date(department.updatedAt),
    })),
  });

  // Mapping String programs
  const departmentsWithProgramsArray = departments.map((department) => {
    return {
      ...department,
      programs: JSON.parse(department.programs) as string[],
    };
  });

  // Flattening the array of programs into a single array
  const programs = departmentsWithProgramsArray
    .map((department) => {
      return department.programs.map((program) => {
        return {
          content: program,
          departmentId: department.id,
        };
      });
    })
    .flat();

  await db.programs.createMany({
    data: programs.map((program) => ({
      content: program.content,
      departmentId: program.departmentId,
    })),
  });
}

async function userMigration() {
  console.log("\n\nUSER MIGRATION STARTED\n\n");

  // DEFINE USER CSV TYPE
  type UserCSV = {
    id: string;
    name: string;
    email: string;
    emailVerified: string;
    image: string;
    username: string;
    bio: string;
    position: string;
    role: string;
    lastLoginAt: string;
    createdAt: string;
    updatedAt: string;
    departmentId: string;
    periods: string;
  };

  // READ USER CSV
  const userContent = await fs.readFile(`./prisma/exports/users.csv`, {
    encoding: "utf8",
  });

  const users = await neatCsv<UserCSV>(userContent);

  const positions = await db.position.findMany({
    select: {
      id: true,
      name: true,
    },
  });

  await db.user.createMany({
    data: users.map((user) => ({
      id: user.id,
      name: user.name,
      email: user.email,
      emailVerified:
        user.emailVerified === "null" ? null : new Date(user.emailVerified),
      image: user.image,
      username: user.username,
      bio: user.bio,
      position: user.position,
      role: user.role,
      createdAt: new Date(user.createdAt),
      positions: {
        connect: {
          id: positions.find((position) => position.name === user.position)?.id,
        },
      },
      departments: {
        connect: {
          id: user.departmentId,
        },
      },
      periods: {
        connect: {
          year: 2024,
        },
      },
    })),
  });
}

async function accountMigration() {
  console.log("\n\nACCOUNT MIGRATION STARTED\n\n");
  // DEFINE ACCOUNT CSV TYPE
  type AccountCSV = {
    id: string;
    name: string;
    type: string;
    userId: string;
    provider: string;
    providerAccountId: string;
    refresh_token: string;
    access_token: string;
    expires_at: string;
    token_type: string;
  };

  // READ ACCOUNT CSV
  const accountContent = await fs.readFile(`./prisma/exports/account.csv`, {
    encoding: "utf8",
  });

  const accounts = await neatCsv<AccountCSV>(accountContent);

  await db.account.createMany({
    data: accounts.map((account) => ({
      id: account.id,
      name: account.name,
      type: account.type,
      userId: account.userId,
      provider: account.provider,
      providerAccountId: account.providerAccountId,
      refresh_token: account.refresh_token,
      access_token: account.access_token,
      expires_at: Number(account.expires_at),
      token_type: account.token_type,
    })),
  });
}

async function postTagMigration() {
  console.log("\n\nPOST-TAG MIGRATION STARTED\n\n");
  // DEFINE POST TAG CSV TYPE
  type PostTagCSV = {
    id: string;
    title: string;
    slug: string;
    createdAt: string;
    updatedAt: string;
    parentId: string | null;
  };

  // READ POST TAG CSV
  const postTagContent = await fs.readFile(`./prisma/exports/post-tag.csv`, {
    encoding: "utf8",
  });

  const postTags = await neatCsv<PostTagCSV>(postTagContent);

  for (const element of postTags) {
    if (element.parentId === "null") {
      element.parentId = null;
    }
  }

  await db.postTag.createMany({
    data: postTags.map((postTag) => ({
      id: postTag.id,
      title: postTag.title,
      slug: postTag.slug,
      createdAt: new Date(postTag.createdAt),
      updatedAt: new Date(postTag.updatedAt),
      parentId: postTag.parentId,
    })),
  });
}

async function postMigration() {
  console.log("\n\nPOST MIGRATION STARTED\n\n");

  // DEFINE POST CSV TYPE
  type PostCSV = {
    id: string;
    title: string;
    metaTitle: string;
    slug: string;
    content: string;
    rawHtml: string;
    image: string;
    createdAt: string;
    updatedAt: string;
    publishedAt: string;
    authorId: string;
  };

  // READ POST CSV
  const postContent = await fs.readFile(`./prisma/exports/posts.csv`, {
    encoding: "utf8",
  });

  const posts = await neatCsv<PostCSV>(postContent);

  await db.post.createMany({
    data: posts.map((post) => ({
      id: post.id,
      title: post.title,
      metaTitle: post.metaTitle,
      slug: post.slug,
      content: post.content,
      rawHtml: post.rawHtml,
      image: post.image,
      createdAt: new Date(post.createdAt),
      updatedAt: new Date(post.updatedAt),
      publishedAt: new Date(post.publishedAt),
      authorId: post.authorId,
    })),
  });
}

async function clearDatabase() {
  await db.postTag.deleteMany({});
  await db.post.deleteMany({});
  await db.programs.deleteMany({});
  await db.department.deleteMany({});
  await db.period.deleteMany({});
  await db.position.deleteMany({});
  await db.socialMedia.deleteMany({});
  await db.verificationToken.deleteMany({});
  await db.session.deleteMany({});
  await db.account.deleteMany({});
  await db.user.deleteMany({});
}

main()
  .then(() => {
    console.log("done");
    void db.$disconnect();
  })
  .catch((e) => {
    console.log(e);
    void db.$disconnect();
  });
