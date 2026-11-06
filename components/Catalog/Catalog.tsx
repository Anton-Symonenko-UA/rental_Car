"use client";

import { useState } from "react";
import Image from "next/image";
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
  const [filterVersion, setFilterVersion] = useState(0);

  function resetFilters() {
    setFilters({});
    setFilterVersion((version) => version + 1);
  }

  const {
    data,
    isPending,
    isError,
    isFetching,
    isFetchNextPageError,
    refetch,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useCars(filters);

  const cars = data?.pages.flatMap((page) => page.cars) ?? [];
  const showInitialError = isError && cars.length === 0;

  return (
    <main className={css.catalog}>
      <h1 className={css.visuallyHidden}>Car catalog</h1>

      <div className={css.filters}>
        <CatalogFilters key={filterVersion} brands={brands} prices={prices} onApply={setFilters} />
      </div>

      {isPending && (
        <>
          <div className={css.list} aria-hidden="true">
            {Array.from({ length: 12 }, (_, index) => (
              <div key={index} className={css.placeholderCard}>
                <div className={css.placeholderImage} />
                <div className={css.placeholderLine} />
                <div className={css.placeholderDetails} />
                <div className={css.placeholderButton} />
              </div>
            ))}
          </div>
          <div className={css.loadingOverlay}>
            <div className={css.loadingPanel} role="status">
              <Image src="/images/spinner.svg" width={72} height={72} className={css.spinner} alt="" />
              <h2>Loading cars...</h2>
              <p>Please wait while we fetch the best cars for you.</p>
            </div>
          </div>
        </>
      )}

      {showInitialError && (
        <div className={css.feedback}>
          <p className={css.error} role="alert">
            Could not load cars. Please try again.
          </p>

          <button
            className={css.retry}
            type="button"
            onClick={() => void refetch()}
            disabled={isFetching}
          >
            {isFetching ? "Loading..." : "Try again"}
          </button>
        </div>
      )}

      {!isPending && !isError && cars.length === 0 && (
        <div className={css.empty}>
          <div className={css.emptyImage}>
            <Image src="/images/no-cars.png" alt="" fill sizes="414px" />
          </div>
          <h2>No cars found</h2>
          <p>
            We couldn’t find any cars that match your current filters.
            Try changing your search criteria or reset the filters.
          </p>
          <button className={css.resetFilters} type="button" onClick={resetFilters}>
            Reset filters
          </button>
        </div>
      )}

      <ul className={css.list} aria-label="Available cars">
        {cars.map((car) => (
          <li key={car.id} className={css.item}>
            <CarCard car={car} />
          </li>
        ))}
      </ul>

      {isFetchNextPageError && cars.length > 0 && (
        <p className={css.paginationError} role="alert">
          Could not load more cars. Please try again.
        </p>
      )}

      {hasNextPage && cars.length > 0 && (
        <button
          className={css.loadMore}
          type="button"
          onClick={() => void fetchNextPage()}
          disabled={isFetching}
        >
          {isFetchingNextPage
            ? "Loading..."
            : isFetchNextPageError
              ? "Try again"
              : "Load more"}
        </button>
      )}
    </main>
  );
}
