"use client";

interface ColumnSelectorProps {
  columns: string[];
  setColumns: (cols: string[]) => void;
}

const ALL_COLUMNS = [
  { id: "image", label: "Image" },
  { id: "name", label: "Name" },
  { id: "category", label: "Category" },
  { id: "protein", label: "Protein (g)" },
  { id: "carbs", label: "Carbs (g)" },
  { id: "fats", label: "Fats (g)" },
  { id: "calories", label: "Calories" },
];

export default function ColumnSelector({ columns, setColumns }: ColumnSelectorProps) {
  const toggle = (col: string) => {
    setColumns(columns.includes(col) ? columns.filter((x) => x !== col) : [...columns, col]);
  };

  const selectedCount = columns.length;
  const totalCount = ALL_COLUMNS.length;

  return (
    <div className="w-full rounded-xl border border-slate-200 bg-white/80 backdrop-blur shadow-sm">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-slate-100 px-4 py-3">
        <div>
          <h3 className="text-sm font-semibold text-slate-800">Table Columns</h3>
          <p className="text-xs text-slate-500">
            {selectedCount} of {totalCount} columns shown
          </p>
        </div>
      </div>

      {/* Checkbox List */}
      <div className="p-4 max-h-64 overflow-y-auto">
        <div className="space-y-2">
          {ALL_COLUMNS.map(({ id, label }) => (
            <label
              key={id}
              className="flex items-center justify-between gap-3 p-2 rounded-lg hover:bg-slate-50 cursor-pointer group transition-colors"
            >
              <div className="flex items-center gap-3">
                <input
                  id={id}
                  type="checkbox"
                  checked={columns.includes(id)}
                  onChange={() => toggle(id)}
                  className="h-4 w-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500 focus:ring-2"
                />
                <span className="text-sm font-medium text-slate-700 group-hover:text-slate-900">
                  {label}
                </span>
              </div>
              <span className="text-xs text-slate-400 font-mono">
                {columns.includes(id) ? "✓" : "○"}
              </span>
            </label>
          ))}
        </div>
      </div>

      {/* Footer */}
      <div className="border-t border-slate-100 px-4 py-3 bg-slate-50/50 rounded-b-xl">
        <button
          type="button"
          onClick={() => setColumns([])}
          className="text-xs text-slate-500 hover:text-slate-700 font-medium transition-colors"
        >
          Hide All
        </button>
        <span className="text-xs text-slate-400 mx-2">•</span>
        <button
          type="button"
          onClick={() => setColumns(ALL_COLUMNS.map((c) => c.id))}
          className="text-xs text-slate-500 hover:text-slate-700 font-medium transition-colors"
        >
          Show All
        </button>
      </div>
    </div>
  );
}
