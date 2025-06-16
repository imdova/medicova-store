import { useLanguage } from "@/contexts/LanguageContext";
import React from "react";

const LanguageSwitcher: React.FC = () => {
  const { language, setLanguage, isArabic } = useLanguage();

  const toggleLanguage = () => {
    const newLanguage = language === "en" ? "ar" : "en";
    setLanguage(newLanguage);
  };

  return (
    <button
      onClick={toggleLanguage}
      className="rounded-md bg-gray-200 px-4 py-2 text-gray-800 dark:bg-gray-700 dark:text-gray-200"
    >
      {isArabic ? "English" : "العربية"}
    </button>
  );
};

export default LanguageSwitcher;
