// app/recipes/page.tsx
import { fetchRecipes } from "../lib/api";
import RecipesTableWrapper from "../components/RecipesTableWrapper";
import { Suspense } from "react";

export const dynamic = "force-dynamic";

interface RecipesPageProps {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}

async function RecipesContent({ searchParams }: RecipesPageProps) {
  const params = await searchParams;
  
  
  const page = Number(params?.page) || 1;
  const limit = Number(params?.limit) || 10;
  const search = typeof params?.search === "string" ? params.search : "";
  const filter = typeof params?.filter === "string" ? params.filter : "";

  try {
    const data = await fetchRecipes({
      page,
      limit,
      search,
      filter,
    });

    return (
      <RecipesTableWrapper
        rows={data.data}
        currentPage={data.page}
        totalPages={data.pages}
        total={data.total}
      />
    );
  } catch (error) {
    console.error("Failed to fetch recipes:", error);
    
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-red-50 border border-red-200 rounded-2xl p-8 text-center">
          <div className="w-16 h-16 mx-auto mb-4 bg-red-100 rounded-2xl flex items-center justify-center">
            <svg className="w-8 h-8 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h2 className="text-xl font-bold text-red-800 mb-2">Failed to Load Recipes</h2>
          <p className="text-red-600 mb-6 max-w-md mx-auto">
            Unable to fetch recipes at this time. Please try refreshing the page.
          </p>
          <button
            onClick={() => window.location.reload()}
            className="inline-flex items-center gap-2 px-6 py-2.5 bg-red-600 text-white font-semibold rounded-xl hover:bg-red-700 focus:outline-none focus:ring-4 focus:ring-red-300 transition-all shadow-sm"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
            Retry
          </button>
        </div>
      </div>
    );
  }
}

export default function RecipesPage({ searchParams }: RecipesPageProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12">
        {/* Header */}
        <div className="text-center mb-12 lg:mb-16">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-slate-800 via-gray-800 to-blue-900 bg-clip-text text-transparent mb-4">
            🍴 Food Recipes Dashboard
          </h1>
          <p className="text-lg sm:text-xl text-slate-600 max-w-2xl mx-auto leading-relaxed">
            Explore, filter, and discover delicious recipes with advanced search and nutritional insights.
          </p>
        </div>

        {/* Content */}
        <main className="max-w-full">
          <Suspense fallback={<RecipesSkeleton />}>
            <RecipesContent searchParams={searchParams} />
          </Suspense>
        </main>
      </div>
    </div>
  );
}

// Loading skeleton for smooth UX
function RecipesSkeleton() {
  return (
    <div className="space-y-6 animate-pulse">
      {/* Filter Bar Skeleton */}
      <div className="w-full h-32 bg-gradient-to-r from-slate-200 to-slate-300 rounded-2xl shadow-sm" />
      
      {/* Main Content Skeleton */}
      <div className="flex flex-col lg:flex-row gap-6">
        {/* Sidebar Skeleton */}
        <div className="w-full lg:w-64 h-96 bg-gradient-to-r from-slate-200 to-slate-300 rounded-2xl shadow-sm" />
        
        {/* Table Skeleton */}
        <div className="flex-1 bg-white rounded-2xl shadow-sm p-6">
          <div className="flex justify-between items-center mb-6 h-8">
            <div className="h-6 w-32 bg-slate-200 rounded" />
            <div className="h-4 w-20 bg-slate-200 rounded" />
          </div>
          <div className="space-y-4">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="h-12 bg-slate-200 rounded-lg" />
            ))}
          </div>
          {/* Pagination Skeleton */}
          <div className="mt-8 flex justify-center h-12 w-64 mx-auto bg-slate-200 rounded-lg" />
        </div>
      </div>
    </div>
  );
}
