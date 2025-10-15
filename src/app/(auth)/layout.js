import "../globals.css";
import Providers from "@/components/Providers";

import { Poppins } from "next/font/google";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-poppins",
});

export default function AuthLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${poppins.variable} font-sans bg-white text-gray-900 antialiased`}
          >
        <Providers>
          <div>
            {children}
          </div>  
        </Providers>
      </body>
    </html>
  );
}
