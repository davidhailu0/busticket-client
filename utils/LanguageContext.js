import { createContext,useContext } from "react";

export const LocaleLanguage = createContext()


export const useLocale = ()=>useContext(LocaleLanguage)