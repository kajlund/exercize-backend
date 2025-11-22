CREATE TABLE "Activities" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"when" date DEFAULT now() NOT NULL,
	"kindId" uuid NOT NULL,
	"title" varchar(50) NOT NULL,
	"description" text DEFAULT '' NOT NULL,
	"distance" numeric DEFAULT 0 NOT NULL,
	"duration" integer DEFAULT 0 NOT NULL,
	"elevation" integer DEFAULT 0 NOT NULL,
	"calories" integer DEFAULT 0 NOT NULL
);
--> statement-breakpoint
CREATE TABLE "ActivityKinds" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" varchar(50) NOT NULL,
	"description" text DEFAULT '' NOT NULL,
	CONSTRAINT "ActivityKinds_name_unique" UNIQUE("name")
);
--> statement-breakpoint
ALTER TABLE "Activities" ADD CONSTRAINT "Activities_kindId_ActivityKinds_id_fk" FOREIGN KEY ("kindId") REFERENCES "public"."ActivityKinds"("id") ON DELETE no action ON UPDATE no action;