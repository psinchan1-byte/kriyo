export type CraftHealthStatus = "Thriving" | "Stable" | "Vulnerable" | "Endangered" | "Revived";

export interface HeritageDocumentation {
  giTagged: boolean;
  giRegistrationNumber?: string;
  giYear?: number;
  historicalOrigin: string;
  traditionalMaterials: string[];
  endangeredReason?: string;
}

export interface Craft {
  id: string;
  name: string;
  nativeName?: string;
  category: string;
  region: string;
  state: string;
  activeArtisansCount: number;
  healthStatus: CraftHealthStatus;
  heritage: HeritageDocumentation;
  description: string;
  metrics: {
    views: number;
    saves: number;
    demandGrowthPercent: number;
  };
}

export interface CraftFilterParams {
  category?: string;
  state?: string;
  healthStatus?: CraftHealthStatus;
  giTaggedOnly?: boolean;
  search?: string;
}
