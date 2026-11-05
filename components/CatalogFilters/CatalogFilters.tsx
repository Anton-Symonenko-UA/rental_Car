"use client";
import css from "./CatalogFilters.module.css";
import { useState, type SubmitEvent } from "react";
import type { CarFilters } from "@/types/car";

interface CatalogFiltersProps {
  brands: string[];
  prices: number[];
  onApply: (filters: CarFilters) => void;
}

export default function CatalogFilters({
  brands,
  prices,
  onApply,
}: CatalogFiltersProps) {
  const [brand, setBrand] = useState("");
  const [price, setPrice] = useState("");
  const [minMileage, setMinMileage] = useState("");
  const [maxMileage, setMaxMileage] = useState("");
  const [error, setError] = useState("");

  function handleSubmit(event: SubmitEvent<HTMLFormElement>) {
    event.preventDefault();

    const min = minMileage === "" ? undefined : Number(minMileage);
    const max = maxMileage === "" ? undefined : Number(maxMileage);

    if (min !== undefined && max !== undefined && min > max) {
      setError("Пробіг «від» не може перевищувати пробіг «до».");
      return;
    }

    setError("");

    onApply({
      brand: brand || undefined,
      price: price === "" ? undefined : Number(price),
      minMileage: min,
      maxMileage: max,
    });
  }

  function handleReset() {
    setBrand("");
    setPrice("");
    setMinMileage("");
    setMaxMileage("");
    setError("");
    onApply({});
  }

  return (
    <form className={css.form} onSubmit={handleSubmit}>
      <label className={css.field}>
        <span className={css.label}>Car brand</span>

        <select
          className={css.select}
          value={brand}
          onChange={(event) => setBrand(event.target.value)}
        >
          <option value="">All brands</option>

          {brands.map((item) => (
            <option key={item} value={item}>
              {item}
            </option>
          ))}
        </select>
      </label>

      <label className={css.field}>
        <span className={css.label}>Price / 1 hour</span>

        <select
          className={css.select}
          value={price}
          onChange={(event) => setPrice(event.target.value)}
        >
          <option value="">Any price</option>

          {prices.map((item) => (
            <option key={item} value={item}>
              ${item}
            </option>
          ))}
        </select>
      </label>

      <fieldset className={css.mileage}>
        <legend className={css.legend}>Car mileage / km</legend>

        <div className={css.range}>
          <label className={css.rangeField}>
            <span>From</span>

            <input
              className={css.input}
              type="number"
              min="0"
              step="1"
              value={minMileage}
              onChange={(event) => setMinMileage(event.target.value)}
            />
          </label>

          <label className={css.rangeField}>
            <span>To</span>

            <input
              className={css.input}
              type="number"
              min="0"
              step="1"
              value={maxMileage}
              onChange={(event) => setMaxMileage(event.target.value)}
            />
          </label>
        </div>
      </fieldset>

      <div className={css.actions}>
        <button className={`${css.button} ${css.search}`} type="submit">
          Search
        </button>

        <button
          className={`${css.button} ${css.reset}`}
          type="button"
          onClick={handleReset}
        >
          Reset
        </button>
      </div>

      {error && (
        <p className={css.error} role="alert">
          {error}
        </p>
      )}
    </form>
  );
}
