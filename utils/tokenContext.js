import { createContext, useContext } from "react";

export const TokenAccessContext = createContext()

export const useTokenAccessContext = ()=>useContext(TokenAccessContext)