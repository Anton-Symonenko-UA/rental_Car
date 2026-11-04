"use client";
import css from "./Catalog.module.css";
import { useCars } from "@/hooks/useCars";
import type { CarFilters } from "@/types/car";
import CarCard from "@/components/CarCard/CarCard";

export default function Catalog() {
  const filters: CarFilters = {};

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

  if (isPending) {
    return <p>Завантаження автомобілів...</p>;
  }

  if (isError && !data) {
    return <p role="alert">{error.message}</p>;
  }

  return (
    <section className={css.catalog}>
      <h1 className={css.title}>Каталог автомобілів</h1>

      {cars.length === 0 && (
        <p className={css.message}>Автомобілів не знайдено.</p>
      )}

      <ul className={css.list}>
        {cars.map((car) => (
          <li key={car.id} className={css.item}>
            <CarCard car={car} />
          </li>
        ))}
      </ul>

      {isError && data && (
        <p className={css.error} role="alert">
          Не вдалося оновити список: {error.message}
        </p>
      )}

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
