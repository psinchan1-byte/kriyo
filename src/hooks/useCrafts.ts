"use client";

import { useState, useEffect } from "react";
import { Craft, CraftFilterParams } from "@/types/craft";
import { fetchCrafts } from "@/lib/api";

export function useCrafts(initialFilters?: CraftFilterParams) {
  const [crafts, setCrafts] = useState<Craft[]>([]);
  const [filters, setFilters] = useState<CraftFilterParams>(initialFilters || {});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;
    setLoading(true);

    fetchCrafts(filters)
      .then((res) => {
        if (isMounted) {
          setCrafts(res);
          setLoading(false);
        }
      })
      .catch((err) => {
        if (isMounted) {
          setError(err.message || "Failed to fetch crafts");
          setLoading(false);
        }
      });

    return () => {
      isMounted = false;
    };
  }, [filters]);

  return { crafts, filters, setFilters, loading, error };
}
