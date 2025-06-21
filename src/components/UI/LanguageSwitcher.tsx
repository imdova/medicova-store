import { useLanguage } from "@/contexts/LanguageContext";
import React from "react";

type LanguageSwitcherProps = {
  className?: string;
};

const LanguageSwitcher: React.FC<LanguageSwitcherProps> = ({className}) => {
  const { language, setLanguage, isArabic } = useLanguage();

  const toggleLanguage = () => {
    const newLanguage = language === "en" ? "ar" : "en";
    setLanguage(newLanguage);
  };

  return (
    <button
      onClick={toggleLanguage}
      className={`rounded-md px-3 text-sm text-gray-700 md:text-white ${className}`}
    >
      <p className="hidden md:block">{isArabic ? "English" : "العربية"}</p>
      <p className="block font-semibold md:hidden">{isArabic ? "EN" : "AR"}</p>
    </button>
  );
};

export default LanguageSwitcher;
