"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import css from "./Header.module.css";

export default function Header() {
  const pathname = usePathname();
  const isHome = pathname === "/";
  const isCatalog = pathname === "/catalog" || pathname.startsWith("/catalog/");

  return (
    <header className={css.header}>
      <div className={css.container}>
        <Link href="/" className={css.logo} aria-label="RentalCar home">
          Rental<span className={css.logoAccent}>Car</span>
        </Link>

        <nav aria-label="Main navigation">
          <ul className={css.navList}>
            <li>
              <Link
                href="/"
                className={`${css.navLink} ${isHome ? css.active : ""}`}
                aria-current={isHome ? "page" : undefined}
              >
                Home
              </Link>
            </li>

            <li>
              <Link
                href="/catalog"
                className={`${css.navLink} ${isCatalog ? css.active : ""}`}
                aria-current={
                  pathname === "/catalog"
                    ? "page"
                    : isCatalog
                      ? "location"
                      : undefined
                }
              >
                Catalog
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}
