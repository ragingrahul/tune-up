"use client";
import React, { FC, ReactNode } from "react";
import { Extension, RuntimeConnector } from "@dataverse/runtime-connector";
import {
  createContext,
  useEffect,
  useState,
  Dispatch,
  SetStateAction,
  useContext,
} from "react";
import { ethers, Signer } from "ethers";
import { Client, Conversation, DecodedMessage } from "@xmtp/xmtp-js";
import { DataverseContext } from "./Context";

declare global {
  interface Window {
    ethereum?: any;
  }
}

interface ContextType {
  xmtp: Client | undefined;
  signer: Signer | undefined;
  messages: DecodedMessage[];
  conversation: Conversation | undefined;
  sendMessage: (message: string) => Promise<void>;
  streamMessages: () => Promise<void>;
  loadConversation: () => Promise<void>;
  setPeerAddress: Dispatch<SetStateAction<string>>;
}

export const WalletContext = createContext<ContextType>({} as ContextType);

export const WalletProvider = ({ children }: any) => {
  const [signer, setSigner] = useState<Signer>();
  const [xmtp, setXmtp] = useState<Client>();
  const { runtimeConnector } = useContext(DataverseContext);
  const [peerAddress, setPeerAddress] = useState<string>("");
  const [conversation, setConversation] = useState<Conversation>();
  const [messages, setMessages] = useState<DecodedMessage[]>([]);

  const connectToClient = async () => {
    try {
      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      setSigner(signer);
      const xmtp = await Client.create(signer as any);
      setXmtp(xmtp);
      console.log(xmtp.address);
    } catch (error) {
      console.error(error);
    }
  };

  const loadConversation = async () => {
    const newConversation = await xmtp?.conversations.newConversation(
      peerAddress
    );
    setConversation(newConversation);
    const opts = {
      startTime: new Date(new Date().setDate(new Date().getDate() - 1)),
      endTime: new Date(),
    };
    const messages = await newConversation?.messages(opts);
    if (messages) setMessages(messages);
    setMessages([]);
  };

  const sendMessage = async (message: string) => {
    await conversation?.send(message);
  };

  useEffect(() => {
    connectToClient();
  }, [runtimeConnector]);

  const streamMessages = async () => {
    if (xmtp && conversation) {
      for await (const message of await conversation.streamMessages()) {
        setMessages((messages) => [...messages, message]);
      }
    }
  };

  return (
    <WalletContext.Provider
      value={{
        xmtp,
        signer,
        messages,
        conversation,
        sendMessage,
        streamMessages,
        loadConversation,
        setPeerAddress,
      }}
    >
      {children}
    </WalletContext.Provider>
  );
};
