import ky from "ky";

const api = ky.create({
  prefixUrl: process.env.NEXT_PUBLIC_API_BASE,
  timeout: 10000,
});

export async function fetchRecipes(params: Record<string, string | number | undefined>) {
  
  const qs: Record<string, string> = {};

  for (const [key, value] of Object.entries(params)) {
    if (value !== undefined && value !== "") {
      qs[key] = String(value); 
    }
  }

  const queryString = new URLSearchParams(qs).toString();

  const url = `recipes?${queryString}`;

  return api.get(url).json<{
    data: unknown[];
    page: number;
    pages: number;
    total: number;
  }>();
}

export async function fetchRecipe(id: string | number) {
    const num = Number(id);

  if (!num || Number.isNaN(num)) {
    throw new Error(`Invalid recipe ID: ${id}`);
  }
  const url=`recipes/${num}`;
  return api.get(url).json<unknown>();
}
