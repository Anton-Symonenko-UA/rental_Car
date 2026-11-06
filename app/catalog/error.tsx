"use client";

import Link from "next/link";
import css from "./error.module.css";

interface CatalogErrorProps {
  error: unknown;
  retry: () => void;
}

export default function CatalogError({ retry }: CatalogErrorProps) {
  return (
    <main className={css.page}>
      <div className={css.content}>
        <h1 className={css.title}>Something went wrong</h1>

        <p className={css.description}>
          We couldn’t load this page. Please try again.
        </p>

        <div className={css.actions}>
          <button className={css.button} type="button" onClick={() => retry()}>
            Try again
          </button>

          <Link className={css.link} href="/">
            Back to home
          </Link>
        </div>
      </div>
    </main>
  );
}
