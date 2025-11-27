"use client";
import { useState, useEffect } from "react";

interface FilterBarProps {
  initialParams: { search?: string; filter?: string };
  onApply: (params: { search: string; filter: string }) => void;
}

const CATEGORIES = ["Veg", "Non-Veg", "Dessert", "Main Course"];

export default function FilterBar({ initialParams, onApply }: FilterBarProps) {
  const [search, setSearch] = useState(initialParams.search || "");
  const [filter, setFilter] = useState(initialParams.filter || "");

  useEffect(() => {
    setSearch(initialParams.search || "");
    setFilter(initialParams.filter || "");
  }, [initialParams]);

  const apply = () => {
    onApply({ search, filter });
  };

  const reset = () => {
    setSearch("");
    setFilter("");
    onApply({ search: "", filter: "" });
  };

  return (
    <div className="w-full rounded-xl border border-slate-200 bg-white/80 backdrop-blur shadow-sm">
      {/* Header */}
      <div className="flex flex-col gap-2 border-b border-slate-100 px-4 py-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h3 className="text-sm font-semibold text-slate-800">
            Filters
          </h3>
          <p className="text-xs text-slate-500">
            Narrow down recipes by name and category.
          </p>
        </div>
        <button
          type="button"
          onClick={reset}
          className="self-start rounded-full border border-slate-200 px-3 py-1 text-xs font-medium text-slate-600 hover:border-slate-300 hover:bg-slate-50 transition-colors"
        >
          Reset
        </button>
      </div>

      {/* Controls */}
      <div className="px-4 py-3">
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-3 sm:items-end">
          {/* Search */}
          <div className="flex flex-col gap-1">
            <label className="text-xs font-medium uppercase tracking-wide text-slate-500">
              Search
            </label>
            <div className="relative">
              <span className="pointer-events-none absolute left-2 top-1/2 -translate-y-1/2 text-slate-400 text-sm">
                🔍
              </span>
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && apply()}
                placeholder="Search recipes by name..."
                className="w-full rounded-lg border border-slate-200 bg-white px-8 py-2 text-sm text-slate-800 placeholder:text-slate-400 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-100"
              />
            </div>
          </div>

          {/* Category */}
          <div className="flex flex-col gap-1">
            <label className="text-xs font-medium uppercase tracking-wide text-slate-500">
              Category
            </label>
            <select
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-800 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-100"
            >
              <option value="">All categories</option>
              {CATEGORIES.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </div>

          {/* Apply button */}
          <div className="flex gap-2">
            <button
              type="button"
              onClick={apply}
              className="inline-flex w-full items-center justify-center rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-300 focus:ring-offset-1"
            >
              Apply filters
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
