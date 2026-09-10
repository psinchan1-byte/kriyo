/**
 * High-Precision India Geographic Boundary Dataset (GeoJSON SVG Projection)
 * Bounding Box: 68.0°E to 97.5°E, 6.5°N to 37.5°N
 * Projected ViewBox: 0 0 600 650
 */

export interface MapCoordinates {
  lng: number;
  lat: number;
}

export interface RegionClusterData {
  id: string;
  name: string;
  states: string;
  artisanCount: number;
  demandIndex: number;
  topCrafts: string[];
  status: "Thriving" | "Stable" | "Vulnerable" | "Endangered";
  coordinates: MapCoordinates;
  growthPercent: number;
}

export const REGION_CLUSTERS_DATA: RegionClusterData[] = [
  {
    id: "north",
    name: "Northern Himalayan & Gangetic Belt",
    states: "Jammu & Kashmir, Himachal, Punjab, UP",
    artisanCount: 2450,
    demandIndex: 89,
    topCrafts: ["Pashmina Weaving", "Varanasi Silk Brocade", "Walnut Carving"],
    status: "Stable",
    coordinates: { lng: 77.5, lat: 30.5 },
    growthPercent: 19.4,
  },
  {
    id: "west",
    name: "Western Desert & Textile Corridors",
    states: "Rajasthan, Gujarat",
    artisanCount: 3120,
    demandIndex: 92,
    topCrafts: ["Blue Pottery", "Ajrakh Block Print", "Rogan Art"],
    status: "Thriving",
    coordinates: { lng: 73.5, lat: 25.5 },
    growthPercent: 22.8,
  },
  {
    id: "central",
    name: "Central Tribal Metallurgy Belt",
    states: "Chhattisgarh, Madhya Pradesh",
    artisanCount: 1182,
    demandIndex: 81,
    topCrafts: ["Bastar Dokra Casting", "Gond Folk Murals", "Chanderi Weaving"],
    status: "Vulnerable",
    coordinates: { lng: 79.0, lat: 23.5 },
    growthPercent: 27.1,
  },
  {
    id: "east",
    name: "Eastern Riverine Folk Painting Corridor",
    states: "Bihar, Odisha, West Bengal",
    artisanCount: 3840,
    demandIndex: 96,
    topCrafts: ["Madhubani Folk Art", "Pattachitra Scroll", "Sikki Grass Craft"],
    status: "Thriving",
    coordinates: { lng: 86.0, lat: 24.5 },
    growthPercent: 34.2,
  },
  {
    id: "northeast",
    name: "North-Eastern Cane & Indigenous Handloom",
    states: "Assam, Nagaland, Manipur, Meghalaya",
    artisanCount: 860,
    demandIndex: 78,
    topCrafts: ["Muga Silk Weaving", "Bamboo & Cane Craft", "Naga Tribal Weaves"],
    status: "Stable",
    coordinates: { lng: 93.0, lat: 26.0 },
    growthPercent: 15.2,
  },
  {
    id: "south",
    name: "Southern Peninsula Wood & Filigree Corridor",
    states: "Karnataka, Tamil Nadu, Andhra, Kerala",
    artisanCount: 1890,
    demandIndex: 85,
    topCrafts: ["Channapatna Eco Lacquerware", "Toda Embroidery", "Thanjavur Art"],
    status: "Vulnerable",
    coordinates: { lng: 78.0, lat: 13.5 },
    growthPercent: 16.5,
  },
];

/**
 * Island Territory Coordinates (Actual Longitude/Latitude)
 */
export const ANDAMAN_NICOBAR_ISLANDS = [
  { lng: 92.5, lat: 11.5, r: 4 },
  { lng: 92.8, lat: 10.5, r: 3 },
  { lng: 93.0, lat: 9.5, r: 3.5 },
  { lng: 93.5, lat: 8.5, r: 4 },
  { lng: 93.8, lat: 7.5, r: 3 },
];

export const LAKSHADWEEP_ISLANDS = [
  { lng: 72.5, lat: 11.0, r: 3 },
  { lng: 72.8, lat: 10.5, r: 2.5 },
  { lng: 73.0, lat: 10.0, r: 3 },
  { lng: 73.2, lat: 9.5, r: 2.5 },
];
