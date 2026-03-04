// ─── Canonical spec types ────────────────────────────────────
// The normalization layer. Every brand's proprietary terminology
// gets mapped to these canonical enums.

export type MovementType = "automatic" | "manual" | "quartz";
export type CaseMaterial =
  | "stainless-steel"
  | "titanium"
  | "gold"
  | "rose-gold"
  | "ceramic"
  | "bronze"
  | "carbon"
  | "plastic";
export type CrystalType = "sapphire" | "mineral" | "acrylic" | "hardlex";
export type StrapType = "bracelet" | "leather" | "rubber" | "nato" | "fabric";
export type CaseBack = "solid" | "exhibition" | "screw-down";

// ─── Watch data model ────────────────────────────────────────

export interface Watch {
  id: string;
  brand: string;
  collection: string;
  model: string;
  reference: string;
  referenceUrl: string;
  imageUrl: string;
  price: number | null;
  specs: WatchSpecs;
}

export interface WatchSpecs {
  movementType: MovementType;
  movementName: string;
  powerReserve: number; // hours
  frequency: number; // vph
  jewels: number | null;
  hacking: boolean;
  handWinding: boolean;

  caseDiameter: number; // mm
  caseThickness: number; // mm
  caseMaterial: CaseMaterial;
  caseBack: CaseBack;

  crystal: CrystalType;
  waterResistance: number; // meters (normalized)

  dialColor: string;
  luminous: boolean;
  dateDisplay: boolean;
  dayDisplay: boolean;
  chronograph: boolean;
  gmtFunction: boolean;

  strapType: StrapType;
  strapMaterial: string;
  lugWidth: number; // mm
}

// ─── Filters ─────────────────────────────────────────────────

export interface WatchFilters {
  brands: string[];
  movementTypes: MovementType[];
  minPrice: number | null;
  maxPrice: number | null;
  minDiameter: number | null;
  maxDiameter: number | null;
  caseMaterials: CaseMaterial[];
  crystalTypes: CrystalType[];
  strapTypes: StrapType[];
  waterResistanceMin: number | null;
  hasChronograph: boolean | null;
  hasGmt: boolean | null;
  hasDate: boolean | null;
  searchQuery: string;
}

export const DEFAULT_FILTERS: WatchFilters = {
  brands: [],
  movementTypes: [],
  minPrice: null,
  maxPrice: null,
  minDiameter: null,
  maxDiameter: null,
  caseMaterials: [],
  crystalTypes: [],
  strapTypes: [],
  waterResistanceMin: null,
  hasChronograph: null,
  hasGmt: null,
  hasDate: null,
  searchQuery: "",
};

// ─── Sort ────────────────────────────────────────────────────

export type SortOption =
  | "name-asc"
  | "name-desc"
  | "price-asc"
  | "price-desc"
  | "diameter-asc"
  | "diameter-desc"
  | "power-reserve-desc"
  | "water-resistance-desc";

// ─── Brand metadata ──────────────────────────────────────────

export interface BrandInfo {
  slug: string;
  name: string;
  country: string;
  founded: number;
  parent: string;
  description: string;
  logo?: string;
}
