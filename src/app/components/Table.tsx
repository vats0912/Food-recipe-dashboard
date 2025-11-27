"use client";

import Link from "next/link";

interface TableProps {
  rows: any[];
  visibleColumns: string[];
}

export default function Table({ rows, visibleColumns }: TableProps) {
  const show = (col: string) => visibleColumns.includes(col);

  if (rows.length === 0) {
    return (
      <div className="text-center py-10 text-gray-500">
        No recipes found. Try adjusting your filters.
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="hidden md:table min-w-full divide-y divide-gray-200 text-sm">
        <thead className="bg-gray-50 text-gray-700 font-semibold">
          <tr>
            {/* {show("image") && <th className="whitespace-nowrap px-4 py-3 text-left">Image</th>} */}
            {show("name") && <th className="whitespace-nowrap px-4 py-3 text-left">Name</th>}
            {show("category") && <th className="whitespace-nowrap px-4 py-3 text-left">Category</th>}
            {show("protein") && <th className="whitespace-nowrap px-4 py-3 text-right">Protein (g)</th>}
            {show("carbs") && <th className="whitespace-nowrap px-4 py-3 text-right">Carbs (g)</th>}
            {show("fats") && <th className="whitespace-nowrap px-4 py-3 text-right">Fats (g)</th>}
            {show("calories") && <th className="whitespace-nowrap px-4 py-3 text-right">Calories</th>}
            <th className="whitespace-nowrap px-4 py-3 text-left">Actions</th>
          </tr>
        </thead>

        <tbody className="divide-y divide-gray-100 bg-white">
          {rows.map((row) => (
            <tr key={row.id} className="hover:bg-slate-50 transition-colors duration-200">
              {/* {show("image") && (
                <td className="whitespace-nowrap px-4 py-3"> */}
                  {/* {row.image_url ? (
                    <img
                      src={row.image_url}
                      alt={row.name}
                      className="h-14 w-20 rounded-lg object-cover shadow-sm"
                      loading="lazy"
                    />
                  ) : (
                    <div className="h-14 w-20 rounded-lg bg-gray-200 flex items-center justify-center text-xs text-gray-400">
                      No Image
                    </div>
                  )} */}
                {/* </td>
              )} */}
              {show("name") && (
                <td className="whitespace-normal px-4 py-3 max-w-xs break-words">
                  {row.name.split("#")[0].trim()}
                </td>
              )}
              {show("category") && <td className="whitespace-nowrap px-4 py-3">{row.category}</td>}
              {show("protein") && (
                <td className="whitespace-nowrap px-4 py-3 text-right font-mono tabular-nums">
                  {row.macrosProtein ?? "-"}
                </td>
              )}
              {show("carbs") && (
                <td className="whitespace-nowrap px-4 py-3 text-right font-mono tabular-nums">
                  {row.macrosCarbs ?? "-"}
                </td>
              )}
              {show("fats") && (
                <td className="whitespace-nowrap px-4 py-3 text-right font-mono tabular-nums">
                  {row.macrosFats ?? "-"}
                </td>
              )}
              {show("calories") && (
                <td className="whitespace-nowrap px-4 py-3 text-right font-mono tabular-nums">
                  {row.macrosCalories ?? "-"}
                </td>
              )}
              <td className="whitespace-nowrap px-8 py-3">
                <Link href={`/recipes/${row.id}`} className="text-blue-600 hover:text-blue-700 font-medium transition">
                  View
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

     
      <div className="md:hidden space-y-4">
        {rows.map((row) => (
          <div key={row.id} className="bg-white rounded-lg border border-gray-200 p-4 shadow-sm">
            {/* {show("image") && (
              <div className="mb-3">
                {row.image_url ? (
                  <img
                    src={row.image_url}
                    alt={row.name.split("#")[0].trim()}
                    className="w-full h-40 rounded-lg object-cover shadow-sm"
                    loading="lazy"
                  />
                ) : (
                  <div className="h-40 rounded-lg bg-gray-200 flex items-center justify-center text-gray-400 text-sm">
                     Image will be available soon
                  </div>
                )}
              </div>
            )} */}

            <div className="space-y-2">
              {visibleColumns
                .filter((col) => col !== "image")
                .map((col) => {
                  let label = col.charAt(0).toUpperCase() + col.slice(1);
                  if (col === "protein") label = "Protein (g)";
                  if (col === "carbs") label = "Carbs (g)";
                  if (col === "fats") label = "Fats (g)";
                  if (col === "calories") label = "Calories";
                  const value = row[`macros${col.charAt(0).toUpperCase() + col.slice(1)}`] ?? row[col] ?? "-";
                  return (
                    <div key={col} className="flex justify-between text-sm text-gray-700">
                      <span className="font-semibold">{label}:</span>
                      <span className="font-mono tabular-nums">{value}</span>
                    </div>
                  );
                })}
            </div>

            <div className="mt-3">
              <Link
                href={`/recipes/${row.id}`}
                className="block rounded bg-blue-600 px-4 py-2 text-center text-white hover:bg-blue-700 font-medium transition"
              >
                View Details
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
