ALTER TABLE "expenses" ADD COLUMN "user_id" text NOT NULL;--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "expenses_user_id_index" ON "expenses" USING btree ("user_id");