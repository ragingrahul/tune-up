"use client";
import React, { useEffect } from "react";
import Header from "../components/Header";
import { DataverseContext } from "@/app/context/Context";
import { useContext } from "react";
import { useStream, useWallet } from "../hooks";

function page() {
  const { connectWallet } = useWallet();
  const { checkCapability,loadStreams } = useStream();

  const checkingCapability = async () => {
    const res = await checkCapability();
    console.log(res);
  };

  const loadTheStreams=async()=>{
    const res=await loadStreams({
      pkh:"did:pkh:eip155:1:0x2160D41c9D711Ca3fA7777211148538eeb431970",
      modelId:"kjzl6hvfrbw6c7cp6xafsa7ghxh1yfw4bsub1363ehrxhi999vlpxny9k69uoxz"
    })
  }

  useEffect(() => {
    checkingCapability();
  }, []);

  return (
    <main className="flex min-h-screen flex-col items-center h-[120vh] font-RobotoMono">
      <Header />
      <button onClick={checkingCapability} className="text-white border m-3">
        Connect
      </button>
      <button onClick={loadTheStreams} className="text-white border">
        Load Streams
      </button>
    </main>
  );
}

export default page;
