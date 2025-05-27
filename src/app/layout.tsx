import { Raleway } from "next/font/google";
import "./globals.css";
import DynamicHeaderWrapper from "@/components/Layout/Header/DynamicHeaderWrapper";
import Footer from "@/components/Layout/Footer/Footer";
import { Suspense } from "react";
import LoadingAnimation from "@/components/UI/LoadingAnimation";
import StoreProvider from "@/store/StoreProvider";
import SessionWrapper from "@/providers/SessionWrapper";
import { Session } from "next-auth";

const raleway = Raleway({
  variable: "--font-raleway",
  subsets: ["latin"],
});

export default function RootLayout({
  children,
  session,
}: Readonly<{
  children: React.ReactNode;
  session: Session;
}>) {
  return (
    <SessionWrapper session={session}>
      <html lang="en" className={raleway.variable}>
        <body className="bg-gray-50 antialiased">
          <StoreProvider>
            <DynamicHeaderWrapper>
              <Suspense fallback={<LoadingAnimation />}>{children}</Suspense>
            </DynamicHeaderWrapper>
            <Footer />
          </StoreProvider>
        </body>
      </html>
    </SessionWrapper>
  );
}
