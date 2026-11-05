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
    <section className={css.catalog}>
      <h1 className={css.title}>Каталог автомобілів</h1>

      <CatalogFilters brands={brands} prices={prices} onApply={setFilters} />

      {isPending && <p className={css.message}>Завантаження автомобілів...</p>}

      {isError && (
        <p className={css.error} role="alert">
          {error.message}
        </p>
      )}

      {!isPending && !isError && cars.length === 0 && (
        <p className={css.message}>Автомобілів не знайдено.</p>
      )}

      <ul className={css.list}>
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
          {isFetchingNextPage ? "Завантаження..." : "Load More"}
        </button>
      )}
    </section>
  );
}
