import { promises as fs } from "fs"; // 'fs/promises' not available in node 12
import neatCsv from "neat-csv";

import { db } from "@/server/db";

async function main() {
  await clearDatabase();

  await generatePeriods();
  await generatePositions();
  await departmentMigration();
  await postTagMigration();
  await userMigration();
  await accountMigration();
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

  await db.program.createMany({
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
      name: validateNull(user.name),
      email: validateNull(user.email),
      emailVerified:
        user.emailVerified === "null" ? null : new Date(user.emailVerified),
      image: validateNull(user.image),
      username: validateNull(user.username),
      bio: validateNull(user.bio),
      role: user.role,
      createdAt: new Date(user.createdAt),
    })),
  });

  console.log("\n\nSETTING USER RELATIONS\n\n");

  for (const user of users) {
    console.log(user);
    await db.user.update({
      where: {
        id: user.id,
      },
      data: {
        positions: {
          set: [
            {
              id: positions.find((position) => position.name === user.position)
                ?.id,
            },
          ],
        },
        departments: validateNull(user.departmentId)
          ? {
              set: [
                {
                  id: user.departmentId,
                },
              ],
            }
          : undefined,
        periods: {
          set: [
            {
              year: 2024,
            },
          ],
        },
      },
    });
  }
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
      refresh_token: validateNull(account.refresh_token),
      access_token: validateNull(account.access_token),
      expires_at: Number(account.expires_at),
      token_type: validateNull(account.token_type),
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
    parentId: string;
  };

  // READ POST TAG CSV
  const postTagContent = await fs.readFile(`./prisma/exports/post-tag.csv`, {
    encoding: "utf8",
  });

  const postTags = await neatCsv<PostTagCSV>(postTagContent);

  await db.postTag.createMany({
    data: postTags.map((postTag) => ({
      id: postTag.id,
      title: postTag.title,
      slug: postTag.slug,
      createdAt: new Date(postTag.createdAt),
      updatedAt: new Date(postTag.updatedAt),
      parentId: validateNull(postTag.parentId),
    })),
  });
}

async function clearDatabase() {
  await db.postTag.deleteMany({});
  await db.post.deleteMany({});
  await db.program.deleteMany({});
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

function validateNull(value: string) {
  if (value === "null") {
    return null;
  }
  return value;
}
