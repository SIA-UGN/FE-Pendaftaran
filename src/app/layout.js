import "./globals.css";
import { Poppins } from "next/font/google";

import Providers from "@/components/Providers";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

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
    <html lang="en">
      <body
        className={`${poppins.variable} font-sans bg-white text-gray-900 antialiased `}
      >
        <Providers>
            {children}  
        </Providers>
      </body>
    </html>
  );
}
