"use client";
import Image from "next/image";
import React, { useState } from "react";
import {
  RuntimeConnector,
  Extension,
  WALLET,
} from "@dataverse/runtime-connector";
import HomePage from "./components/Home";
import Header from "./components/Header";
import Main from "./components/Main";

// const runtimeConnector:RuntimeConnector=new RuntimeConnector(Extension)

export default function Home() {
  const [wallet, setWallet] = useState<WALLET>();
  // const connectWallet=async()=>{
  //   try {
  //     const res=await runtimeConnector.connectWallet()
  //     setWallet(res.wallet)
  //     return res.address
  //   } catch (error) {
  //     console.error(error)
  //   }
  // }
  return (
    <main>
      <HomePage />
    </main>
  );
}
