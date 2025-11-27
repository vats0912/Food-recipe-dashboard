"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams, usePathname } from "next/navigation";
import ColumnSelector from "./ColumnSelector";
import Table from "./Table";
import Pagination from "./Pagination";
import FilterBar from "./FilterBar";

const ALL_COLUMNS = ["image", "name", "category", "protein", "carbs", "fats", "calories"];

interface RecipesTableWrapperProps {
  rows: any[];
  currentPage: number;
  totalPages: number;
}

export default function RecipesTableWrapper({
  rows,
  currentPage,
  totalPages,
}: RecipesTableWrapperProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();

  // columns with safe localStorage usage
  const [columns, setColumns] = useState<string[]>(ALL_COLUMNS);

  useEffect(() => {
    if (typeof window === "undefined") return;
    try {
      const saved = localStorage.getItem("columns");
      if (saved) {
        setColumns(JSON.parse(saved));
      }
    } catch (e) {
      console.error("Failed to read columns from localStorage", e);
    }
  }, []);

  const saveColumns = (cols: string[]) => {
    setColumns(cols);
    if (typeof window !== "undefined") {
      try {
        localStorage.setItem("columns", JSON.stringify(cols));
      } catch (e) {
        console.error("Failed to save columns to localStorage", e);
      }
    }
  };

  const handleApply = (params: { search: string; filter: string; limit?: string }) => {
    const urlParams = new URLSearchParams(searchParams.toString());

    if (params.search) {
      urlParams.set("search", params.search);
    } else {
      urlParams.delete("search");
    }

    if (params.filter) {
      urlParams.set("filter", params.filter);
    } else {
      urlParams.delete("filter");
    }

    if (params.limit) {
      urlParams.set("limit", params.limit);
    }

    urlParams.set("page", "1");

    router.push(`${pathname}?${urlParams.toString()}`);
  };

  return (
    <div className="mt-6 space-y-6">
    
      <div className="w-full bg-white rounded-xl shadow-lg p-4">
        <FilterBar
          initialParams={{
            search: searchParams.get("search") || "",
            filter: searchParams.get("filter") || "",
          }}
          onApply={handleApply}
        />
      </div>

      
      <div className="flex flex-col lg:flex-row items-start gap-6">
       
        <div className="w-full lg:w-64 lg:sticky lg:top-6 self-start space-y-6">
          <ColumnSelector columns={columns} setColumns={saveColumns} />
        </div>

        {/* Table + Pagination */}
        <div className="flex-1 bg-white rounded-xl shadow-lg p-4 overflow-x-auto">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2 mb-4">
            <h2 className="text-xl font-semibold text-gray-800">Recipes</h2>
            <span className="text-sm text-gray-500">
              {rows.length} recipe{rows.length !== 1 ? "s" : ""}
            </span>
          </div>

          <Table rows={rows} visibleColumns={columns} />

          <div className="mt-4">
            <Pagination currentPage={currentPage} totalPages={totalPages} />
          </div>
        </div>
      </div>
    </div>
  );
}
