// types.ts
export interface Recipe {
  id: number;
  name: string;
  description: string;
  category: string;
  protein: number;
  carbs: number;
  fats: number;
  calories: number;
  image_url: string;
  ingredients: string[]; // Backend sends JSON array
  steps: string[];       // Backend sends JSON array
}

export interface ApiResponse {
  data: Recipe[];
  pages: number;
  page: number;
  total: number;
  limit: number;
}