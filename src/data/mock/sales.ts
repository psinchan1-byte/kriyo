import { Order, SalesAnalytics } from "@/types/sales";

export const mockSalesAnalytics: SalesAnalytics = {
  grossRevenue: 18420000,
  totalOrders: 3480,
  averageOrderValue: 5293,
  artisanDirectPayout: 14736000,
  monthlyRevenueSeries: [
    { month: "Jan", revenue: 840000, orderCount: 420 },
    { month: "Feb", revenue: 980000, orderCount: 510 },
    { month: "Mar", revenue: 1250000, orderCount: 680 },
    { month: "Apr", revenue: 1100000, orderCount: 590 },
    { month: "May", revenue: 1480000, orderCount: 740 },
    { month: "Jun", revenue: 1840000, orderCount: 920 },
  ],
};

export const mockOrders: Order[] = [
  {
    id: "ord-1",
    orderNumber: "KS-ORD-2026-001",
    customerName: "Aarav Sharma",
    customerRegion: "Bengaluru, Karnataka",
    orderDate: "2026-09-07T14:30:00Z",
    status: "Delivered",
    items: [
      {
        productId: "prod-1",
        productTitle: "Tree of Life Mithila Folk Canvas",
        artisanId: "art-1",
        artisanName: "Shanti Devi Jha",
        quantity: 1,
        unitPrice: 8500,
      },
    ],
    totalAmount: 8500,
  },
  {
    id: "ord-2",
    orderNumber: "KS-ORD-2026-002",
    customerName: "Meera Nair",
    customerRegion: "Mumbai, Maharashtra",
    orderDate: "2026-09-08T11:15:00Z",
    status: "Processing",
    items: [
      {
        productId: "prod-3",
        productTitle: "Hand-Spun Pure Pashmina Shawl (Sozni Needlework)",
        artisanId: "art-3",
        artisanName: "Syed Ghulam Rasool",
        quantity: 1,
        unitPrice: 34000,
      },
    ],
    totalAmount: 34000,
  },
];
