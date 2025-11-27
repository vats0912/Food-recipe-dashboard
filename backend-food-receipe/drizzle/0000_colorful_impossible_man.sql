CREATE TABLE "recipes" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"description" text NOT NULL,
	"ingredients" text NOT NULL,
	"steps" text NOT NULL,
	"image_url" text,
	"macros_protein" integer NOT NULL,
	"macros_carbs" integer NOT NULL,
	"macros_fats" integer NOT NULL,
	"macros_calories" integer NOT NULL,
	"category" text NOT NULL,
	"created_at" timestamp DEFAULT now()
);
