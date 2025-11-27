import express from "express";
import { db } from "../db/client.js";
import { recipes } from "../db/schema.js";
import { eq, ilike, and, gte, lte } from "drizzle-orm";
import { sql } from "drizzle-orm";

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const { search, filter, page = "1", limit = "10" } = req.query;
    
    const p = Math.max(1, parseInt(page, 10) || 1);
    const l = Math.max(1, Math.min(50, parseInt(limit, 10) || 10));

    const conditions = [];
    if (search && typeof search === "string") {
      conditions.push(ilike(recipes.name, `%${search}%`));
    }
    if (filter && typeof filter === "string") {
      conditions.push(eq(recipes.category, filter));
    }

    const where = conditions.length ? and(...conditions) : undefined;

    const total = await db
      .select({ count: sql`count(*)` })
      .from(recipes)
      .where(where);

    const totalCount = Number(total[0]?.count || 0);
    const totalPages = Math.ceil(totalCount / l);

    const validPage = Math.min(p, Math.max(1, totalPages));
    const offset = (validPage - 1) * l;

    const rows = await db
      .select()
      .from(recipes)
      .where(where)
      .limit(l)
      .offset(offset);

    res.json({
      page: validPage,
      limit: l,
      total: totalCount,
      pages: totalPages,
      data: rows,
    });
  } catch (error) {
    console.error("Pagination error:", error);
    res.status(500).json({ error: "Failed to fetch recipes" });
  }
});

router.get("/:id", async (req, res) => {
  const id = Number(req.params.id);
  if (!id || isNaN(id)) {
    return res.status(400).json({ error: "Invalid recipe id" });
  }

  const result = await db.select().from(recipes).where(eq(recipes.id, id));
  if (!result[0]) return res.status(404).json({ error: "Not found" });

  const row = result[0];
  
  // Safe JSON parsing
  try {
    row.ingredients = JSON.parse(row.ingredients);
  } catch {
    row.ingredients = [];
  }
  try {
    row.steps = JSON.parse(row.steps);
  } catch {
    row.steps = [];
  }
  
  res.json(row);
});

export default router;
