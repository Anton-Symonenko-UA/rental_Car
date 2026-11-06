import Link from "next/link";
import css from "./not-found.module.css";

export default function CarNotFound() {
  return (
    <main className={css.page}>
      <div className={css.content}>
        <p className={css.code}>404</p>

        <h1 className={css.title}>Car not found</h1>

        <p className={css.description}>
          This car is no longer available or the link is incorrect. Explore our
          catalog to find another car.
        </p>

        <Link className={css.button} href="/catalog">
          View Catalog
        </Link>
      </div>
    </main>
  );
}
