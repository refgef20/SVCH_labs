import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import RussianTran from "../src/languges/ru.json";
import EnTran from "../src/languges/en.json";

i18n.use(initReactI18next).init({
  resources: {
    ru: {
      translation: RussianTran,
    },
    en: {
      translation: EnTran,
    },
  },
  lng: "ru",
  fallbackLng: "ru",
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
