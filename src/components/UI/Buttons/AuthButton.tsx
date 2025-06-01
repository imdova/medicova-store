import { useSession, signOut } from "next-auth/react";
import {
  User,
  Settings,
  Bookmark,
  HelpCircle,
  LogOut,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import Link from "next/link";
import { useState, useRef, useEffect } from "react";
import Modal from "../Modals/DynamicModal";
import AuthLogin from "../Modals/loginAuth";

const AuthButton = () => {
  const { data: session } = useSession();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

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
          {session.user?.name || "Account"}{" "}
          {isDropdownOpen ? <ChevronUp size={15} /> : <ChevronDown size={15} />}
        </button>

        {isDropdownOpen && (
          <div className="absolute right-0 z-50 mt-2 w-48 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
            <div className="py-1">
              <div className="px-4 py-3">
                <p className="text-sm font-medium text-gray-900">
                  {session.user.name || "Welcome"}
                </p>
                <p className="truncate text-sm text-gray-500">
                  {session.user.email}
                </p>
              </div>
              <div className="border-t border-gray-100"></div>

              <Link
                href="/account"
                className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                onClick={() => setIsDropdownOpen(false)}
              >
                <User className="mr-2 h-4 w-4" />
                Your Profile
              </Link>
              <Link
                href="/settings"
                className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                onClick={() => setIsDropdownOpen(false)}
              >
                <Settings className="mr-2 h-4 w-4" />
                Settings
              </Link>
              <Link
                href="/saved"
                className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                onClick={() => setIsDropdownOpen(false)}
              >
                <Bookmark className="mr-2 h-4 w-4" />
                Saved Items
              </Link>
              <Link
                href="/help"
                className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                onClick={() => setIsDropdownOpen(false)}
              >
                <HelpCircle className="mr-2 h-4 w-4" />
                Help Center
              </Link>

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
