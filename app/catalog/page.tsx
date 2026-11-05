import { cacheLife } from "next/cache";
import Catalog from "@/components/Catalog/Catalog";
import { getCarFilterOptions } from "@/lib/api/cars";

export default async function CatalogPage() {
  "use cache";

  cacheLife("hours");

  const options = await getCarFilterOptions();

  const prices: number[] = [];

  for (let price = options.price.min; price <= options.price.max; price += 10) {
    prices.push(price);
  }

  return <Catalog brands={options.brands} prices={prices} />;
}
