"use client";

import DynamicHeader from "@/components/Layout/Header/DynamicHeader";
import Navbar from "../NavbarMobile/Navbar";

export default function DynamicHeaderWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <DynamicHeader />
      <main className="h-[1000px] pt-4">{children}</main>
      <Navbar />
    </>
  );
}
