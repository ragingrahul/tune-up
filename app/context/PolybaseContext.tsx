"use client";
import React from "react";
import { createContext, useState, useContext } from "react";
import { DataverseContext } from "./Context";
import { Polybase, CollectionList } from "@polybase/client";
import { SignMethod } from "@dataverse/runtime-connector";
import { SignerResponse } from "@polybase/client/dist/types";

declare global {
  interface Window {
    ethereum?: any;
  }
}

interface ContextType {
  db: Polybase;
  init: () => void;
  LoggedIn: boolean;
  fetchCollection: () => Promise<CollectionList<any> | null>;
  fetchConversion: (Recipient: string) => void;
}

export const PolybaseContext = createContext<ContextType>({} as ContextType);

export const PolybaseProvider = ({ children }: any) => {
  const { runtimeConnector } = useContext(DataverseContext);
  const [LoggedIn, setLoggedIn] = useState(false);

  const db = new Polybase({
    baseURL: "localhost:3000",
    defaultNamespace:
      "pk/0x0747d690e06f0a6b9a6326f7b98ef9af998c535790a49f065545c181ce50ba8a8c75f734fda4426bb106e00094e31495c367ae63f85e335a7be621a7172cb350/Match",
  });

  const init = async () => {
    db.signer(async (data) => {
      const sig = await runtimeConnector?.sign({
        method: SignMethod.signMessage,
        params: [data],
      });

      const pk = await runtimeConnector?.wallet.getCurrentPkh();

      return {
        h: "eth-personal-sign",
        sig: sig,
        pk: pk?.replace("did:pkh:eip155:1:", ""),
      } as SignerResponse;
    });
    console.log("Polybase initialized");
    setLoggedIn(true);
  };

  const fetchCollection = async () => {
    try {
      const collection = db.collection("MatchSchema");
      const res = await collection.get();
      return res;
    } catch (err) {
      console.log(err);
    } finally {
      return null;
    }
  };

  const fetchConversion = async (Recipient: string) => {
    await runtimeConnector?.wallet.getCurrentPkh().then(async (pkh) => {
      try {
        const collection = db.collection("MatchSchema");
        const res = await collection.create([
          `${pkh} - ${Recipient}`,
          pkh,
          Recipient,
        ]);
        console.log(res);
      } catch (err) {
        console.log(err);
      }
    });
  };

  return (
    <PolybaseContext.Provider
      value={{
        db,
        init,
        LoggedIn,
        fetchCollection,
        fetchConversion,
      }}
    >
      {children}
    </PolybaseContext.Provider>
  );
};
