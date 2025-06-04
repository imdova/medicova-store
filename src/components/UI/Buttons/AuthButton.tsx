import { useSession, signOut } from "next-auth/react";
import { User, LogOut, ChevronDown, ChevronUp } from "lucide-react";
import Link from "next/link";
import { useState, useRef, useEffect } from "react";
import Modal from "../Modals/DynamicModal";
import AuthLogin from "../Modals/loginAuth";
import { userType } from "@/types/next-auth";
import { menuGroups } from "@/constants/menu";

interface UserData {
  name: string;
  email: string;
  role: userType;
}

const AuthButton = () => {
  const { data: session } = useSession();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Dummy user data - replace with actual user data from your auth system
  const dummyUserData: UserData = {
    name: session?.user?.name || "Demo User",
    email: session?.user?.email || "demo@example.com",
    role: (session?.user?.role as userType) || "user", // Default to 'user' if not specified
  };

  // Get menu groups for the current user type
  const currentMenuGroups = menuGroups[dummyUserData.role];

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  if (session?.user) {
    return (
      <div className="relative" ref={dropdownRef}>
        <button
          onClick={() => setIsDropdownOpen(!isDropdownOpen)}
          className="flex min-w-[170px] items-center justify-center gap-2 border-r border-gray-200 px-4 text-xs font-semibold text-white hover:text-gray-100"
          aria-expanded={isDropdownOpen}
          aria-haspopup="true"
        >
          {dummyUserData.name || "Account"}{" "}
          {isDropdownOpen ? <ChevronUp size={15} /> : <ChevronDown size={15} />}
          {dummyUserData.role !== "user" && (
            <span className="ml-1 rounded bg-green-100 px-2 py-0.5 text-xs font-medium text-green-800">
              {dummyUserData.role}
            </span>
          )}
        </button>

        {isDropdownOpen && (
          <div className="absolute right-0 z-50 mt-2 w-56 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
            <div className="py-1">
              <div className="px-4 py-3">
                <p className="text-sm font-medium text-gray-900">
                  {dummyUserData.name || "Welcome"}
                </p>
                <p className="truncate text-sm text-gray-500">
                  {dummyUserData.email}
                </p>
                {dummyUserData.role !== "user" && (
                  <p className="mt-1 text-xs font-medium text-green-600">
                    {dummyUserData.role.toUpperCase()} ACCOUNT
                  </p>
                )}
              </div>

              {currentMenuGroups.map((group, groupIndex) => (
                <div key={groupIndex}>
                  <div className="border-t border-gray-100"></div>
                  {group.title && (
                    <div className="px-4 py-2 text-xs font-semibold text-gray-500">
                      {group.title}
                    </div>
                  )}
                  {group.items.map((item) => {
                    const Icon = item.icon;
                    return (
                      <Link
                        key={item.href}
                        href={item.href}
                        className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        onClick={() => setIsDropdownOpen(false)}
                      >
                        {Icon && <Icon size={15} className="mr-2" />}
                        {item.title}
                      </Link>
                    );
                  })}
                </div>
              ))}

              <div className="border-t border-gray-100"></div>
              <button
                onClick={() => {
                  signOut({ redirect: true, callbackUrl: "/" });
                  setIsDropdownOpen(false);
                }}
                className="flex w-full items-center px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100"
              >
                <LogOut className="mr-2 h-4 w-4" />
                Sign out
              </button>
            </div>
          </div>
        )}
      </div>
    );
  }

  return (
    <>
      <button
        onClick={() => setIsModalOpen(true)}
        className="flex min-w-[100px] items-center gap-2 border-r border-gray-200 px-4 text-sm font-semibold text-white hover:text-gray-100"
      >
        Log in <User size={18} />
      </button>
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        size="lg"
      >
        <AuthLogin />
      </Modal>
    </>
  );
};

export default AuthButton;
