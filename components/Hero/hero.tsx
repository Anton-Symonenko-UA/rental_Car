import Link from "next/link";
import Image from "next/image";
import css from "./hero.module.css";

export default function Hero() {
  return (
    <section className={css.hero}>
      <Image
        className={css.background}
        src="/images/hero-background.webp"
        alt=""
        fill
        sizes="100vw"
        preload
      />
      <h1>Find your perfect rental car</h1>
      <p>Reliable and budget-friendly rentals for any journey</p>
      <Link href="/catalog" className={css.button}>
        View Catalog
      </Link>
    </section>
  );
}
