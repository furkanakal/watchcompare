import { Watch, WatchFilters, SortOption } from "@/lib/types";
import { watches } from "@/data/watches";

// ─── Queries ─────────────────────────────────────────────────

export function getAllBrands(): string[] {
  return [...new Set(watches.map((w) => w.brand))].sort();
}

export function getWatch(id: string): Watch | undefined {
  return watches.find((w) => w.id === id);
}

export function getWatchesByBrand(brand: string): Watch[] {
  return watches.filter((w) => w.brand === brand);
}

export function getRelatedWatches(watch: Watch, limit = 4): Watch[] {
  return watches
    .filter((w) => w.id !== watch.id)
    .map((w) => {
      let score = 0;
      if (w.brand === watch.brand) score += 3;
      if (w.collection === watch.collection) score += 5;
      if (w.specs.movementType === watch.specs.movementType) score += 2;
      if (
        Math.abs(w.specs.caseDiameter - watch.specs.caseDiameter) <= 2
      )
        score += 2;
      if (w.price && watch.price && Math.abs(w.price - watch.price) < 300)
        score += 2;
      if (w.specs.strapType === watch.specs.strapType) score += 1;
      if (w.specs.waterResistance >= watch.specs.waterResistance) score += 1;
      return { watch: w, score };
    })
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map((r) => r.watch);
}

export function getAllCollections(): string[] {
  return [...new Set(watches.map((w) => w.collection))].sort();
}

export function getDialColors(): string[] {
  return [...new Set(watches.map((w) => w.specs.dialColor))].sort();
}

export function getPriceRange(): { min: number; max: number } {
  const prices = watches.filter((w) => w.price != null).map((w) => w.price!);
  return { min: Math.min(...prices), max: Math.max(...prices) };
}

export function getDiameterRange(): { min: number; max: number } {
  const diameters = watches.map((w) => w.specs.caseDiameter);
  return { min: Math.min(...diameters), max: Math.max(...diameters) };
}

// ─── Filtering ───────────────────────────────────────────────

export function getWatches(filters: Partial<WatchFilters> = {}): Watch[] {
  let result = [...watches];

  if (filters.searchQuery) {
    const q = filters.searchQuery.toLowerCase();
    result = result.filter(
      (w) =>
        w.brand.toLowerCase().includes(q) ||
        w.collection.toLowerCase().includes(q) ||
        w.model.toLowerCase().includes(q) ||
        w.reference.toLowerCase().includes(q) ||
        w.specs.movementName.toLowerCase().includes(q) ||
        w.specs.dialColor.toLowerCase().includes(q)
    );
  }

  if (filters.brands?.length) {
    result = result.filter((w) => filters.brands!.includes(w.brand));
  }
  if (filters.movementTypes?.length) {
    result = result.filter((w) =>
      filters.movementTypes!.includes(w.specs.movementType)
    );
  }
  if (filters.minPrice != null) {
    result = result.filter(
      (w) => w.price != null && w.price >= filters.minPrice!
    );
  }
  if (filters.maxPrice != null) {
    result = result.filter(
      (w) => w.price != null && w.price <= filters.maxPrice!
    );
  }
  if (filters.minDiameter != null) {
    result = result.filter(
      (w) => w.specs.caseDiameter >= filters.minDiameter!
    );
  }
  if (filters.maxDiameter != null) {
    result = result.filter(
      (w) => w.specs.caseDiameter <= filters.maxDiameter!
    );
  }
  if (filters.caseMaterials?.length) {
    result = result.filter((w) =>
      filters.caseMaterials!.includes(w.specs.caseMaterial)
    );
  }
  if (filters.crystalTypes?.length) {
    result = result.filter((w) =>
      filters.crystalTypes!.includes(w.specs.crystal)
    );
  }
  if (filters.strapTypes?.length) {
    result = result.filter((w) =>
      filters.strapTypes!.includes(w.specs.strapType)
    );
  }
  if (filters.waterResistanceMin != null) {
    result = result.filter(
      (w) => w.specs.waterResistance >= filters.waterResistanceMin!
    );
  }
  if (filters.hasChronograph === true) {
    result = result.filter((w) => w.specs.chronograph);
  }
  if (filters.hasGmt === true) {
    result = result.filter((w) => w.specs.gmtFunction);
  }
  if (filters.hasDate === true) {
    result = result.filter((w) => w.specs.dateDisplay);
  }

  return result;
}

// ─── Sorting ─────────────────────────────────────────────────

export function sortWatches(list: Watch[], sort: SortOption): Watch[] {
  const sorted = [...list];
  switch (sort) {
    case "name-asc":
      return sorted.sort((a, b) => a.model.localeCompare(b.model));
    case "name-desc":
      return sorted.sort((a, b) => b.model.localeCompare(a.model));
    case "price-asc":
      return sorted.sort((a, b) => (a.price ?? 0) - (b.price ?? 0));
    case "price-desc":
      return sorted.sort((a, b) => (b.price ?? 0) - (a.price ?? 0));
    case "diameter-asc":
      return sorted.sort(
        (a, b) => a.specs.caseDiameter - b.specs.caseDiameter
      );
    case "diameter-desc":
      return sorted.sort(
        (a, b) => b.specs.caseDiameter - a.specs.caseDiameter
      );
    case "power-reserve-desc":
      return sorted.sort(
        (a, b) => b.specs.powerReserve - a.specs.powerReserve
      );
    case "water-resistance-desc":
      return sorted.sort(
        (a, b) => b.specs.waterResistance - a.specs.waterResistance
      );
    default:
      return sorted;
  }
}

// ─── Format helpers ──────────────────────────────────────────

export function formatPrice(price: number | null): string {
  if (price == null) return "N/A";
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(price);
}

export function formatMovementType(type: string): string {
  const map: Record<string, string> = {
    automatic: "Automatic",
    manual: "Manual Wind",
    quartz: "Quartz",
  };
  return map[type] || type.charAt(0).toUpperCase() + type.slice(1);
}

export function formatMaterial(material: string): string {
  return material
    .split("-")
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");
}

export function formatWaterResistance(meters: number): string {
  const atm = Math.round(meters / 10);
  return `${meters}m (${atm} ATM)`;
}

export function formatFrequency(vph: number): string {
  const hz = vph / 3600;
  return `${vph.toLocaleString()} vph (${hz.toFixed(hz % 1 === 0 ? 0 : 1)} Hz)`;
}

export function formatDialColor(color: string): string {
  return color.charAt(0).toUpperCase() + color.slice(1);
}

// Count active filters for badge display
export function countActiveFilters(filters: Partial<WatchFilters>): number {
  let count = 0;
  if (filters.brands?.length) count += filters.brands.length;
  if (filters.movementTypes?.length) count += filters.movementTypes.length;
  if (filters.minPrice != null) count++;
  if (filters.maxPrice != null) count++;
  if (filters.minDiameter != null) count++;
  if (filters.maxDiameter != null) count++;
  if (filters.caseMaterials?.length) count += filters.caseMaterials.length;
  if (filters.crystalTypes?.length) count += filters.crystalTypes.length;
  if (filters.strapTypes?.length) count += filters.strapTypes.length;
  if (filters.waterResistanceMin != null) count++;
  if (filters.hasChronograph === true) count++;
  if (filters.hasGmt === true) count++;
  if (filters.hasDate === true) count++;
  return count;
}
