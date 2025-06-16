type LanguageType = "en" | "ar"; // Define a specific type for languages

type Translations = {
  [key: string]: {
    en: string;
    ar: string;
  };
};

const translations: Translations = {
  welcome: {
    en: "Welcome",
    ar: "مرحبا",
  },
  products: {
    en: "Products",
    ar: "المنتجات",
  },
  copyright: {
    en: "Medicova. All Rights Reserved",
    ar: "ميديكوفا جميع الحقوق محفوظة",
  },
  // Add all your translations here
};

export const t = (key: string, language: LanguageType): string => {
  // Use LanguageType for the language parameter
  return translations[key]?.[language] || key;
};
