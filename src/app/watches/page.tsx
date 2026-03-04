"use client";

import { useState, useMemo, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";
import { Watch, WatchFilters, SortOption } from "@/lib/types";
import { getWatches, getAllBrands, sortWatches, countActiveFilters } from "@/lib/watches";
import { watches as allWatchData } from "@/data/watches";
import { SORT_OPTIONS } from "@/lib/constants";
import WatchCard from "@/components/WatchCard";
import FilterPanel from "@/components/FilterPanel";
import ActiveFilters from "@/components/ActiveFilters";
import CompareBar from "@/components/CompareBar";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

function WatchesContent() {
  const searchParams = useSearchParams();
  const [filters, setFilters] = useState<Partial<WatchFilters>>(() => {
    const init: Partial<WatchFilters> = {};
    const q = searchParams.get("q");
    if (q) init.searchQuery = q;
    const movement = searchParams.get("movement");
    if (movement) init.movementTypes = [movement as WatchFilters["movementTypes"][number]];
    const brand = searchParams.get("brand");
    if (brand) init.brands = [brand];
    return init;
  });
  const [sort, setSort] = useState<SortOption>("name-asc");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [compareList, setCompareList] = useState<Watch[]>([]);
  const [mobileFilters, setMobileFilters] = useState(false);

  const brands = useMemo(() => getAllBrands(), []);
  const results = useMemo(() => sortWatches(getWatches(filters), sort), [filters, sort]);
  const activeCount = countActiveFilters(filters);

  // Close mobile filter on resize
  useEffect(() => {
    const handler = () => { if (window.innerWidth >= 1024) setMobileFilters(false); };
    window.addEventListener("resize", handler);
    return () => window.removeEventListener("resize", handler);
  }, []);

  function handleCompare(watch: Watch) {
    setCompareList((prev) => {
      if (prev.find((w) => w.id === watch.id)) return prev.filter((w) => w.id !== watch.id);
      if (prev.length >= 3) return prev;
      return [...prev, watch];
    });
  }

  return (
    <div className="min-h-screen bg-surface-sunken flex flex-col">
      <Navbar />

      <div className="flex-1">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6">
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
            <div>
              <h1 className="text-2xl font-bold text-text-primary tracking-tight">
                Browse Watches
              </h1>
              <p className="text-sm text-text-secondary mt-1">
                {results.length} of {allWatchData.length} watches
              </p>
            </div>

            <div className="flex items-center gap-2">
              {/* Sort */}
              <select
                value={sort}
                onChange={(e) => setSort(e.target.value as SortOption)}
                className="border border-border rounded-lg px-3 py-2 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent"
              >
                {SORT_OPTIONS.map((opt) => (
                  <option key={opt.value} value={opt.value}>{opt.label}</option>
                ))}
              </select>

              {/* View toggle */}
              <div className="hidden sm:flex border border-border rounded-lg overflow-hidden bg-white">
                <button
                  onClick={() => setViewMode("grid")}
                  className={`p-2 transition-colors ${viewMode === "grid" ? "bg-brand-50 text-brand-600" : "text-text-tertiary hover:text-text-primary"}`}
                >
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6A2.25 2.25 0 0 1 6 3.75h2.25A2.25 2.25 0 0 1 10.5 6v2.25a2.25 2.25 0 0 1-2.25 2.25H6a2.25 2.25 0 0 1-2.25-2.25V6ZM3.75 15.75A2.25 2.25 0 0 1 6 13.5h2.25a2.25 2.25 0 0 1 2.25 2.25V18a2.25 2.25 0 0 1-2.25 2.25H6A2.25 2.25 0 0 1 3.75 18v-2.25ZM13.5 6a2.25 2.25 0 0 1 2.25-2.25H18A2.25 2.25 0 0 1 20.25 6v2.25A2.25 2.25 0 0 1 18 10.5h-2.25a2.25 2.25 0 0 1-2.25-2.25V6ZM13.5 15.75a2.25 2.25 0 0 1 2.25-2.25H18a2.25 2.25 0 0 1 2.25 2.25V18A2.25 2.25 0 0 1 18 20.25h-2.25a2.25 2.25 0 0 1-2.25-2.25v-2.25Z" />
                  </svg>
                </button>
                <button
                  onClick={() => setViewMode("list")}
                  className={`p-2 transition-colors ${viewMode === "list" ? "bg-brand-50 text-brand-600" : "text-text-tertiary hover:text-text-primary"}`}
                >
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 12h16.5m-16.5 3.75h16.5M3.75 19.5h16.5M5.625 4.5h12.75a1.875 1.875 0 0 1 0 3.75H5.625a1.875 1.875 0 0 1 0-3.75Z" />
                  </svg>
                </button>
              </div>

              {/* Mobile filter toggle */}
              <button
                onClick={() => setMobileFilters(true)}
                className="lg:hidden flex items-center gap-1.5 border border-border rounded-lg px-3 py-2 text-sm bg-white hover:bg-surface-sunken transition-colors"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 6h9.75M10.5 6a1.5 1.5 0 1 1-3 0m3 0a1.5 1.5 0 1 0-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m-3.75 0H7.5m9-6h3.75m-3.75 0a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m-9.75 0h9.75" />
                </svg>
                Filters
                {activeCount > 0 && (
                  <span className="w-5 h-5 rounded-full bg-brand-600 text-white text-[10px] font-bold flex items-center justify-center">
                    {activeCount}
                  </span>
                )}
              </button>
            </div>
          </div>

          {/* Active filter tags */}
          {activeCount > 0 && (
            <div className="mb-4">
              <ActiveFilters filters={filters} onChange={setFilters} />
            </div>
          )}

          <div className="flex gap-6">
            {/* Desktop Sidebar */}
            <aside className="hidden lg:block w-72 flex-shrink-0">
              <div className="bg-white border border-border rounded-xl p-5 sticky top-20">
                <FilterPanel
                  filters={filters}
                  brands={brands}
                  onChange={setFilters}
                  totalCount={allWatchData.length}
                  filteredCount={results.length}
                />
              </div>
            </aside>

            {/* Main content */}
            <main className="flex-1 min-w-0">
              {results.length === 0 ? (
                <div className="text-center py-20 bg-white border border-border rounded-xl">
                  <svg className="w-12 h-12 text-text-tertiary mx-auto mb-3" fill="none" viewBox="0 0 24 24" strokeWidth={1} stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
                  </svg>
                  <p className="text-text-secondary font-medium">No watches match your filters</p>
                  <p className="text-sm text-text-tertiary mt-1">Try adjusting or resetting your filters</p>
                  <button
                    onClick={() => setFilters({})}
                    className="mt-4 text-sm text-brand-600 hover:text-brand-700 font-medium"
                  >
                    Reset all filters
                  </button>
                </div>
              ) : viewMode === "grid" ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4 stagger-children">
                  {results.map((watch) => (
                    <WatchCard
                      key={watch.id}
                      watch={watch}
                      onCompare={handleCompare}
                      isInCompare={compareList.some((w) => w.id === watch.id)}
                      layout="grid"
                    />
                  ))}
                </div>
              ) : (
                <div className="space-y-3 stagger-children">
                  {results.map((watch) => (
                    <WatchCard
                      key={watch.id}
                      watch={watch}
                      onCompare={handleCompare}
                      isInCompare={compareList.some((w) => w.id === watch.id)}
                      layout="list"
                    />
                  ))}
                </div>
              )}
            </main>
          </div>
        </div>
      </div>

      {/* Mobile filter drawer */}
      {mobileFilters && (
        <>
          <div className="fixed inset-0 bg-black/30 z-50" onClick={() => setMobileFilters(false)} />
          <div className="fixed top-0 right-0 bottom-0 w-80 max-w-[85vw] bg-white z-50 overflow-y-auto animate-slide-in-right shadow-2xl">
            <div className="flex items-center justify-between p-4 border-b border-border sticky top-0 bg-white z-10">
              <h2 className="font-semibold text-text-primary">Filters</h2>
              <button
                onClick={() => setMobileFilters(false)}
                className="p-1.5 rounded-lg hover:bg-surface-sunken text-text-tertiary"
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <div className="p-4">
              <FilterPanel
                filters={filters}
                brands={brands}
                onChange={setFilters}
                totalCount={allWatchData.length}
                filteredCount={results.length}
              />
            </div>
            <div className="sticky bottom-0 p-4 bg-white border-t border-border">
              <button
                onClick={() => setMobileFilters(false)}
                className="w-full bg-brand-600 text-white py-2.5 rounded-lg font-medium hover:bg-brand-700 transition-colors"
              >
                Show {results.length} results
              </button>
            </div>
          </div>
        </>
      )}

      <CompareBar
        watches={compareList}
        onRemove={(id) => setCompareList((prev) => prev.filter((w) => w.id !== id))}
        onClear={() => setCompareList([])}
      />

      {compareList.length === 0 && <Footer />}
    </div>
  );
}

export default function WatchesPage() {
  return (
    <Suspense>
      <WatchesContent />
    </Suspense>
  );
}
