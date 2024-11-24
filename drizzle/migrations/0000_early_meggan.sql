CREATE TABLE IF NOT EXISTS "expenses" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "expenses_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"title" text NOT NULL,
	"amount" numeric(12, 2) NOT NULL,
	"created_at" timestamp(6) with time zone DEFAULT now()
);
