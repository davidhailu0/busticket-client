import { createContext,useContext } from "react";

export const PassengerTripContext = createContext()

export const usePassengerContext = ()=>useContext(PassengerTripContext)