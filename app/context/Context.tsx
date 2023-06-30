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
  ownProfile: StreamRecord;
  setOwnProfile: Dispatch<SetStateAction<StreamRecord>>;
}

type StreamRecord =
  | Record<
      string,
      {
        app: string;
        modelId: string;
        pkh: string;
        streamContent: {
          file?: any;
          content?: any;
        };
      }
    >
  | undefined;

export const DataverseContext = createContext<ContextType>({} as ContextType);

export const DataverseProvider = ({ children }: any) => {
  const [runtimeConnector, setRuntimeConnector] = useState<RuntimeConnector>();
  const [walletConnected, setWalletConnect] = useState<boolean>(false);
  const [pkh, setPkh] = useState<string>("");
  const [ownProfile, setOwnProfile] = useState<StreamRecord>();

  const createRuntimeConnector = async () => {
    const runtimeConnector = new RuntimeConnector(Extension);
    setRuntimeConnector(runtimeConnector);
  };

  useEffect(() => {
    createRuntimeConnector();
  }, []);

  const SetPublicKey = async () => {
    if (runtimeConnector) {
      const pkh = await runtimeConnector.wallet.getCurrentPkh();
      setPkh(pkh);
    }
  };

  useEffect(() => {
    SetPublicKey();
  }, [runtimeConnector]);

  return (
    <DataverseContext.Provider
      value={{
        runtimeConnector,
        walletConnected,
        pkh,
        ownProfile,
        setWalletConnect,
        setPkh,
        setOwnProfile,
      }}
    >
      {children}
    </DataverseContext.Provider>
  );
};
