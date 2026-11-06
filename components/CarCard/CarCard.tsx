import Link from "next/link";
import type { Car } from "@/types/car";
import css from "./CarCard.module.css";

interface CarCardProps {
  car: Car;
}

export default function CarCard({ car }: CarCardProps) {
  const mileage = car.mileage.toLocaleString("en-US").replaceAll(",", " ");

  return (
    <article className={css.card}>
      <img
        className={css.image}
        src={car.img}
        alt={`${car.brand} ${car.model}, ${car.year}`}
        width={244}
        height={268}
        loading="lazy"
      />

      <div className={css.heading}>
        <h2
          className={css.title}
          title={`${car.brand} ${car.model}, ${car.year}`}
        >
          {car.brand} <span>{car.model}</span>, {car.year}
        </h2>

        <p className={css.price}>${car.rentalPrice}</p>
      </div>

      <div className={css.details}>
        <ul className={css.detailsRow} aria-label="Location and rental company">
          <li>{car.location.city}</li>
          <li>{car.location.country}</li>
          <li className={css.company} title={car.rentalCompany}>
            {car.rentalCompany}
          </li>
        </ul>

        <ul className={css.detailsRow} aria-label="Car type and mileage">
          <li className={css.type} title={car.type}>
            {car.type}
          </li>
          <li className={css.mileage}>{mileage} km</li>
        </ul>
      </div>

      <Link
        className={css.link}
        href={`/catalog/${car.id}`}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`Read more about ${car.brand} ${car.model} (opens in a new tab)`}
      >
        Read more
      </Link>
    </article>
  );
}
