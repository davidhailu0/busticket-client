import { createContext,useContext } from "react";

export const PassengerInfo = createContext()

export const usePassengerInfo = ()=>useContext(PassengerInfo)