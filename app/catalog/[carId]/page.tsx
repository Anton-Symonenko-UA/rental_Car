import { Suspense } from "react";
import { notFound } from "next/navigation";
import CarDetails from "@/components/CarDetails/CarDetails";
import { getCarById } from "@/lib/api/cars";

interface CarPageProps {
  params: Promise<{ carId: string }>;
}

async function CarDetailsLoader({ params }: CarPageProps) {
  const { carId } = await params;
  const car = await getCarById(carId);

  if (!car) {
    notFound();
  }

  return <CarDetails car={car} />;
}

export default function CarPage({ params }: CarPageProps) {
  return (
    <Suspense fallback={<p>Завантаження автомобіля...</p>}>
      <CarDetailsLoader params={params} />
    </Suspense>
  );
}
