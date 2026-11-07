import { notFound } from "next/navigation";
import CarDetails from "@/components/CarDetails/CarDetails";
import { getCarById } from "@/lib/api/cars";
import type { Metadata } from "next";

interface CarPageProps {
  params: Promise<{ carId: string }>;
}

export async function generateMetadata({
  params,
}: CarPageProps): Promise<Metadata> {
  const { carId } = await params;
  const car = await getCarById(carId);

  if (!car) {
    notFound();
  }

  return {
    title: `${car.brand} ${car.model}, ${car.year}`,
    description: car.description,
  };
}

export default async function CarPage({ params }: CarPageProps) {
  const { carId } = await params;
  const car = await getCarById(carId);

  if (!car) {
    notFound();
  }

  return <CarDetails car={car} />;
}
