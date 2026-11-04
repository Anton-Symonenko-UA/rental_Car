"use client";

import { useCars } from "@/hooks/useCars";
import type { CarFilters } from "@/types/car";

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
    <section>
      <h1>Каталог автомобілів</h1>

      {cars.length === 0 && <p>Автомобілів не знайдено.</p>}

      <ul>
        {cars.map((car) => (
          <li key={car.id}>
            {car.brand} {car.model} — ${car.rentalPrice}
          </li>
        ))}
      </ul>

      {isError && data && (
        <p role="alert">Не вдалося оновити список: {error.message}</p>
      )}

      {hasNextPage && (
        <button
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
