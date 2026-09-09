"use client";

import { useState, useEffect } from "react";
import { SalesAnalytics, Order } from "@/types/sales";
import { fetchSalesAnalytics } from "@/lib/api";

export function useAnalytics() {
  const [analytics, setAnalytics] = useState<SalesAnalytics | null>(null);
  const [recentOrders, setRecentOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;
    setLoading(true);

    fetchSalesAnalytics()
      .then((res) => {
        if (isMounted) {
          setAnalytics(res.analytics);
          setRecentOrders(res.recentOrders);
          setLoading(false);
        }
      })
      .catch((err) => {
        if (isMounted) {
          setError(err.message || "Failed to fetch analytics");
          setLoading(false);
        }
      });

    return () => {
      isMounted = false;
    };
  }, []);

  return { analytics, recentOrders, loading, error };
}
