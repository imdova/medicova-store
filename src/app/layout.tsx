import { Raleway } from "next/font/google";
import "./globals.css";
import DynamicHeaderWrapper from "@/components/Layout/Header/DynamicHeaderWrapper";
import Footer from "@/components/Layout/Footer/Footer";

// export const metadata = {
//   title: {
//     default: "Home | Omga e-pharmacy",
//     template: "%s | Omga e-pharmacy",
//   },
//   description: "Omga Omga",
// };

const raleway = Raleway({
  variable: "--font-raleway",
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={raleway.variable}>
      <body className="bg-gray-50 antialiased">
        <DynamicHeaderWrapper>{children}</DynamicHeaderWrapper>
        <Footer />
      </body>
    </html>
  );
}
