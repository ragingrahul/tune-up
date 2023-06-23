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
  runtimeConnector: RuntimeConnector | undefined;
  walletConnected: boolean;
  setWalletConnect: Dispatch<SetStateAction<boolean>>;
  pkh: string;
  setPkh: Dispatch<SetStateAction<string>>;
}

export const DataverseContext = createContext<ContextType>({} as ContextType);

export const DataverseProvider = ({ children }: any) => {
  const [runtimeConnector, setRuntimeConnector] = useState<RuntimeConnector>();
  const [walletConnected, setWalletConnect] = useState<boolean>(false);
  const [pkh, setPkh] = useState<string>("");

  const createRuntimeConnector = async () => {
    const runtimeConnector = new RuntimeConnector(Extension);
    setRuntimeConnector(runtimeConnector);
  };

  useEffect(() => {
    createRuntimeConnector();
  }, []);

  return (
    <DataverseContext.Provider
      value={{
        runtimeConnector,
        walletConnected,
        pkh,
        setWalletConnect,
        setPkh,
      }}
    >
      {children}
    </DataverseContext.Provider>
  );
};
