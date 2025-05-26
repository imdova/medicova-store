"use client";
import { X, CheckCircle2, AlertCircle, Info } from "lucide-react";
import { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface AlertProps {
  message: string;
  type: "success" | "error" | "info";
  onClose: () => void;
  autoClose?: boolean;
  autoCloseDuration?: number;
}

const CustomAlert: React.FC<AlertProps> = ({
  message,
  type,
  onClose,
  autoClose = true,
  autoCloseDuration = 3000,
}) => {
  useEffect(() => {
    if (autoClose) {
      const timer = setTimeout(onClose, autoCloseDuration);
      return () => clearTimeout(timer);
    }
  }, [onClose, autoClose, autoCloseDuration]);

  const alertConfig = {
    success: {
      icon: <CheckCircle2 className="h-5 w-5" />,
      bg: "bg-emerald-50",
      text: "text-emerald-800",
      border: "border-emerald-200",
      accent: "text-emerald-600",
    },
    error: {
      icon: <AlertCircle className="h-5 w-5" />,
      bg: "bg-rose-50",
      text: "text-rose-800",
      border: "border-rose-200",
      accent: "text-rose-600",
    },
    info: {
      icon: <Info className="h-5 w-5" />,
      bg: "bg-gray-50",
      text: "text-gray-800",
      border: "border-gray-200",
      accent: "text-gray-600",
    },
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, x: -20 }}
        transition={{ type: "spring", damping: 25, stiffness: 120 }}
        className={`fixed bottom-5 left-5 z-[9999] flex w-full max-w-[300px] items-start gap-3 rounded-lg border p-4 shadow-lg backdrop-blur-sm md:max-w-md ${alertConfig[type].bg} ${alertConfig[type].border}`}
      >
        <div className={`mt-0.5 ${alertConfig[type].accent}`}>
          {alertConfig[type].icon}
        </div>

        <div className="flex-1">
          <h3
            className={`text-sm font-medium ${alertConfig[type].text} leading-tight`}
          >
            {type === "success" ? "Success!" : "Oops!"}
          </h3>
          <p className={`mt-1 text-sm ${alertConfig[type].text}`}>{message}</p>
        </div>

        <button
          onClick={onClose}
          className={`rounded-full p-1 transition-colors hover:bg-black/10 ${alertConfig[type].accent}`}
          aria-label="Close alert"
        >
          <X className="h-4 w-4" />
        </button>

        {autoClose && (
          <motion.div
            initial={{ width: "100%" }}
            animate={{ width: 0 }}
            transition={{ duration: autoCloseDuration / 1000, ease: "linear" }}
            className={`absolute bottom-0 left-0 h-1 ${type === "success" ? "bg-emerald-400" : type === "info" ? "bg-gray-700" : "bg-rose-400"}`}
          />
        )}
      </motion.div>
    </AnimatePresence>
  );
};

export default CustomAlert;
