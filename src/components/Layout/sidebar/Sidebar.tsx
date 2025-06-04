"use client";
import React from "react";
import Link from "next/link";

import { sidebarGroups } from "@/constants/sidebar";
import { usePathname } from "next/navigation";
import { Power } from "lucide-react";
import { signOut } from "next-auth/react";
import { isCurrentPage } from "@/util";
import { AccountPageProps } from "@/app/(auth)/user/types/account";
import ProfileCompletion from "@/app/(auth)/user/component/ProfileCompletion";

const Sidebar: React.FC<AccountPageProps> = ({ user }) => {
  const pathname = usePathname();

  const groups = sidebarGroups[user.role] || [];

  return (
    <aside className="w-72">
      <div className="rounded-xl border-gray-300 bg-white p-2 shadow-sm md:border">
        <div className="mb-4">
          <h1 className="text-lg font-bold text-gray-800">
            {user.name || "Hala!"}
          </h1>
          <p className="text-xs text-gray-600">{user.email}</p>
        </div>
        <ProfileCompletion percentage={40} />
      </div>

      <nav className="mt-4">
        {groups.map((group, groupIndex) => (
          <div key={groupIndex} className="mb-4">
            {group.title && (
              <h3 className="mb-2 px-2 text-xs font-semibold uppercase tracking-wider text-gray-500">
                {group.title}
              </h3>
            )}
            <div className="rounded-xl border-gray-300 bg-white p-2 shadow-sm md:border">
              {group.description && (
                <p className="mb-3 px-2 text-xs text-gray-500">
                  {group.description}
                </p>
              )}
              <ul className="space-y-1">
                {group.items.map((item) => {
                  const Icon = item.icon;
                  const CurrentPage = isCurrentPage(pathname, item.href);
                  return (
                    <li key={item.href}>
                      <Link
                        href={item.href}
                        className={`flex items-center gap-2 rounded-md px-3 py-2 text-sm ${
                          CurrentPage
                            ? "bg-green-50 font-medium text-green-600"
                            : "text-gray-700 hover:bg-gray-100"
                        }`}
                      >
                        {Icon && <Icon className="h-4 w-4" />}
                        {item.title}
                      </Link>

                      {item.subItems && (
                        <ul className="ml-4 mt-1 space-y-1 border-l border-gray-200 pl-3">
                          {item.subItems.map((subItem) => {
                            const CurrentPage = isCurrentPage(
                              pathname,
                              subItem.href,
                            );
                            return (
                              <li key={subItem.href}>
                                <Link
                                  href={subItem.href}
                                  className={`flex items-center rounded px-3 py-1.5 text-sm ${
                                    CurrentPage
                                      ? "bg-green-50 font-medium text-green-600"
                                      : "text-gray-600 hover:bg-gray-100"
                                  }`}
                                >
                                  {subItem.title}
                                </Link>
                              </li>
                            );
                          })}
                        </ul>
                      )}
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>
        ))}

        <div className="rounded-xl border-gray-300 bg-white p-2 shadow-sm md:border">
          <button
            onClick={() => signOut({ redirect: true, callbackUrl: "/" })}
            className="flex w-full items-center gap-2 rounded-md px-3 py-2 text-sm text-gray-700 hover:bg-red-50"
          >
            <Power className="h-4 w-4" />
            Sign out
          </button>
        </div>
      </nav>
    </aside>
  );
};

export default Sidebar;
