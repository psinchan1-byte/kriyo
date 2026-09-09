export type OrderStatus = "Pending" | "Processing" | "Shipped" | "Delivered" | "Cancelled";

export interface OrderItem {
  productId: string;
  productTitle: string;
  artisanId: string;
  artisanName: string;
  quantity: number;
  unitPrice: number;
}

export interface Order {
  id: string;
  orderNumber: string;
  customerName: string;
  customerRegion: string;
  orderDate: string;
  status: OrderStatus;
  items: OrderItem[];
  totalAmount: number;
}

export interface SalesAnalytics {
  grossRevenue: number;
  totalOrders: number;
  averageOrderValue: number;
  artisanDirectPayout: number;
  monthlyRevenueSeries: {
    month: string;
    revenue: number;
    orderCount: number;
  }[];
}
