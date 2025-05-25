"use client";
import { X } from "lucide-react";
import { useEffect } from "react";

interface AlertProps {
  message: string;
  type: "success" | "error";
  onClose: () => void;
}

const CustomAlert: React.FC<AlertProps> = ({ message, type, onClose }) => {
  useEffect(() => {
    const timer = setTimeout(onClose, 3000); // Auto-hide after 3 seconds
    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div
      className={`fixed bottom-16 left-5 z-50 flex items-center rounded-md px-4 py-3 shadow-lg transition-all md:bottom-5 ${
        type === "success" ? "bg-primary text-white" : "bg-red-500 text-white"
      }`}
    >
      {message}
      <button className="ml-3 font-bold" onClick={onClose}>
        <X size={17} />
      </button>
    </div>
  );
};

export default CustomAlert;
