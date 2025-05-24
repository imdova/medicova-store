import { Raleway } from "next/font/google";
import "./globals.css";
import DynamicHeaderWrapper from "@/components/Layout/Header/DynamicHeaderWrapper";
import Footer from "@/components/Layout/Footer/Footer";
import { Suspense } from "react";
import LoadingAnimation from "@/components/UI/LoadingAnimation";

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
        <DynamicHeaderWrapper>
          <Suspense fallback={<LoadingAnimation />}>{children}</Suspense>
        </DynamicHeaderWrapper>
        <Footer />
      </body>
    </html>
  );
}
