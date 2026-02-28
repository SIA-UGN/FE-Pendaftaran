import "./globals.css";
import { Urbanist } from "next/font/google";

import Providers from "@/components/Providers";

const urbanist = Urbanist({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-urbanist",
});

export const metadata = {
  title: "Universitas Global Nusantara",
  description: "Sistem Informasi Akademik Universitas Global Nusantara",
  icons: {
    icon: "/logo.jpg",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="id" suppressHydrationWarning>
      <body
        className={`${urbanist.variable} font-sans antialiased`}
        suppressHydrationWarning
      >
        <Providers>
          <main className="min-h-screen">{children}</main>
        </Providers>
      </body>
    </html>
  );
}
