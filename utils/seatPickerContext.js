import { createContext,useContext } from "react";

export const SeatInfoContext = createContext()

export const useSeatInfoContext = ()=>useContext(SeatInfoContext)