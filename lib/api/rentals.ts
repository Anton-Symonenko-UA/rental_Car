export interface BookingRequest {
  name: string;
  email: string;
  comment?: string;
}

export async function createBookingRequest(
  carId: string,
  booking: BookingRequest,
): Promise<void> {
  const response = await fetch(
    `https://car-rental-api.goit.study/cars/${encodeURIComponent(carId)}/booking-requests`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(booking),
    },
  );

  if (!response.ok) {
    throw new Error(`Не вдалося надіслати заявку: ${response.status}`);
  }
}
