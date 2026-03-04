"use client";

import Link from "next/link";
import { Watch } from "@/lib/types";

interface CompareBarProps {
  watches: Watch[];
  onRemove: (id: string) => void;
  onClear: () => void;
}

export default function CompareBar({ watches, onRemove, onClear }: CompareBarProps) {
  if (watches.length === 0) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 animate-slide-up">
      <div className="bg-white border-t border-border shadow-[0_-4px_24px_rgba(0,0,0,0.08)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3">
          <div className="flex items-center justify-between gap-4">
            {/* Left: chips */}
            <div className="flex items-center gap-2 overflow-x-auto">
              <div className="flex items-center gap-2 shrink-0">
                <div className="w-8 h-8 rounded-full bg-brand-100 text-brand-700 flex items-center justify-center text-sm font-bold shrink-0">
                  {watches.length}
                </div>
                <span className="text-sm font-medium text-text-primary hidden sm:inline shrink-0">
                  Compare
                </span>
              </div>
              <div className="flex items-center gap-1.5 overflow-x-auto">
                {watches.map((w) => (
                  <span
                    key={w.id}
                    className="inline-flex items-center gap-1.5 bg-surface-sunken text-text-primary text-xs font-medium pl-3 pr-1.5 py-1.5 rounded-full shrink-0"
                  >
                    <span className="text-text-tertiary">{w.brand}</span>
                    {w.model.length > 20 ? w.model.slice(0, 20) + "..." : w.model}
                    <button
                      onClick={() => onRemove(w.id)}
                      className="w-5 h-5 rounded-full hover:bg-red-100 hover:text-red-600 flex items-center justify-center transition-colors"
                    >
                      <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </span>
                ))}
                {watches.length < 3 && (
                  <span className="text-xs text-text-tertiary shrink-0 pl-1">
                    Add {3 - watches.length} more
                  </span>
                )}
              </div>
            </div>

            {/* Right: actions */}
            <div className="flex items-center gap-2 shrink-0">
              <button
                onClick={onClear}
                className="text-xs text-text-tertiary hover:text-red-600 px-2 py-1.5 rounded-lg hover:bg-red-50 transition-colors font-medium"
              >
                Clear
              </button>
              <Link
                href={
                  watches.length >= 2
                    ? `/compare?ids=${watches.map((w) => w.id).join(",")}`
                    : "#"
                }
                className={`text-sm font-medium px-5 py-2 rounded-lg transition-all ${
                  watches.length >= 2
                    ? "bg-brand-600 text-white hover:bg-brand-700 shadow-sm"
                    : "bg-surface-sunken text-text-tertiary cursor-not-allowed"
                }`}
              >
                Compare {watches.length >= 2 ? "Now" : "(2+)"}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
