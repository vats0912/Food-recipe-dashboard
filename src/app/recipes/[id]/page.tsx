"use client";
import { useEffect, useState } from "react";
import { fetchRecipe } from "../../lib/api";
import { useParams } from "next/navigation";

export default function RecipeDetail() {
  const params = useParams();
  const id = params?.id;
  const [recipe, setRecipe] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const num = Number(id);

    if (!num || Number.isNaN(num)) {
      setRecipe(null);
      setLoading(false);
      return;
    }

    fetchRecipe(num)
      .then((data) => setRecipe(data))
      .catch(() => setRecipe(null))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading)
    return (
      <div className="flex justify-center items-center p-12 text-slate-600 select-none">
        Loading recipe...
      </div>
    );

  if (!recipe)
    return (
      <div className="max-w-4xl mx-auto p-12 text-center rounded-xl bg-red-50 border border-red-200 text-red-700 font-semibold select-none">
        ❌ Recipe not found.
      </div>
    );

  console.log(recipe);

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="flex flex-col lg:flex-row gap-10">
        {/* Image */}
        {recipe.image_url && (
          <img
            src={recipe.image_url}
            alt={recipe.name}
            className="w-full max-w-md h-64 lg:h-auto object-cover rounded-2xl shadow-lg border border-gray-200"
            loading="lazy"
            decoding="async"
          />
        )}

        {/* Details */}
        <div className="flex-1 flex flex-col justify-start gap-6">
          <h1 className="text-4xl font-extrabold text-gradient bg-gradient-to-r from-sky-500 via-blue-600 to-indigo-700 bg-clip-text text-transparent leading-tight">
            {recipe.name.split("#")[0].trim()}
          </h1>
          <p className="text-sm uppercase tracking-wide font-semibold text-indigo-600">
            {recipe.category}
          </p>
          <p className="text-base text-slate-700 leading-relaxed">{recipe.description}</p>

          {/* Ingredients & Steps */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-6">
            <section className="rounded-lg bg-white p-6 shadow-md border border-gray-100">
              <h2 className="text-xl font-semibold mb-3 text-slate-800">Ingredients</h2>
              <ul className="list-disc list-inside space-y-1 text-slate-700 text-sm max-h-72 overflow-y-auto">
                {recipe.ingredients?.map((ing, i) => (
                  <li key={i}>{ing}</li>
                ))}
              </ul>
            </section>

            <section className="rounded-lg bg-white p-6 shadow-md border border-gray-100">
              <h2 className="text-xl font-semibold mb-3 text-slate-800">Steps</h2>
              <ol className="list-decimal list-inside space-y-2 text-slate-700 text-sm max-h-72 overflow-y-auto">
                {recipe.steps?.map((step, i) => (
                  <li key={i}>{step}</li>
                ))}
              </ol>
            </section>
          </div>

          {/* Macros */}
          <section className="mt-8 bg-gradient-to-r from-blue-100 to-indigo-100 rounded-xl p-6 shadow-inner border border-indigo-200">
            <h2 className="text-xl font-semibold mb-4 text-indigo-700">Macros</h2>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 text-indigo-800 text-sm font-semibold">
              <div className="flex flex-col items-center">
                <span className="text-4xl font-extrabold tabular-nums">{recipe.macrosProtein}</span>
                Protein (g)
              </div>
              <div className="flex flex-col items-center">
                <span className="text-4xl font-extrabold tabular-nums">{recipe.macrosCarbs}</span>
                Carbs (g)
              </div>
              <div className="flex flex-col items-center">
                <span className="text-4xl font-extrabold tabular-nums">{recipe.macrosFats}</span>
                Fats (g)
              </div>
              <div className="flex flex-col items-center">
                <span className="text-4xl font-extrabold tabular-nums">{recipe.macrosCalories}</span>
                Calories
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
