"use client";

import { useInfiniteQuery } from "@tanstack/react-query";
import { getCars } from "@/lib/api/cars";
import type { CarFilters } from "@/types/car";

export function useCars(filters: CarFilters = {}) {
  return useInfiniteQuery({
    queryKey: ["cars", filters],

    initialPageParam: 1,

    queryFn: ({ pageParam, signal }) =>
      getCars(
        {
          ...filters,
          page: pageParam,
          perPage: 12,
        },
        signal,
      ),

    getNextPageParam: (lastPage) =>
      lastPage.page < lastPage.totalPages ? lastPage.page + 1 : undefined,
  });
}
