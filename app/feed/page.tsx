"use client";
import React, { useEffect } from "react";
import Header from "../components/Header";
import { DataverseContext } from "@/app/context/Context";
import { useContext } from "react";
import { useStream, useWallet } from "../hooks";

function page() {
  const { connectWallet } = useWallet();
  const { checkCapability } = useStream();

  const checkingCapability = async () => {
    const res = await checkCapability();
    console.log(res);
  };

  useEffect(() => {
    checkingCapability();
  }, []);

  return (
    <main className="flex min-h-screen flex-col items-center h-[120vh] font-RobotoMono">
      <Header />
      <button onClick={checkingCapability} className="text-white border">
        Connect
      </button>
    </main>
  );
}

export default page;
