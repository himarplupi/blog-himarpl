import { promises as fs } from "fs"; // 'fs/promises' not available in node 12
import neatCsv from "neat-csv";

import { db } from "@/server/db";

async function main() {
  await clearDatabase();

  // Generating Periods for department Migration
  await generatePeriods();
  // await accountMigration();
  await departmentMigration();
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
    // console.log(JSON.parse(department.programs));
    return {
      ...department,
      programs: JSON.parse(department.programs) as string[],
    };
  });

  // Flattening the array of programs into a single array
  const programs = departmentsWithProgramsArray
    .map((department) => {
      return department.programs.map((program) => {
        // console.log(program);
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
