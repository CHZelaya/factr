import { pgTable, text, integer, timestamp } from "drizzle-orm/pg-core";

/**
 * Users Table
 * Function responsible for creating a users table with appropriate columns.
 */
export const users = pgTable("users", {
  id: text("id").primaryKey(),
  email: text("email").notNull().unique(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

/**
 * User Settings Table
 * Function responsible for creating a userSettings table with appropriate columns.
 *
 * user_settings references the users table via the user ID.
 */
export const userSettings = pgTable("user_settings", {
  userId: text("user_id")
    .notNull()
    .references(() => users.id),
  taxRate: integer("tax_rate").notNull().default(0),
  savingsRate: integer("savings_rate").notNull().default(0),
  businessName: text("business_name"),
  address: text("address"),
  email: text("email"),
  logoUrl: text("logo_url"),
  invoicePrefix: text("invoice_prefix"),
  paymentTerms: text("payment_terms"),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

/**
 * Jigs Table
 * Function responsible for creating the Jigs table with appropriate columns.
 *
 * jigs references the users table via the user ID.
 */
export const jigs = pgTable("jigs", {
  id: text("id").primaryKey(),
  userId: text("user_id")
    .notNull()
    .references(() => users.id),
  name: text("name").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

/**
 * Jig Items Table
 * Function responsible for creating the Jig Items table with appropriate columns.
 *
 * jig_items references the jigs table via the jig ID.
 */
export const jigItems = pgTable("jig_items", {
  id: text("id").primaryKey(),
  jigId: text("jig_id")
    .notNull()
    .references(() => jigs.id),
  label: text("label").notNull(),
  description: text("description"),
  unit: text("unit").notNull(),
  rate: integer("rate").notNull(),
  sortOrder: integer("sort_order").notNull(),
  category: text("category"),
});

/**
 * Jobs
 * Function responsible for creating the Jobs Table with appropriate columns.
 *
 * jobs references the users table via the user ID.
 */

export const jobs = pgTable("jobs", {
  id: text("id").primaryKey(),
  userId: text("user_id")
    .notNull()
    .references(() => users.id),
  //Snapshot, no reference to the jig table, just a copy of the data at the time of job creation
  jigSourceId: text("jig_source_id"),
  clientName: text("client_name").notNull(),
  jobName: text("job_name").notNull(),
  date: timestamp("date").notNull(),
  // Status will be used to track what state the job is at (draft/complete)
  status: text("status").notNull(),
  invoiceNumber: text("invoice_number").notNull(),
  // taxRate and savingsRate are also snapshots of the userSettings at the time of job creation
  taxRate: integer("tax_rate").notNull(),
  savingsRate: integer("savings_rate").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

/**
 * Job Items
 * Function responsible for creating the job items table and all appropriate columns
 * These are snapshots of the jig_items table with no reference to the jig or jig_items table, just a copy of the data at the time of job creation
 *
 */
export const jobItems = pgTable("job_items", {
  id: text("id").primaryKey(),
  jobId: text("job_id")
    .notNull()
    .references(() => jobs.id),
  label: text("label").notNull(),
  description: text("description"),
  unit: text("unit").notNull(),
  rate: integer("rate").notNull(),
  quantity: integer("quantity").notNull().default(0),
  lineTotal: integer("line_total").notNull().default(0),
  sortOrder: integer("sort_order").notNull(),
});
