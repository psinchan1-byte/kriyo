export const PLATFORM_NAME = "KRIYO";
export const PLATFORM_TAGLINE = "Living Heritage & Craft Intelligence Engine";

export interface NavItem {
  name: string;
  href: string;
  description: string;
  badge?: string;
}

export interface NavGroup {
  title: string;
  items: NavItem[];
}

export const NAVIGATION_GROUPS: NavGroup[] = [
  {
    title: "OVERVIEW",
    items: [
      { name: "Overview", href: "/", description: "Executive pulse & ecosystem telemetry" },
    ],
  },
  {
    title: "INTELLIGENCE",
    items: [
      { name: "Craft Intelligence", href: "/crafts", description: "Living crafts, GI taxonomy & health" },
      { name: "Artisan Intelligence", href: "/artisans", description: "Master guild rosters & demographics" },
      { name: "Product Analytics", href: "/products", description: "Item provenance, materials & pricing" },
      { name: "Sales & Commerce", href: "/sales", description: "Fair-trade volumes & direct payout" },
      { name: "Engagement", href: "/engagement", description: "Buyer interest, saves & search queries" },
      { name: "Geographic Insights", href: "/geography", description: "Cluster concentration & regional index" },
    ],
  },
  {
    title: "HERITAGE",
    items: [
      { name: "Heritage Intelligence", href: "/heritage", description: "GI documentation & lineage archive" },
    ],
  },
  {
    title: "AI",
    items: [
      { name: "AI Intelligence", href: "/ai", description: "Market signals & pricing elasticity", badge: "Copilot" },
    ],
  },
  {
    title: "REVIVAL",
    items: [
      { name: "Risk & Revival", href: "/revival", description: "Endangered craft preservation protocol", badge: "Watch" },
    ],
  },
];

// Flat navigation items for compatibility
export const NAVIGATION_ITEMS: NavItem[] = NAVIGATION_GROUPS.flatMap((group) => group.items);

export const CRAFT_CATEGORIES = [
  "All Categories",
  "Painting",
  "Metalwork",
  "Textiles",
  "Woodwork & Lacquerware",
  "Pottery & Ceramics",
  "Eco-Fibre & Cane",
  "Jewelry & Filigree",
] as const;

export const CRAFT_HEALTH_STATUSES = [
  "Thriving",
  "Stable",
  "Vulnerable",
  "Endangered",
  "Revived",
] as const;

