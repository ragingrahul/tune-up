"use client";
import React, { useEffect } from "react";
import Header from "../components/Header";
import { DataverseContext } from "@/app/context/Context";
import { useContext } from "react";
import { useStream, useWallet } from "../hooks";
import { objectToArray } from "../utils/address";

function page() {
  const { connectWallet } = useWallet();
  const { checkCapability,loadStreams,createPublicStream } = useStream();
  const {runtimeConnector}=useContext(DataverseContext);

  const checkingCapability:any = async () => {
    const res = await checkCapability();
    console.log(res);
  };

  const loadTheStreams=async()=>{
    const res=await loadStreams({
      //pkh:"did:pkh:eip155:1:0x2160D41c9D711Ca3fA7777211148538eeb431970",
      modelId:"kjzl6hvfrbw6c5v0ce3x14dusz2qebnzosn596q6pd3dp4oaqkq3zwdohgbb3qd"
    })
    if(res){
      Object.entries(res).map(([key,value])=>(
        console.log(key,value.streamContent.content.name)
      ))
    }
    const result=objectToArray(res);
    // for(const role in res){
    //   result.push(res[role].streamContent.content);
    // }
    
    // result.map((profile)=>{
    //   console.log(profile.age,profile.name)
    // })
  }

  // const createPosts=async()=>{
  //   const res=await createPublicStream()
  //   console.log(res);
  // }

  useEffect(() => {
    checkingCapability();
  }, [runtimeConnector]);

  return (
    <main className="flex min-h-screen flex-col items-center h-[120vh] font-RobotoMono">
      <Header />
      <button onClick={checkingCapability} className="text-white border m-3">
        Connect
      </button>
      <button onClick={loadTheStreams} className="text-white border m-3">
        Load Streams
      </button>
      <div className="text-white border m-3" onClick={()=>console.log("1st div")}>
        <div onClick={()=>console.log("2nd div")}>
          Hello
        </div>
      </div>
      {
        
      }
      {/* <button onClick={createPosts} className="text-white border m-3">
        Make Profile
      </button> */}
    </main>
  );
}

export default page;
