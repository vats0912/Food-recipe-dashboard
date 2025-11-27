import { serial, text, integer, timestamp, pgTable } from "drizzle-orm/pg-core";

export const recipes = pgTable("recipes", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  description: text("description").notNull(),
  ingredients: text("ingredients").notNull(),
  steps: text("steps").notNull(),
  imageUrl: text("image_url"),
  macrosProtein: integer("macros_protein").notNull(),
  macrosCarbs: integer("macros_carbs").notNull(),
  macrosFats: integer("macros_fats").notNull(),
  macrosCalories: integer("macros_calories").notNull(),
  category: text("category").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
});
