import { Raleway } from "next/font/google";
import "./globals.css";
import DynamicHeaderWrapper from "@/components/Layout/Header/DynamicHeaderWrapper";
import { Suspense } from "react";
import LoadingAnimation from "@/components/UI/LoadingAnimation";
import StoreProvider from "@/store/StoreProvider";
import { NextAuthProvider } from "@/NextAuthProvider";
import DynamicFooter from "@/components/Layout/Footer/DynamicFooter";
import { LanguageProvider } from "@/contexts/LanguageContext";

const raleway = Raleway({
  variable: "--font-raleway",
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <LanguageProvider>
      <html lang="en" className={raleway.variable}>
        <body className="bg-gray-50 antialiased">
          <StoreProvider>
            <NextAuthProvider>
              <DynamicHeaderWrapper>
                <Suspense fallback={<LoadingAnimation />}>{children}</Suspense>
              </DynamicHeaderWrapper>
              <DynamicFooter />
            </NextAuthProvider>
          </StoreProvider>
        </body>
      </html>
    </LanguageProvider>
  );
}
