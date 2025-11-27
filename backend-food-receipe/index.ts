import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import recipesRouter from "./routes/recipe.ts";

dotenv.config();
const app = express();

app.use(cors({ origin: process.env.CORS_ORIGIN || "*" }));
app.use(express.json());

app.get("/", (req, res) => res.send("Recipes API OK"));
app.use("/api/recipes", recipesRouter);

const port = process.env.PORT || 8000;
app.listen(port, () => console.log(`Backend running on :${port}`));