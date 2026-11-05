import type { Car } from "@/types/car";
import css from "./CarDetails.module.css";
import RentalForm from "@/components/RentalForm/RentalForm";

interface CarDetailsProps {
  car: Car;
}

export default function CarDetails({ car }: CarDetailsProps) {
  return (
    <main className={css.page}>
      <div className={css.layout}>
        <div className={css.leftColumn}>
          <img
            className={css.image}
            src={car.img}
            alt={`${car.brand} ${car.model}`}
            width={640}
            height={480}
          />

          <RentalForm carId={car.id} />
        </div>

        <div className={css.content}>
          <h1 className={css.title}>
            {car.brand} {car.model}, {car.year}
          </h1>

          <p className={css.location}>
            {car.location.city}, {car.location.country}
          </p>

          <p className={css.mileage}>
            Пробіг: {car.mileage.toLocaleString("en-US")} km
          </p>

          <p className={css.price}>${car.rentalPrice}</p>

          <p className={css.description}>{car.description}</p>

          <section className={css.section}>
            <h2 className={css.sectionTitle}>Характеристики</h2>

            <ul className={css.list}>
              <li>Тип: {car.type}</li>
              <li>Двигун: {car.engine}</li>
              <li>Витрата пального: {car.fuelConsumption} л/100 км</li>
              <li>Компанія: {car.rentalCompany}</li>
            </ul>
          </section>

          <section className={css.section}>
            <h2 className={css.sectionTitle}>Умови оренди</h2>

            <ul className={css.list}>
              {car.rentalConditions.map((condition) => (
                <li key={condition}>{condition}</li>
              ))}
            </ul>
          </section>

          <section className={css.section}>
            <h2 className={css.sectionTitle}>Оснащення</h2>

            <ul className={css.list}>
              {car.features.map((feature) => (
                <li key={feature}>{feature}</li>
              ))}
            </ul>
          </section>
        </div>
      </div>
    </main>
  );
}
