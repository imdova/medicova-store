"use client";

import DynamicHeader from "@/components/Layout/Header/DynamicHeader";
import useScrollDetection from "@/hooks/useScrollDetection";

export default function DynamicHeaderWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <DynamicHeader />
      <main className="h-[1000px]">{children}</main>
    </>
  );
}
