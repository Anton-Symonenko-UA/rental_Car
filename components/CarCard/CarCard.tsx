import Link from "next/link";
import type { Car } from "@/types/car";
import css from "@/components/CarCard/CarCard.module.css";

interface CarCardProps {
  car: Car;
}

export default function CarCard({ car }: CarCardProps) {
  return (
    <article className={css.card}>
      <img
        className={css.image}
        src={car.img}
        alt={`${car.brand} ${car.model}`}
        width={276}
        height={268}
        loading="lazy"
      />
      <div className={css.heading}>
        <h2 className={css.title}>
          {car.brand} <span>{car.model}</span>, {car.year}
        </h2>

        <p className={css.price}>${car.rentalPrice}</p>
      </div>

      <ul className={css.details}>
        <li>{car.location.city}</li>
        <li>{car.location.country}</li>
        <li>{car.rentalCompany}</li>
        <li>{car.type}</li>
        <li>{car.mileage.toLocaleString("en-US")} km</li>
      </ul>

      <Link
        className={css.link}
        href={`/catalog/${car.id}`}
        target="_blank"
        rel="noopener noreferrer"
      >
        Read more
      </Link>
    </article>
  );
}
