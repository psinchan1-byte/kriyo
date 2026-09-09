export interface ArtisanLocation {
  village?: string;
  district: string;
  state: string;
  pinCode?: string;
}

export interface Artisan {
  id: string;
  name: string;
  primaryCraftId: string;
  primaryCraftName: string;
  location: ArtisanLocation;
  yearsOfExperience: number;
  nationalAwardee: boolean;
  awardTitle?: string;
  verified: boolean;
  phone?: string;
  email?: string;
  bio?: string;
  metrics: {
    totalProducts: number;
    completedOrders: number;
    rating: number;
    profileViews: number;
  };
  joinedDate: string;
}

export interface ArtisanFilterParams {
  craftId?: string;
  state?: string;
  verifiedOnly?: boolean;
  nationalAwardeeOnly?: boolean;
  search?: string;
}
