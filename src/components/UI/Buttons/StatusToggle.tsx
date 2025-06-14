import React, { useState } from "react";

interface StatusToggleProps {
  initialStatus?: boolean;
  onToggle?: (newStatus: boolean) => void;
  className?: string;
}

const StatusToggle: React.FC<StatusToggleProps> = ({
  initialStatus = false,
  onToggle,
  className = "",
}) => {
  const [isActive, setIsActive] = useState(initialStatus);

  const handleToggle = () => {
    const newStatus = !isActive;
    setIsActive(newStatus);
    onToggle?.(newStatus);
  };

  return (
    <button
      type="button"
      onClick={handleToggle}
      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none ${
        isActive ? "bg-green-500" : "bg-gray-300"
      } ${className}`}
      aria-pressed={isActive}
    >
      <span
        className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
          isActive ? "translate-x-6" : "translate-x-1"
        }`}
      />
    </button>
  );
};

export default StatusToggle;
