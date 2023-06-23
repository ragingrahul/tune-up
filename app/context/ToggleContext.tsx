"use client";
import React, { FC, ReactNode } from "react";
import { Extension, RuntimeConnector } from "@dataverse/runtime-connector";
import {
  createContext,
  useEffect,
  useState,
  Dispatch,
  SetStateAction,
} from "react";

interface ContextType {
  toggle: boolean;
  setToggle: Dispatch<SetStateAction<boolean>>;
}

export const ToggleContext = createContext<ContextType>({} as ContextType);

export const ToggleProvider = ({ children }: any) => {
  const [toggle, setToggle] = useState(true);

  return (
    <ToggleContext.Provider
      value={{
        toggle,
        setToggle,
      }}
    >
      {children}
    </ToggleContext.Provider>
  );
};
