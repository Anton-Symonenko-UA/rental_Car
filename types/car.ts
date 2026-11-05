export interface Car {
  id: string;
  year: number;
  brand: string;
  model: string;
  type: string;
  img: string;
  description: string;
  fuelConsumption: number;
  engine: string;
  rentalPrice: string;
  rentalCompany: string;
  rentalConditions: string[];
  mileage: number;
  stockNumber: number;
  features: string[];
  location: CarLocation;
  createdAt: string;
  updatedAt: string;
}

export interface CarFilters {
  brand?: string;
  price?: number;
  minMileage?: number;
  maxMileage?: number;
}

export interface CarLocation {
  country: string;
  city: string;
  address: string;
}

export interface CarsResponse {
  cars: Car[];
  totalCars: number;
  totalPages: number;
  page: number;
  perPage: number;
}

export interface CarFilterOptions {
  brands: string[];
  price: {
    min: number;
    max: number;
  };
}
