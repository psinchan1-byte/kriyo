export interface EngagementMetrics {
  views: number;
  likes: number;
  saves: number;
  searches: number;
  saveRatePercent: number;
}

export interface GeographicDemandPoint {
  region: string;
  state: string;
  demandIndex: number;
  trendingCrafts: string[];
  artisanCount?: number;
  growthRatePercent?: number;
}

export interface CraftHealthSummary {
  thriving: number;
  stable: number;
  vulnerable: number;
  endangered: number;
  revived: number;
}

export interface RevivalIntelligenceItem {
  id: string;
  craftName: string;
  region: string;
  endangermentLevel: "Critical" | "High" | "Moderate";
  activeMastersCount: number;
  revivalPlanStatus: string;
  interventionTimeline?: string;
  budgetAllocatedINR?: number;
}

export interface AIInsightSummary {
  id: string;
  category: "Pricing" | "Demand" | "Heritage" | "SupplyChain";
  title: string;
  summary: string;
  confidenceScore: number;
  generatedAt: string;
  keyDrivers?: string[];
  recommendedAction?: string;
}

export interface TrendItem {
  id: string;
  craftName: string;
  type: "rising" | "emerging" | "declining";
  metric: string;
  growth: string;
  category: string;
  region: string;
}

export interface ActivityItem {
  id: string;
  type: "artisan" | "demand" | "b2b" | "health" | "gi";
  title: string;
  description: string;
  timestamp: string;
  tag: string;
}

export interface SparklinePoint {
  date: string;
  value: number;
}

export interface DashboardMetrics {
  totalArtisans: number;
  artisansTrendPercent: number;
  totalCrafts: number;
  craftsTrendNew: number;
  totalProducts: number;
  productsTrendPercent: number;
  totalOrders: number;
  ordersTrendPercent: number;
  grossRevenue: number;
  revenueTrendPercent: number;
  activeBuyers: number;
  buyersTrendPercent: number;
  engagement: EngagementMetrics;
  engagementTrendPercent: number;
  craftsAtRisk: number;
  craftHealth: CraftHealthSummary;
  geographicDemand: GeographicDemandPoint[];
  aiInsights: AIInsightSummary[];
  revivalHighlights: RevivalIntelligenceItem[];
  trendRadar: TrendItem[];
  recentActivity: ActivityItem[];
  revenueSparkline: number[];
  artisanSparkline: number[];
}

