"use client";

import { WatchFilters } from "@/lib/types";
import { formatMovementType, formatMaterial, formatPrice } from "@/lib/watches";

interface ActiveFiltersProps {
  filters: Partial<WatchFilters>;
  onChange: (filters: Partial<WatchFilters>) => void;
}

export default function ActiveFilters({ filters, onChange }: ActiveFiltersProps) {
  const tags: { label: string; remove: () => void }[] = [];

  filters.brands?.forEach((b) =>
    tags.push({
      label: b,
      remove: () =>
        onChange({ ...filters, brands: filters.brands!.filter((x) => x !== b) }),
    })
  );

  filters.movementTypes?.forEach((m) =>
    tags.push({
      label: formatMovementType(m),
      remove: () =>
        onChange({
          ...filters,
          movementTypes: filters.movementTypes!.filter((x) => x !== m),
        }),
    })
  );

  if (filters.minPrice != null || filters.maxPrice != null) {
    const min = filters.minPrice != null ? formatPrice(filters.minPrice) : "Any";
    const max = filters.maxPrice != null ? formatPrice(filters.maxPrice) : "Any";
    tags.push({
      label: `${min} – ${max}`,
      remove: () => onChange({ ...filters, minPrice: null, maxPrice: null }),
    });
  }

  if (filters.minDiameter != null || filters.maxDiameter != null) {
    const min = filters.minDiameter ?? "Any";
    const max = filters.maxDiameter ?? "Any";
    tags.push({
      label: `${min}–${max}mm`,
      remove: () => onChange({ ...filters, minDiameter: null, maxDiameter: null }),
    });
  }

  filters.caseMaterials?.forEach((m) =>
    tags.push({
      label: formatMaterial(m),
      remove: () =>
        onChange({
          ...filters,
          caseMaterials: filters.caseMaterials!.filter((x) => x !== m),
        }),
    })
  );

  filters.crystalTypes?.forEach((c) =>
    tags.push({
      label: formatMaterial(c),
      remove: () =>
        onChange({
          ...filters,
          crystalTypes: filters.crystalTypes!.filter((x) => x !== c),
        }),
    })
  );

  filters.strapTypes?.forEach((s) =>
    tags.push({
      label: formatMaterial(s),
      remove: () =>
        onChange({
          ...filters,
          strapTypes: filters.strapTypes!.filter((x) => x !== s),
        }),
    })
  );

  if (filters.waterResistanceMin != null) {
    tags.push({
      label: `${filters.waterResistanceMin}m+ WR`,
      remove: () => onChange({ ...filters, waterResistanceMin: null }),
    });
  }

  if (filters.hasChronograph === true) {
    tags.push({
      label: "Chronograph",
      remove: () => onChange({ ...filters, hasChronograph: null }),
    });
  }

  if (filters.hasGmt === true) {
    tags.push({
      label: "GMT",
      remove: () => onChange({ ...filters, hasGmt: null }),
    });
  }

  if (filters.hasDate === true) {
    tags.push({
      label: "Date",
      remove: () => onChange({ ...filters, hasDate: null }),
    });
  }

  if (tags.length === 0) return null;

  return (
    <div className="flex items-center gap-1.5 flex-wrap">
      <span className="text-xs text-text-tertiary font-medium mr-1">Active:</span>
      {tags.map((tag, i) => (
        <span
          key={i}
          className="inline-flex items-center gap-1 bg-brand-50 text-brand-700 text-xs font-medium pl-2.5 pr-1 py-1 rounded-full"
        >
          {tag.label}
          <button
            onClick={tag.remove}
            className="w-4 h-4 rounded-full hover:bg-brand-200 flex items-center justify-center transition-colors"
          >
            <svg className="w-2.5 h-2.5" fill="none" viewBox="0 0 24 24" strokeWidth={3} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
            </svg>
          </button>
        </span>
      ))}
      <button
        onClick={() => onChange({})}
        className="text-xs text-text-tertiary hover:text-red-600 font-medium ml-1"
      >
        Clear all
      </button>
    </div>
  );
}
