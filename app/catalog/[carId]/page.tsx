import { notFound } from "next/navigation";
import CarDetails from "@/components/CarDetails/CarDetails";
import { getCarById } from "@/lib/api/cars";

interface CarPageProps {
  params: Promise<{ carId: string }>;
}

export default async function CarPage({ params }: CarPageProps) {
  const { carId } = await params;
  const car = await getCarById(carId);

  if (!car) {
    notFound();
  }

  return <CarDetails car={car} />;
}
