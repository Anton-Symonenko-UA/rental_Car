"use client";

import { useState } from "react";
import css from "./Catalog.module.css";
import { useCars } from "@/hooks/useCars";
import type { CarFilters } from "@/types/car";
import CarCard from "@/components/CarCard/CarCard";
import CatalogFilters from "@/components/CatalogFilters/CatalogFilters";

interface CatalogProps {
  brands: string[];
  prices: number[];
}

export default function Catalog({ brands, prices }: CatalogProps) {
  const [filters, setFilters] = useState<CarFilters>({});

  const {
    data,
    isPending,
    isError,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useCars(filters);

  const cars = data?.pages.flatMap((page) => page.cars) ?? [];

  return (
    <main className={css.catalog}>
      <h1 className={css.visuallyHidden}>Car catalog</h1>

      <div className={css.filters}>
        <CatalogFilters brands={brands} prices={prices} onApply={setFilters} />
      </div>

      {isPending && (
        <p className={css.message} role="status">
          Loading cars...
        </p>
      )}

      {isError && (
        <p className={css.error} role="alert">
          {error.message}
        </p>
      )}

      {!isPending && !isError && cars.length === 0 && (
        <p className={css.message}>No cars found. Try changing your filters.</p>
      )}

      <ul className={css.list} aria-label="Available cars">
        {cars.map((car) => (
          <li key={car.id} className={css.item}>
            <CarCard car={car} />
          </li>
        ))}
      </ul>

      {hasNextPage && (
        <button
          className={css.loadMore}
          type="button"
          onClick={() => void fetchNextPage()}
          disabled={isFetchingNextPage}
        >
          {isFetchingNextPage ? "Loading..." : "Load More"}
        </button>
      )}
    </main>
  );
}
