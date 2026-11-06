import { Suspense, type ReactNode } from "react";
import { Manrope } from "next/font/google";
import "./globals.css";
import Providers from "./providers";
import Header from "@/components/Header/Header";

const manrope = Manrope({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-manrope",
  display: "swap",
});

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
