import { BrandInfo, SortOption, MovementType, CrystalType, StrapType } from "./types";

export const BRANDS: Record<string, BrandInfo> = {
  Hamilton: {
    slug: "hamilton",
    name: "Hamilton",
    country: "USA / Switzerland",
    founded: 1892,
    parent: "Swatch Group",
    logo: "/logos/hamilton.svg",
    description:
      "Born in Lancaster, Pennsylvania and now based in Bienne, Switzerland, Hamilton bridges American spirit with Swiss precision. Known for military heritage and aviation watches, the brand offers exceptional value with in-house-grade movements at accessible prices.",
  },
  Tissot: {
    slug: "tissot",
    name: "Tissot",
    country: "Switzerland",
    founded: 1853,
    parent: "Swatch Group",
    logo: "/logos/tissot.png",
    description:
      "One of the founding members of the Swatch Group, Tissot has been crafting watches in Le Locle since 1853. Positioned as the gateway to Swiss watchmaking, Tissot delivers Powermatic 80 movements with silicon hairsprings at remarkable price points.",
  },
  Seiko: {
    slug: "seiko",
    name: "Seiko",
    country: "Japan",
    founded: 1881,
    parent: "Seiko Group",
    logo: "/logos/seiko.svg",
    description:
      "A vertically integrated Japanese manufacture that produces everything from movements to hairsprings in-house. Seiko's range spans from the affordable 5 Sports line to the Grand Seiko luxury tier, with legendary reliability across all price points.",
  },
  Orient: {
    slug: "orient",
    name: "Orient",
    country: "Japan",
    founded: 1950,
    parent: "Seiko Epson (Seiko Group)",
    logo: "/logos/orient.svg",
    description:
      "Orient is one of the few watch brands that designs and manufactures its own mechanical movements in-house. A subsidiary of Seiko Epson, Orient is renowned for delivering extraordinary value — offering robust in-house automatic calibers, sapphire crystals, and solid finishing at prices that undercut most Swiss competitors.",
  },
  Citizen: {
    slug: "citizen",
    name: "Citizen",
    country: "Japan",
    founded: 1918,
    parent: "Citizen Watch Group",
    logo: "/logos/citizen.svg",
    description:
      "Citizen is a Japanese watchmaking powerhouse known for its pioneering Eco-Drive solar technology. As the parent company of Bulova, Frederique Constant, and movement maker Miyota, Citizen spans from affordable everyday timepieces to the ultra-precise Chronomaster line. Their commitment to innovation includes the world's thinnest light-powered movement and Super Titanium cases.",
  },
};

export const SORT_OPTIONS: { value: SortOption; label: string }[] = [
  { value: "name-asc", label: "Name (A-Z)" },
  { value: "name-desc", label: "Name (Z-A)" },
  { value: "price-asc", label: "Price (Low to High)" },
  { value: "price-desc", label: "Price (High to Low)" },
  { value: "diameter-asc", label: "Size (Smallest)" },
  { value: "diameter-desc", label: "Size (Largest)" },
  { value: "power-reserve-desc", label: "Power Reserve (Longest)" },
  { value: "water-resistance-desc", label: "Water Resistance (Highest)" },
];

export const MOVEMENT_TYPES: { value: MovementType; label: string }[] = [
  { value: "automatic", label: "Automatic" },
  { value: "manual", label: "Manual Wind" },
  { value: "quartz", label: "Quartz" },
];

export const CRYSTAL_TYPES: { value: CrystalType; label: string }[] = [
  { value: "sapphire", label: "Sapphire" },
  { value: "mineral", label: "Mineral" },
  { value: "hardlex", label: "Hardlex" },
  { value: "acrylic", label: "Acrylic" },
];

export const STRAP_TYPES: { value: StrapType; label: string }[] = [
  { value: "bracelet", label: "Bracelet" },
  { value: "leather", label: "Leather" },
  { value: "rubber", label: "Rubber" },
  { value: "nato", label: "NATO" },
  { value: "fabric", label: "Fabric" },
];

export const WATER_RESISTANCE_OPTIONS = [
  { value: 50, label: "50m+" },
  { value: 100, label: "100m+" },
  { value: 200, label: "200m (Diver)" },
  { value: 300, label: "300m+" },
];

export const PRICE_PRESETS = [
  { label: "Under $500", min: null, max: 500 },
  { label: "$500 - $1,000", min: 500, max: 1000 },
  { label: "$1,000 - $2,000", min: 1000, max: 2000 },
  { label: "Over $2,000", min: 2000, max: null },
];
