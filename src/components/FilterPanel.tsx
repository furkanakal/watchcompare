"use client";

import { useState } from "react";
import { WatchFilters } from "@/lib/types";
import { MOVEMENT_TYPES, CRYSTAL_TYPES, STRAP_TYPES, WATER_RESISTANCE_OPTIONS, PRICE_PRESETS } from "@/lib/constants";

interface FilterPanelProps {
  filters: Partial<WatchFilters>;
  brands: string[];
  onChange: (filters: Partial<WatchFilters>) => void;
  totalCount: number;
  filteredCount: number;
}

export default function FilterPanel({
  filters,
  brands,
  onChange,
  totalCount,
  filteredCount,
}: FilterPanelProps) {
  function toggleArray<T>(key: keyof WatchFilters, value: T, current: T[] | undefined) {
    const arr = current || [];
    const next = arr.includes(value) ? arr.filter((v) => v !== value) : [...arr, value];
    onChange({ ...filters, [key]: next });
  }

  return (
    <div className="space-y-1">
      <div className="px-1 pb-3 mb-1 border-b border-border-light">
        <p className="text-xs text-text-tertiary">
          Showing <span className="font-semibold text-text-primary">{filteredCount}</span> of {totalCount} watches
        </p>
      </div>

      {/* Search */}
      <div className="px-1 pb-4">
        <div className="relative">
          <svg className="absolute left-2.5 top-1/2 -translate-y-1/2 w-4 h-4 text-text-tertiary" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
          </svg>
          <input
            type="text"
            placeholder="Search models, refs..."
            value={filters.searchQuery || ""}
            onChange={(e) => onChange({ ...filters, searchQuery: e.target.value })}
            className="w-full border border-border rounded-lg pl-8 pr-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent placeholder:text-text-tertiary"
          />
        </div>
      </div>

      {/* Brand */}
      <FilterSection title="Brand" defaultOpen>
        <div className="space-y-1.5">
          {brands.map((brand) => (
            <FilterCheckbox
              key={brand}
              label={brand}
              checked={(filters.brands || []).includes(brand)}
              onChange={() => toggleArray("brands", brand, filters.brands)}
            />
          ))}
        </div>
      </FilterSection>

      {/* Movement */}
      <FilterSection title="Movement" defaultOpen>
        <div className="space-y-1.5">
          {MOVEMENT_TYPES.map((t) => (
            <FilterCheckbox
              key={t.value}
              label={t.label}
              checked={(filters.movementTypes || []).includes(t.value)}
              onChange={() => toggleArray("movementTypes", t.value, filters.movementTypes)}
            />
          ))}
        </div>
      </FilterSection>

      {/* Price */}
      <FilterSection title="Price" defaultOpen>
        <div className="grid grid-cols-2 gap-1.5 mb-3">
          {PRICE_PRESETS.map((p) => {
            const isActive =
              filters.minPrice === p.min && filters.maxPrice === p.max;
            return (
              <button
                key={p.label}
                onClick={() =>
                  isActive
                    ? onChange({ ...filters, minPrice: null, maxPrice: null })
                    : onChange({ ...filters, minPrice: p.min, maxPrice: p.max })
                }
                className={`text-xs py-1.5 px-2 rounded-lg border transition-colors ${
                  isActive
                    ? "bg-brand-50 border-brand-200 text-brand-700 font-medium"
                    : "border-border text-text-secondary hover:border-brand-200 hover:text-brand-600"
                }`}
              >
                {p.label}
              </button>
            );
          })}
        </div>
        <div className="flex gap-2 items-center">
          <input
            type="number"
            placeholder="Min"
            value={filters.minPrice ?? ""}
            onChange={(e) =>
              onChange({ ...filters, minPrice: e.target.value ? Number(e.target.value) : null })
            }
            className="w-full border border-border rounded-lg px-2.5 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500"
          />
          <span className="text-text-tertiary text-xs">to</span>
          <input
            type="number"
            placeholder="Max"
            value={filters.maxPrice ?? ""}
            onChange={(e) =>
              onChange({ ...filters, maxPrice: e.target.value ? Number(e.target.value) : null })
            }
            className="w-full border border-border rounded-lg px-2.5 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500"
          />
        </div>
      </FilterSection>

      {/* Case Size */}
      <FilterSection title="Case Diameter">
        <div className="flex gap-2 items-center">
          <input
            type="number"
            placeholder="Min mm"
            value={filters.minDiameter ?? ""}
            onChange={(e) =>
              onChange({ ...filters, minDiameter: e.target.value ? Number(e.target.value) : null })
            }
            className="w-full border border-border rounded-lg px-2.5 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500"
          />
          <span className="text-text-tertiary text-xs">to</span>
          <input
            type="number"
            placeholder="Max mm"
            value={filters.maxDiameter ?? ""}
            onChange={(e) =>
              onChange({ ...filters, maxDiameter: e.target.value ? Number(e.target.value) : null })
            }
            className="w-full border border-border rounded-lg px-2.5 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500"
          />
        </div>
      </FilterSection>

      {/* Crystal */}
      <FilterSection title="Crystal">
        <div className="space-y-1.5">
          {CRYSTAL_TYPES.map((t) => (
            <FilterCheckbox
              key={t.value}
              label={t.label}
              checked={(filters.crystalTypes || []).includes(t.value)}
              onChange={() => toggleArray("crystalTypes", t.value, filters.crystalTypes)}
            />
          ))}
        </div>
      </FilterSection>

      {/* Strap */}
      <FilterSection title="Strap / Bracelet">
        <div className="space-y-1.5">
          {STRAP_TYPES.map((t) => (
            <FilterCheckbox
              key={t.value}
              label={t.label}
              checked={(filters.strapTypes || []).includes(t.value)}
              onChange={() => toggleArray("strapTypes", t.value, filters.strapTypes)}
            />
          ))}
        </div>
      </FilterSection>

      {/* Water Resistance */}
      <FilterSection title="Water Resistance">
        <div className="space-y-1.5">
          {WATER_RESISTANCE_OPTIONS.map((opt) => (
            <button
              key={opt.value}
              onClick={() =>
                onChange({
                  ...filters,
                  waterResistanceMin:
                    filters.waterResistanceMin === opt.value ? null : opt.value,
                })
              }
              className={`block w-full text-left text-sm px-3 py-1.5 rounded-lg transition-colors ${
                filters.waterResistanceMin === opt.value
                  ? "bg-brand-50 text-brand-700 font-medium"
                  : "text-text-secondary hover:bg-surface-sunken"
              }`}
            >
              {opt.label}
            </button>
          ))}
        </div>
      </FilterSection>

      {/* Features */}
      <FilterSection title="Features">
        <div className="space-y-1.5">
          <FilterCheckbox
            label="Date Display"
            checked={filters.hasDate === true}
            onChange={() => onChange({ ...filters, hasDate: filters.hasDate ? null : true })}
          />
          <FilterCheckbox
            label="Chronograph"
            checked={filters.hasChronograph === true}
            onChange={() => onChange({ ...filters, hasChronograph: filters.hasChronograph ? null : true })}
          />
          <FilterCheckbox
            label="GMT / Dual Time"
            checked={filters.hasGmt === true}
            onChange={() => onChange({ ...filters, hasGmt: filters.hasGmt ? null : true })}
          />
        </div>
      </FilterSection>

      {/* Reset */}
      <div className="pt-3 px-1">
        <button
          onClick={() => onChange({})}
          className="w-full text-sm text-text-tertiary hover:text-text-primary py-2.5 border border-border rounded-lg hover:bg-surface-sunken transition-colors font-medium"
        >
          Reset All Filters
        </button>
      </div>
    </div>
  );
}

function FilterSection({
  title,
  defaultOpen = false,
  children,
}: {
  title: string;
  defaultOpen?: boolean;
  children: React.ReactNode;
}) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div className="border-b border-border-light">
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center justify-between w-full px-1 py-3 text-sm font-medium text-text-primary hover:text-brand-600 transition-colors"
      >
        {title}
        <svg
          className={`w-4 h-4 text-text-tertiary transition-transform duration-200 ${open ? "rotate-180" : ""}`}
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={2}
          stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
        </svg>
      </button>
      {open && <div className="pb-3 px-1">{children}</div>}
    </div>
  );
}

function FilterCheckbox({
  label,
  checked,
  onChange,
}: {
  label: string;
  checked: boolean;
  onChange: () => void;
}) {
  return (
    <label className="flex items-center gap-2.5 cursor-pointer group">
      <div
        className={`w-4 h-4 rounded border-2 flex items-center justify-center transition-all ${
          checked
            ? "bg-brand-600 border-brand-600"
            : "border-gray-300 group-hover:border-brand-400"
        }`}
        onClick={onChange}
      >
        {checked && (
          <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" strokeWidth={3} stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
          </svg>
        )}
      </div>
      <span
        onClick={onChange}
        className={`text-sm transition-colors ${
          checked ? "text-text-primary font-medium" : "text-text-secondary group-hover:text-text-primary"
        }`}
      >
        {label}
      </span>
    </label>
  );
}
