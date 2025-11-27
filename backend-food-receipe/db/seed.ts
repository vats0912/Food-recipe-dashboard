import { db } from "./client.ts";
import { recipes } from "./schema.ts";

const baseRecipes = [
  { name: "Paneer Tikka", category: "Veg", protein: 20, carbs: 10, fats: 12, calories: 250 },
  { name: "Chicken Biryani", category: "Non-Veg", protein: 28, carbs: 65, fats: 14, calories: 520 },
  { name: "Gulab Jamun", category: "Dessert", protein: 4, carbs: 50, fats: 10, calories: 280 },
  { name: "Masala Dosa", category: "Main Course", protein: 8, carbs: 45, fats: 12, calories: 350 },
  { name: "Rajma Chawal", category: "Veg", protein: 15, carbs: 60, fats: 8, calories: 420 },
  { name: "Butter Chicken", category: "Non-Veg", protein: 30, carbs: 20, fats: 25, calories: 480 },
  { name: "Rasgulla", category: "Dessert", protein: 6, carbs: 40, fats: 5, calories: 220 },
  { name: "Veg Pulao", category: "Main Course", protein: 10, carbs: 55, fats: 12, calories: 390 },
  { name: "Fish Curry", category: "Non-Veg", protein: 32, carbs: 12, fats: 18, calories: 360 },
  { name: "Chocolate Brownie", category: "Dessert", protein: 5, carbs: 45, fats: 20, calories: 420 },
  { name: "Chole Bhature", category: "Veg", protein: 14, carbs: 70, fats: 22, calories: 550 },
  { name: "Mutton Rogan Josh", category: "Non-Veg", protein: 35, carbs: 15, fats: 28, calories: 520 },
  { name: "Idli Sambar", category: "Main Course", protein: 12, carbs: 40, fats: 6, calories: 280 },
  { name: "Kheer", category: "Dessert", protein: 8, carbs: 55, fats: 12, calories: 350 },

];

function makeRecipe(i: number) {
  const r = baseRecipes[i % baseRecipes.length];
  return {
    name: `${r?.name} #${i + 1}`,
    description: `A delicious ${r?.category} recipe variation ${i + 1}.`,
    ingredients: JSON.stringify(["Salt", "Spices", "Oil", "Onion", "Tomato"]),
    steps: JSON.stringify(["Prep ingredients", "Cook base", "Serve hot"]),
    imageUrl: `https://picsum.photos/seed/recipe${i}/400/300`,
    macrosProtein: r.protein + Math.floor(Math.random() * 5),
    macrosCarbs: r.carbs + Math.floor(Math.random() * 10),
    macrosFats: r.fats + Math.floor(Math.random() * 3),
    macrosCalories: r.calories + Math.floor(Math.random() * 50),
    category: r.category,
  };
}

async function main() {
  // clear existing
  await db.delete(recipes);

  const data = Array.from({ length: 60 }, (_, i) => makeRecipe(i));
  await db.insert(recipes).values(data);

  console.log("Seeded 60 recipes");
  process.exit(0);
}

main();