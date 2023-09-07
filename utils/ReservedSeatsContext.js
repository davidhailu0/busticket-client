import { createContext,useContext } from "react";

export const ReservedSeatContext = createContext();

export const useReservedSeatContext = ()=>useContext(ReservedSeatContext)