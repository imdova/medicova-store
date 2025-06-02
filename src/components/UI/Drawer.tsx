"use client";

import { X } from "lucide-react";
import IconButton from "./Buttons/IconButton";

interface DrawerProps {
  isOpen: boolean;
  hiddenCloseBtn?: boolean;
  onClose: () => void;
  children: React.ReactNode;
  logo?: React.ReactNode;
  width?: string;
  hasOverlay?: boolean;
  position?: "left" | "right";
}

export const Drawer: React.FC<DrawerProps> = ({
  isOpen,
  onClose,
  children,
  logo,
  hiddenCloseBtn = false,
  width = "w-70",
  hasOverlay = true,
  position = "left",
}) => {
  return (
    <div className="relative z-[2000] md:hidden">
      {hasOverlay && (
        <div
          className={`fixed inset-0 bg-[#00000060] bg-opacity-50 transition-opacity ${
            isOpen ? "visible opacity-100" : "invisible opacity-0"
          }`}
          onClick={onClose}
        ></div>
      )}
      <div
        className={`no-scrollbar fixed top-0 overflow-y-auto ${
          position === "right" ? "right-0" : "left-0"
        } h-full bg-white shadow-lg transition-transform ${
          isOpen
            ? "translate-x-0"
            : position === "right"
              ? "translate-x-full"
              : "-translate-x-full"
        } ${width}`}
      >
        <div>
          {!hiddenCloseBtn && (
            <IconButton
              className={`!absolute top-2 p-2 ${
                position === "right" ? "left-2" : "right-2"
              }`}
              onClick={onClose}
              Icon={X}
            />
          )}
          <div className="w-fit"> {logo}</div>
        </div>

        <div className="p-2">{children}</div>
      </div>
    </div>
  );
};
