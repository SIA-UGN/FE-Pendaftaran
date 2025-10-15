import "../globals.css";
import { Poppins } from "next/font/google";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-poppins",
});

export const metadata = {
  title: "Universitas Global Nusantara",
  description: "Sistem Informasi Akademik Universitas Global Nusantara",
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${poppins.variable} font-sans bg-white text-gray-900 antialiased`}
      >
        <div>Ini Header</div>
        {children}
        <div>Ini Footer</div>
      </body>
    </html>
  );
}
