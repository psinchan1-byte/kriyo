export interface ProductEngagement {
  views: number;
  likes: number;
  saves: number;
}

export interface ProductProvenance {
  originState: string;
  handcraftingDurationDays: number;
  rawMaterials: string[];
}

export interface Product {
  id: string;
  title: string;
  artisanId: string;
  artisanName: string;
  craftId: string;
  craftName: string;
  category: string;
  price: number;
  currency: string;
  stock: number;
  provenance: ProductProvenance;
  engagement: ProductEngagement;
  createdAt: string;
}

export interface ProductFilterParams {
  craftId?: string;
  artisanId?: string;
  category?: string;
  inStockOnly?: boolean;
  search?: string;
}
