import { Suspense, type ReactNode } from "react";
import { Manrope } from "next/font/google";
import "./globals.css";
import Providers from "./providers";
import Header from "@/components/Header/Header";
import type { Metadata } from "next";

const manrope = Manrope({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-manrope",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://rental-car-vxcm.vercel.app"),
  title: {
    default: "RentalCar — Find Your Perfect Rental Car",
    template: "%s | RentalCar",
  },
  description:
    "Find your perfect rental car. Explore available vehicles, compare prices and features, and send a booking request online.",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className={manrope.variable}>
        <Providers>
          <Suspense
            fallback={
              <div
                aria-hidden="true"
                style={{ height: 68, backgroundColor: "#ffffff" }}
              />
            }
          >
            <Header />
          </Suspense>

          {children}
        </Providers>
      </body>
    </html>
  );
}
