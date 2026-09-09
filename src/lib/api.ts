import { mockDashboardMetrics } from "@/data/mock/dashboard";
import { mockCrafts } from "@/data/mock/crafts";
import { mockArtisans } from "@/data/mock/artisans";
import { mockProducts } from "@/data/mock/products";
import { mockSalesAnalytics, mockOrders } from "@/data/mock/sales";
import { DashboardMetrics } from "@/types/dashboard";
import { Craft, CraftFilterParams } from "@/types/craft";
import { Artisan, ArtisanFilterParams } from "@/types/artisan";
import { Product, ProductFilterParams } from "@/types/product";
import { SalesAnalytics, Order } from "@/types/sales";

/**
 * Base API Layer for KAARIGAR SETU Intelligence Web.
 * Currently backed by strongly typed mock datasets.
 * Designed for straightforward transition to backend REST/GraphQL endpoints.
 */

export async function fetchDashboardMetrics(): Promise<DashboardMetrics> {
  // Simulated asynchronous network latency
  return new Promise((resolve) => {
    setTimeout(() => resolve(mockDashboardMetrics), 50);
  });
}

export async function fetchCrafts(filters?: CraftFilterParams): Promise<Craft[]> {
  return new Promise((resolve) => {
    let result = [...mockCrafts];
    if (filters?.category && filters.category !== "All Categories") {
      result = result.filter((c) => c.category === filters.category);
    }
    if (filters?.healthStatus) {
      result = result.filter((c) => c.healthStatus === filters.healthStatus);
    }
    if (filters?.giTaggedOnly) {
      result = result.filter((c) => c.heritage.giTagged);
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
    resolve(result);
  });
}

export async function fetchArtisans(filters?: ArtisanFilterParams): Promise<Artisan[]> {
  return new Promise((resolve) => {
    let result = [...mockArtisans];
    if (filters?.craftId) {
      result = result.filter((a) => a.primaryCraftId === filters.craftId);
    }
    if (filters?.verifiedOnly) {
      result = result.filter((a) => a.verified);
    }
    if (filters?.nationalAwardeeOnly) {
      result = result.filter((a) => a.nationalAwardee);
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
    resolve(result);
  });
}

export async function fetchProducts(filters?: ProductFilterParams): Promise<Product[]> {
  return new Promise((resolve) => {
    let result = [...mockProducts];
    if (filters?.craftId) {
      result = result.filter((p) => p.craftId === filters.craftId);
    }
    if (filters?.artisanId) {
      result = result.filter((p) => p.artisanId === filters.artisanId);
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
    resolve(result);
  });
}

export async function fetchSalesAnalytics(): Promise<{
  analytics: SalesAnalytics;
  recentOrders: Order[];
}> {
  return new Promise((resolve) => {
    resolve({
      analytics: mockSalesAnalytics,
      recentOrders: mockOrders,
    });
  });
}
