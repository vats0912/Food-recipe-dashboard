"use client";
import { useRouter, useSearchParams, usePathname } from "next/navigation";

export default function Pagination({
  currentPage,
  totalPages,
}: {
  currentPage: number;
  totalPages: number;
}) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();

  const go = (p: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", String(p));
    router.push(`${pathname}?${params.toString()}`);
    if (typeof window !== "undefined") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const isFirst = currentPage <= 1;
  const isLast = currentPage >= totalPages || totalPages === 0;

  return (
    <nav
      className="mt-6 flex flex-col items-center justify-between gap-3 border-t border-slate-100 pt-4 text-sm text-slate-600 sm:flex-row"
      aria-label="Pagination"
    >
      {/* Left: Summary (hidden on very small screens if you want) */}
      <div className="flex items-center gap-2 text-xs sm:text-sm">
        <span className="font-medium text-slate-700">
          Page {currentPage || 1} of {totalPages || 1}
        </span>
      </div>

      {/* Right: Controls */}
      <div className="inline-flex items-center gap-2 rounded-lg bg-slate-50 px-1 py-1">
        <button
          type="button"
          onClick={() => go(currentPage - 1)}
          disabled={isFirst}
          className={`inline-flex items-center gap-1 rounded-md px-3 py-1.5 text-xs font-medium transition ${
            isFirst
              ? "cursor-not-allowed text-slate-300"
              : "text-slate-700 hover:bg-white hover:text-slate-900"
          }`}
        >
          <span className="text-base">←</span>
          <span className="hidden sm:inline">Previous</span>
        </button>

        {/* Current page badge */}
        <span className="rounded-md bg-white px-3 py-1.5 text-xs font-semibold text-slate-800 shadow-sm">
          {currentPage || 1}
        </span>

        <button
          type="button"
          onClick={() => go(currentPage + 1)}
          disabled={isLast}
          className={`inline-flex items-center gap-1 rounded-md px-3 py-1.5 text-xs font-medium transition ${
            isLast
              ? "cursor-not-allowed text-slate-300"
              : "text-slate-700 hover:bg-white hover:text-slate-900"
          }`}
        >
          <span className="hidden sm:inline">Next</span>
          <span className="text-base">→</span>
        </button>
      </div>
    </nav>
  );
}
