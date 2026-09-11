import { supabase } from './supabase/client';
import { DashboardMetrics } from "@/types/dashboard";
import { Craft, CraftFilterParams } from "@/types/craft";
import { Artisan, ArtisanFilterParams } from "@/types/artisan";
import { Product, ProductFilterParams } from "@/types/product";
import { SalesAnalytics, Order } from "@/types/sales";

import { mockDashboardMetrics } from "@/data/mock/dashboard";
import { mockSalesAnalytics, mockOrders } from "@/data/mock/sales";
import { mockCrafts } from "@/data/mock/crafts";
import { mockArtisans } from "@/data/mock/artisans";
import { mockProducts } from "@/data/mock/products";
import { mockIntelligence } from "@/data/mock/intelligence";

/**
 * Base API Layer for KRIYO Intelligence Platform.
 * Uses local mock dataset as fallback since Supabase tables are unavailable.
 */

export async function fetchDashboardMetrics(): Promise<DashboardMetrics> {
  const uniqueBuyers = 12450;
  return {
    ...mockDashboardMetrics,
    totalArtisans: mockArtisans.length,
    totalCrafts: mockCrafts.length,
    totalProducts: mockProducts.length,
    totalOrders: mockSalesAnalytics.totalOrders,
    grossRevenue: mockSalesAnalytics.grossRevenue,
    activeBuyers: uniqueBuyers,
    craftsAtRisk: mockCrafts.filter((c: any) => c.healthStatus === 'Endangered').length,
  };
}

export async function fetchCrafts(filters?: CraftFilterParams): Promise<Craft[]> {
  let result = [...mockCrafts];

  if (filters?.category && filters.category !== "All Categories") {
    result = result.filter(c => c.category === filters.category);
  }
  if (filters?.healthStatus) {
    result = result.filter(c => c.healthStatus === filters.healthStatus);
  }
  if (filters?.giTaggedOnly) {
    result = result.filter(c => c.heritage.giTagged);
  }
  if (filters?.search) {
    const q = filters.search.toLowerCase();
    result = result.filter(
      (c) =>
        c.name.toLowerCase().includes(q) ||
        c.region.toLowerCase().includes(q) ||
        c.state.toLowerCase().includes(q)
    );
  }
  return result as Craft[];
}

export async function fetchArtisans(filters?: ArtisanFilterParams): Promise<Artisan[]> {
  let result = [...mockArtisans];

  if (filters?.craftId) {
    result = result.filter(a => a.primaryCraftId === filters.craftId);
  }
  if (filters?.verifiedOnly) {
    result = result.filter(a => a.verified);
  }
  if (filters?.search) {
    const q = filters.search.toLowerCase();
    result = result.filter(
      (a) =>
        a.name.toLowerCase().includes(q) ||
        a.primaryCraftName.toLowerCase().includes(q) ||
        a.location.state.toLowerCase().includes(q)
    );
  }
  return result as Artisan[];
}

export async function fetchProducts(filters?: ProductFilterParams): Promise<Product[]> {
  let result = [...mockProducts];

  if (filters?.craftId) {
    result = result.filter(p => p.craftId === filters.craftId);
  }
  if (filters?.artisanId) {
    result = result.filter(p => p.artisanId === filters.artisanId);
  }
  if (filters?.search) {
    const q = filters.search.toLowerCase();
    result = result.filter(
      (p) =>
        p.title.toLowerCase().includes(q) ||
        p.craftName.toLowerCase().includes(q) ||
        p.artisanName.toLowerCase().includes(q)
    );
  }
  return result as Product[];
}

export async function fetchSalesAnalytics(): Promise<{
  analytics: SalesAnalytics;
  recentOrders: Order[];
}> {
  return {
    analytics: mockSalesAnalytics,
    recentOrders: mockOrders as any,
  };
}

export async function fetchIntelligence() {
  return mockIntelligence;
}
