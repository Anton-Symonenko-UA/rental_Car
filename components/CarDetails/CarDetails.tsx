import type { Car } from "@/types/car";
import RentalForm from "@/components/RentalForm/RentalForm";
import css from "./CarDetails.module.css";
import Icon from "@/components/Icons/Icons";

interface CarDetailsProps {
  car: Car;
}

export default function CarDetails({ car }: CarDetailsProps) {
  const mileage = car.mileage.toLocaleString("en-US").replaceAll(",", " ");

  const specifications = [
    { label: "Year", value: car.year },
    { label: "Type", value: car.type },
    { label: "Fuel Consumption", value: `${car.fuelConsumption} l/100 km` },
    { label: "Engine Size", value: car.engine },
  ];

  return (
    <main className={css.page}>
      <div className={css.layout}>
        <div className={css.leftColumn}>
          <img
            className={css.image}
            src={car.img}
            alt={`${car.brand} ${car.model}, ${car.year}`}
            width={640}
            height={480}
          />

          <RentalForm carId={car.id} />
        </div>

        <div className={css.content}>
          <div className={css.summary}>
            <div className={css.heading}>
              <h1 className={css.title}>
                {car.brand} {car.model}, {car.year}
              </h1>

              <span className={css.stockNumber}>Id: {car.stockNumber}</span>
            </div>

            <div className={css.meta}>
              <p className={css.location}>
                <Icon name="location" className={css.icon} />
                {car.location.city}, {car.location.country}
              </p>

              <p>Mileage: {mileage} km</p>
            </div>

            <p className={css.price}>${car.rentalPrice}</p>

            <p className={css.description}>{car.description}</p>
          </div>

          <section className={css.section}>
            <h2 className={css.sectionTitle}>Rental Conditions:</h2>

            <ul className={css.list}>
              {car.rentalConditions.map((condition) => (
                <li key={condition} className={css.listItem}>
                  <Icon name="check-circle" className={css.icon} />
                  <span>{condition}</span>
                </li>
              ))}
            </ul>
          </section>

          <section className={css.section}>
            <h2 className={css.sectionTitle}>Car Specifications:</h2>

            <ul className={css.list}>
              {specifications.map(({ label, value }) => (
                <li key={label} className={css.listItem}>
                  <Icon name="check-circle" className={css.icon} />
                  <span>
                    {label}: {value}
                  </span>
                </li>
              ))}
            </ul>
          </section>

          <section className={css.section}>
            <h2 className={css.sectionTitle}>
              Accessories and functionalities:
            </h2>

            <ul className={css.list}>
              {car.features.map((feature) => (
                <li key={feature} className={css.listItem}>
                  <Icon name="check-circle" className={css.icon} />
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
          </section>
        </div>
      </div>
    </main>
  );
}
