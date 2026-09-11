"use client";

import { useState, useEffect } from "react";
import { DashboardMetrics } from "@/types/dashboard";
import { fetchDashboardMetrics } from "@/lib/api";

export function useDashboard() {
  const [data, setData] = useState<DashboardMetrics | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const refresh = async () => {
    setLoading(true);
    try {
      const res = await fetchDashboardMetrics();
      setData(res);
      setError(null);
    } catch (err: any) {
      setError(err.message || "Failed to fetch dashboard metrics");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    let isMounted = true;
    setLoading(true);

    fetchDashboardMetrics()
      .then((res) => {
        if (isMounted) {
          setData(res);
          setLoading(false);
        }
      })
      .catch((err) => {
        if (isMounted) {
          setError(err.message || "Failed to fetch dashboard metrics");
          setLoading(false);
        }
      });

    return () => {
      isMounted = false;
    };
  }, []);

  return { data, loading, error, refresh };
}
