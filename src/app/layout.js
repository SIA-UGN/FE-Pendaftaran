import "./globals.css";
import { Poppins } from "next/font/google";

import Providers from "@/components/Providers";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-poppins",
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
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${poppins.variable} font-sans bg-white text-gray-900 antialiased`}
        suppressHydrationWarning
      >
        <Providers>
          <main className="min-h-screen">{children}</main>
        </Providers>
      </body>
    </html>
  );
}
