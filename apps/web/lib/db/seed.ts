import { config } from "dotenv";
import { drizzle } from "drizzle-orm/neon-http";
import { neon } from "@neondatabase/serverless";
import * as schema from "./schema";

config({ path: ".env.local" });

const sql = neon(process.env.DATABASE_URL!);
const db = drizzle(sql, { schema });

async function seed() {
  console.log("Seeding database...🌱");

  //1. Inserting the test user
  await db.insert(schema.users).values({
    id: "user_test_001",
    email: "test@factr.app",
    createdAt: new Date(),
  });

  //2. Insert User Settings
  await db.insert(schema.userSettings).values({
    userId: "user_test_001",
    taxRate: 1300,
    savingsRate: 2000,
    businessName: "Test Contracting Co.",
    updatedAt: new Date(),
  });

  //3. Inserting a test jig
  await db.insert(schema.jigs).values({
    id: "jig_test_001",
    userId: "user_test_001",
    name: "Drywall Install",
    createdAt: new Date(),
  });

  //4. Insert Jig items
  await db.insert(schema.jigItems).values([
    {
      id: "jig_item_001",
      jigId: "jig_test_001",
      label: "Drywall Sheets",
      unit: "sheet",
      rate: 4500,
      sortOrder: 1,
    },
    {
      id: "jig_item_002",
      jigId: "jig_test_001",
      label: "Labour",
      unit: "hr",
      rate: 8500,
      sortOrder: 2,
    },
  ]);

  // 5. Insert a job (snapshotting tax and savings rate)
  await db.insert(schema.jobs).values({
    id: "job_test_001",
    userId: "user_test_001",
    jigSourceId: "jig_test_001",
    clientName: "General Contractor Ltd",
    jobName: "Unit 4B Drywall",
    date: new Date(),
    status: "draft",
    invoiceNumber: "INV-0001",
    taxRate: 1300,
    savingsRate: 2000,
    createdAt: new Date(),
  });

  // 6. Insert job items (snapshotted from jig items)
  await db.insert(schema.jobItems).values([
    {
      id: "job_item_001",
      jobId: "job_test_001",
      label: "Drywall Sheets",
      unit: "sheet",
      rate: 4500,
      quantity: 10,
      lineTotal: 45000,
      sortOrder: 1,
    },
    {
      id: "job_item_002",
      jobId: "job_test_001",
      label: "Labour",
      unit: "hr",
      rate: 8500,
      quantity: 8,
      lineTotal: 68000,
      sortOrder: 2,
    },
  ]);

  console.log("✅ Seed complete.");
}

seed().catch((err) => {
  console.error("❌ Seed failed:", err);
  process.exit(1);
});
