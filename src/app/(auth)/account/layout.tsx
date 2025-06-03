"use client";
import React, { ReactNode } from "react";
import Sidebar from "./component/Sidebar";
import { useSession } from "next-auth/react";
import GoBackButton from "@/components/UI/Buttons/GoBackButton";

interface AccountLayoutProps {
  children: ReactNode;
}

const AccountLayout: React.FC<AccountLayoutProps> = ({ children }) => {
  const { data: session } = useSession();

  // Create a safe user object with default values
  const safeUser = {
    id: session?.user?.id || "",
    name: session?.user?.name || "",
    email: session?.user?.email || "",
    image: session?.user?.image || "",
    isAdmin: session?.user?.isAdmin,
  };

  return (
    <div className="container mx-auto flex min-h-screen bg-gray-50 p-3 lg:max-w-[1440px]">
      <div className="hidden md:block">
        <Sidebar user={safeUser} />
      </div>

      <main className="flex-1 pt-2 md:px-4">
        <div className="mb-2">
          <GoBackButton />
        </div>
        <div>{children}</div>
      </main>
    </div>
  );
};

export default AccountLayout;
