"use client";

import { useSearchParams } from "next/navigation";
import { Suspense, useMemo, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { getWatch, formatPrice, formatMovementType, formatMaterial, formatWaterResistance, formatFrequency, formatDialColor } from "@/lib/watches";
import { Watch } from "@/lib/types";
import { watches as allWatches } from "@/data/watches";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

function CompareContent() {
  const searchParams = useSearchParams();
  const idsParam = searchParams.get("ids") || "";
  const [selectedIds, setSelectedIds] = useState<string[]>(() =>
    idsParam ? idsParam.split(",").filter(Boolean) : []
  );
  const [showOnlyDifferences, setShowOnlyDifferences] = useState(false);

  const watches = useMemo(
    () => selectedIds.map((id) => getWatch(id)).filter(Boolean) as Watch[],
    [selectedIds]
  );

  function addWatch(id: string) {
    if (selectedIds.length >= 3 || selectedIds.includes(id)) return;
    setSelectedIds((prev) => [...prev, id]);
  }

  function removeWatch(id: string) {
    setSelectedIds((prev) => prev.filter((i) => i !== id));
  }

  type SpecRow = {
    label: string;
    get: (w: Watch) => string;
    numeric?: (w: Watch) => number;
    higherBetter?: boolean;
    lowerBetter?: boolean;
  };

  const specRows: (SpecRow | { section: string })[] = [
    { label: "Brand", get: (w) => w.brand },
    { label: "Collection", get: (w) => w.collection },
    { label: "Reference", get: (w) => w.reference },
    { label: "Price (MSRP)", get: (w) => formatPrice(w.price), numeric: (w) => w.price ?? 0, lowerBetter: true },
    { section: "Movement" },
    { label: "Type", get: (w) => formatMovementType(w.specs.movementType) },
    { label: "Caliber", get: (w) => w.specs.movementName },
    { label: "Power Reserve", get: (w) => `${w.specs.powerReserve}h`, numeric: (w) => w.specs.powerReserve, higherBetter: true },
    { label: "Frequency", get: (w) => formatFrequency(w.specs.frequency) },
    { label: "Jewels", get: (w) => w.specs.jewels != null ? `${w.specs.jewels}` : "N/A" },
    { label: "Hacking", get: (w) => w.specs.hacking ? "Yes" : "No" },
    { label: "Hand-winding", get: (w) => w.specs.handWinding ? "Yes" : "No" },
    { section: "Case" },
    { label: "Diameter", get: (w) => `${w.specs.caseDiameter} mm`, numeric: (w) => w.specs.caseDiameter },
    { label: "Thickness", get: (w) => `${w.specs.caseThickness} mm`, numeric: (w) => w.specs.caseThickness, lowerBetter: true },
    { label: "Material", get: (w) => formatMaterial(w.specs.caseMaterial) },
    { label: "Case Back", get: (w) => formatMaterial(w.specs.caseBack) },
    { label: "Crystal", get: (w) => formatMaterial(w.specs.crystal) },
    { label: "Water Resistance", get: (w) => formatWaterResistance(w.specs.waterResistance), numeric: (w) => w.specs.waterResistance, higherBetter: true },
    { section: "Dial & Display" },
    { label: "Dial Color", get: (w) => formatDialColor(w.specs.dialColor) },
    { label: "Luminous", get: (w) => w.specs.luminous ? "Yes" : "No" },
    { label: "Date", get: (w) => w.specs.dateDisplay ? "Yes" : "No" },
    { label: "Day", get: (w) => w.specs.dayDisplay ? "Yes" : "No" },
    { label: "Chronograph", get: (w) => w.specs.chronograph ? "Yes" : "No" },
    { label: "GMT", get: (w) => w.specs.gmtFunction ? "Yes" : "No" },
    { section: "Strap / Bracelet" },
    { label: "Type", get: (w) => formatMaterial(w.specs.strapType) },
    { label: "Material", get: (w) => w.specs.strapMaterial },
    { label: "Lug Width", get: (w) => `${w.specs.lugWidth} mm` },
  ];

  function valuesDiffer(row: SpecRow): boolean {
    if (watches.length < 2) return false;
    const values = watches.map((w) => row.get(w));
    return new Set(values).size > 1;
  }

  function getBestIndex(row: SpecRow): number | null {
    if (!row.numeric || watches.length < 2) return null;
    const values = watches.map((w) => row.numeric!(w));
    if (row.higherBetter) {
      const max = Math.max(...values);
      const idx = values.indexOf(max);
      return values.filter((v) => v === max).length === 1 ? idx : null;
    }
    if (row.lowerBetter) {
      const min = Math.min(...values);
      const idx = values.indexOf(min);
      return values.filter((v) => v === min).length === 1 ? idx : null;
    }
    return null;
  }

  const filteredRows = showOnlyDifferences
    ? specRows.filter((row) => {
        if ("section" in row) return true;
        return valuesDiffer(row);
      })
    : specRows;

  return (
    <div className="min-h-screen bg-surface-sunken flex flex-col">
      <Navbar />
      <div className="flex-1">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-6 sm:py-8">
          <div className="mb-6">
            <h1 className="text-2xl font-bold text-text-primary tracking-tight">Compare Watches</h1>
            <p className="text-sm text-text-secondary mt-1">
              Select up to 3 watches. Differences are highlighted, best values marked in green.
            </p>
          </div>

          {/* Watch selector */}
          <div className="bg-white border border-border rounded-xl p-4 sm:p-5 mb-6">
            <div className="flex flex-col sm:flex-row sm:items-end gap-3">
              <div className="flex-1">
                <label className="block text-sm font-medium text-text-primary mb-1.5">
                  Add a watch
                </label>
                <select
                  onChange={(e) => { if (e.target.value) addWatch(e.target.value); e.target.value = ""; }}
                  disabled={selectedIds.length >= 3}
                  className="w-full border border-border rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent disabled:opacity-50 disabled:cursor-not-allowed"
                  defaultValue=""
                >
                  <option value="" disabled>
                    {selectedIds.length >= 3 ? "Maximum 3 watches" : "Select a watch..."}
                  </option>
                  {allWatches
                    .filter((w) => !selectedIds.includes(w.id))
                    .map((w) => (
                      <option key={w.id} value={w.id}>
                        {w.brand} — {w.model} ({w.reference})
                      </option>
                    ))}
                </select>
              </div>
              {watches.length >= 2 && (
                <label className="flex items-center gap-2 cursor-pointer shrink-0 pb-0.5">
                  <div
                    className={`w-9 h-5 rounded-full transition-colors relative ${
                      showOnlyDifferences ? "bg-brand-600" : "bg-gray-200"
                    }`}
                    onClick={() => setShowOnlyDifferences(!showOnlyDifferences)}
                  >
                    <div
                      className={`absolute top-0.5 w-4 h-4 rounded-full bg-white shadow transition-transform ${
                        showOnlyDifferences ? "translate-x-4" : "translate-x-0.5"
                      }`}
                    />
                  </div>
                  <span className="text-sm text-text-secondary" onClick={() => setShowOnlyDifferences(!showOnlyDifferences)}>
                    Only differences
                  </span>
                </label>
              )}
            </div>

            {watches.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-3 pt-3 border-t border-border-light">
                {watches.map((w, i) => (
                  <span key={w.id} className="inline-flex items-center gap-2 bg-surface-sunken pl-3 pr-1.5 py-1.5 rounded-full text-sm">
                    <span className="w-2 h-2 rounded-full" style={{ backgroundColor: ["#3b82f6", "#10b981", "#f59e0b"][i] }} />
                    <span className="font-medium text-text-primary">{w.brand}</span>
                    <span className="text-text-tertiary">{w.model.length > 25 ? w.model.slice(0, 25) + "..." : w.model}</span>
                    <button onClick={() => removeWatch(w.id)} className="w-5 h-5 rounded-full hover:bg-red-100 hover:text-red-600 flex items-center justify-center transition-colors text-text-tertiary">
                      <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </span>
                ))}
              </div>
            )}
          </div>

          {/* Empty state */}
          {watches.length === 0 && (
            <div className="text-center py-20 bg-white border border-border rounded-xl">
              <svg className="w-16 h-16 text-text-tertiary/30 mx-auto mb-4" fill="none" viewBox="0 0 24 24" strokeWidth={0.75} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 21 3 16.5m0 0L7.5 12M3 16.5h13.5m0-13.5L21 7.5m0 0L16.5 12M21 7.5H7.5" />
              </svg>
              <p className="text-text-secondary font-medium text-lg">No watches selected</p>
              <p className="text-sm text-text-tertiary mt-1 max-w-sm mx-auto">
                Use the dropdown above to add watches, or{" "}
                <Link href="/watches" className="text-brand-600 hover:text-brand-700 font-medium">browse the catalog</Link>{" "}
                and click &quot;+ Compare&quot; on any watch.
              </p>
            </div>
          )}

          {watches.length === 1 && (
            <div className="bg-brand-50 border border-brand-100 rounded-xl p-4 text-center">
              <p className="text-sm text-brand-700">Add at least one more watch to start comparing.</p>
            </div>
          )}

          {/* Comparison table */}
          {watches.length >= 2 && (
            <div className="bg-white border border-border rounded-xl overflow-hidden shadow-sm">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-border">
                      <th className="text-left p-4 sm:p-5 w-44 bg-surface-raised text-xs font-semibold text-text-tertiary uppercase tracking-wider">
                        Specification
                      </th>
                      {watches.map((w, i) => (
                        <th key={w.id} className="p-4 sm:p-5 text-center min-w-[180px]">
                          <div className="flex flex-col items-center">
                            <div className="w-16 h-16 bg-surface-sunken rounded-xl flex items-center justify-center mb-2 relative overflow-hidden">
                              {w.imageUrl ? (
                                <Image src={w.imageUrl} alt={`${w.brand} ${w.model}`} fill className="object-contain p-1" sizes="64px" />
                              ) : (
                                <svg className="w-8 h-8 text-text-tertiary/30" fill="none" viewBox="0 0 24 24" strokeWidth={1} stroke="currentColor">
                                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                                </svg>
                              )}
                            </div>
                            <Link href={`/watch/${w.id}`} className="font-semibold text-text-primary hover:text-brand-600 text-sm transition-colors">{w.model}</Link>
                            <p className="text-xs text-text-tertiary mt-0.5">{w.brand}</p>
                            <div className="flex items-center gap-1.5 mt-2">
                              <span className="w-2 h-2 rounded-full" style={{ backgroundColor: ["#3b82f6", "#10b981", "#f59e0b"][i] }} />
                              <button onClick={() => removeWatch(w.id)} className="text-[10px] text-text-tertiary hover:text-red-600 transition-colors font-medium">Remove</button>
                            </div>
                          </div>
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {filteredRows.map((row, i) => {
                      if ("section" in row) {
                        return (
                          <tr key={`section-${i}`} className="bg-surface-raised">
                            <td colSpan={watches.length + 1} className="px-4 sm:px-5 py-2 text-xs font-semibold text-text-primary uppercase tracking-wider">{row.section}</td>
                          </tr>
                        );
                      }
                      const differs = valuesDiffer(row);
                      const bestIdx = getBestIndex(row);
                      return (
                        <tr key={i} className={`border-t border-border-light ${differs ? "bg-amber-50/40" : ""}`}>
                          <td className="px-4 sm:px-5 py-3 text-sm text-text-secondary">
                            {row.label}
                            {differs && <span className="inline-block w-1.5 h-1.5 bg-amber-400 rounded-full ml-1.5 align-middle" />}
                          </td>
                          {watches.map((w, wi) => (
                            <td key={w.id} className={`px-4 sm:px-5 py-3 text-sm text-center font-medium ${
                              bestIdx === wi ? "text-green-700 bg-green-50/50" : differs ? "text-text-primary" : "text-text-secondary"
                            }`}>
                              {row.get(w)}
                              {bestIdx === wi && (
                                <svg className="w-3.5 h-3.5 text-green-600 inline-block ml-1" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor">
                                  <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                                </svg>
                              )}
                            </td>
                          ))}
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {watches.length >= 2 && (
            <div className="flex flex-wrap items-center gap-4 mt-4 text-xs text-text-tertiary">
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 bg-amber-400 rounded-full" />
                Values differ
              </div>
              <div className="flex items-center gap-1.5">
                <svg className="w-3.5 h-3.5 text-green-600" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                </svg>
                Best value
              </div>
            </div>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default function ComparePage() {
  return (
    <Suspense>
      <CompareContent />
    </Suspense>
  );
}
