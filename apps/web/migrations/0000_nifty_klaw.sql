CREATE TABLE "jig_items" (
	"id" text PRIMARY KEY NOT NULL,
	"jig_id" text NOT NULL,
	"label" text NOT NULL,
	"description" text,
	"unit" text NOT NULL,
	"rate" integer NOT NULL,
	"sort_order" integer NOT NULL,
	"category" text
);
--> statement-breakpoint
CREATE TABLE "jigs" (
	"id" text PRIMARY KEY NOT NULL,
	"user_id" text NOT NULL,
	"name" text NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "job_items" (
	"id" text PRIMARY KEY NOT NULL,
	"job_id" text NOT NULL,
	"label" text NOT NULL,
	"description" text,
	"unit" text NOT NULL,
	"rate" integer NOT NULL,
	"quantity" integer DEFAULT 0 NOT NULL,
	"line_total" integer DEFAULT 0 NOT NULL,
	"sort_order" integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE "jobs" (
	"id" text PRIMARY KEY NOT NULL,
	"user_id" text NOT NULL,
	"jig_source_id" text,
	"client_name" text NOT NULL,
	"job_name" text NOT NULL,
	"date" timestamp NOT NULL,
	"status" text NOT NULL,
	"invoice_number" text NOT NULL,
	"tax_rate" integer NOT NULL,
	"savings_rate" integer NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "user_settings" (
	"user_id" text NOT NULL,
	"tax_rate" integer DEFAULT 0 NOT NULL,
	"savings_rate" integer DEFAULT 0 NOT NULL,
	"business_name" text,
	"address" text,
	"email" text,
	"logo_url" text,
	"invoice_prefix" text,
	"payment_terms" text,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "users" (
	"id" text PRIMARY KEY NOT NULL,
	"email" text NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "users_email_unique" UNIQUE("email")
);
--> statement-breakpoint
ALTER TABLE "jig_items" ADD CONSTRAINT "jig_items_jig_id_jigs_id_fk" FOREIGN KEY ("jig_id") REFERENCES "public"."jigs"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "jigs" ADD CONSTRAINT "jigs_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "job_items" ADD CONSTRAINT "job_items_job_id_jobs_id_fk" FOREIGN KEY ("job_id") REFERENCES "public"."jobs"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "jobs" ADD CONSTRAINT "jobs_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "user_settings" ADD CONSTRAINT "user_settings_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;