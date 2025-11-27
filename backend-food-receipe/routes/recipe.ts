import { Router } from "express";
import { db } from "../db/client.ts";
import { recipes } from "../db/schema.ts";
import { eq, ilike, and, gte, lte } from "drizzle-orm";
import { sql } from "drizzle-orm";

const router = Router();


router.get("/", async (req:Request, res:Response) => {
  try {
    const { search, filter, page = "1", limit = "10" } = req.query;
    
    
    const p = Math.max(1, parseInt(page as string, 10) || 1);
    const l = Math.max(1, Math.min(50, parseInt(limit as string, 10) || 10));

    const conditions: any[] = [];
    if (search && typeof search === "string") {
      conditions.push(ilike(recipes.name, `%${search}%`));
    }
    if (filter && typeof filter === "string") {
      conditions.push(eq(recipes.category, filter));
    }

    const where = conditions.length ? and(...conditions) : undefined;

    
    const total = await db
      .select({ count: sql<number>`count(*)` })
      .from(recipes)
      .where(where);

    const totalCount = total[0]?.count || 0;
    const totalPages = Math.ceil(totalCount / l);

    // ✅ Validate page doesn't exceed totalPages
    const validPage = Math.min(p, Math.max(1, totalPages));
    const offset = (validPage - 1) * l;

    // ✅ Fetch paginated data
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



router.get("/:id", async (req:Request, res:Response) => {
  const id = Number(req.params.id);
   if (!id || isNaN(id)) {
    return res.status(400).json({ error: "Invalid recipe id" });
  }

  const result = await db.select().from(recipes).where(eq(recipes.id, id));
  if (!result[0]) return res.status(404).json({ error: "Not found" });

  const row = result[0];
  row.ingredients = JSON.parse(row.ingredients as string);
  row.steps = JSON.parse(row.steps as string);
  res.json(row);
});

export default router;