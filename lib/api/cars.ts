import type { CarFilters, CarsResponse } from "@/types/car";

const BASE_URL = "https://car-rental-api.goit.study";

interface GetCarsParams extends CarFilters {
  page?: number;
  perPage?: number;
}

export async function getCars(
  {
    brand,
    price,
    minMileage,
    maxMileage,
    page = 1,
    perPage = 12,
  }: GetCarsParams = {},
  signal?: AbortSignal,
): Promise<CarsResponse> {
  const params = new URLSearchParams({
    page: String(page),
    perPage: String(perPage),
  });

  if (brand) {
    params.set("brand", brand);
  }
  if (price !== undefined) {
    params.set("price", String(price));
  }

  if (minMileage !== undefined) {
    params.set("minMileage", String(minMileage));
  }

  if (maxMileage !== undefined) {
    params.set("maxMileage", String(maxMileage));
  }

  const response = await fetch(`${BASE_URL}/cars`, {
    signal,
  });
  if (!response.ok) {
    throw new Error(`Не вдалося завантажити автомобілі: ${response.status}`);
  }
  const data: CarsResponse = await response.json();
  return data;
}
