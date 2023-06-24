"use client";
import React, { useEffect,useState,useContext } from "react";
import Image from "next/image";
import LikeButton from "../components/LikeButton";
import BottomNavbar from "../components/BottomNavbar";
import localFont from "next/font/local";
import ProfileCard from "../components/ProfileCard";
import { useStream,useWallet } from "../hooks";
import { DataverseContext } from "../context/Context";
import { objectToArray } from "../utils/address";
import LoadingProp from "../components/LoadingScreen";

const myFont = localFont({
  src: "../fonts/Chillax-Bold.ttf",
  display: "swap",
});

const profiles = [
  {
    name: "Anoy Roy Chowdhury",
    age: 21,
    image: "/profile_pic.jpg",
  },
  {
    name: "Rahul Raj Sarma",
    age: 22,
    image: "/profile_pic2.jpg",
  },
];
type StreamRecord=Record<string,
{app: string;
modelId: string;
pkh: string;
streamContent: {
    file?: any;
    content?: any;
};
}
>

function page() {
  const {loadStreams,checkCapability}=useStream()
  const {getCurrentPkh}=useWallet()
  const {runtimeConnector}=React.useContext(DataverseContext);
  const [profile,setProfile] = useState<StreamRecord>()
  const [pkh,setPkh]=useState<string>()
  const [profileArray,setProfileArray] = useState<any>()
  const [isLoading,setIsLoading]=useState<boolean>(false)
  
  const getProfiles=async()=>{
    setIsLoading(true);
    const res=await loadStreams({
      modelId:"kjzl6hvfrbw6c5v0ce3x14dusz2qebnzosn596q6pd3dp4oaqkq3zwdohgbb3qd"
    })
    
    setProfile(res)
    const result=objectToArray(res)
    console.log(result)
    setIsLoading(false);
    setProfileArray(result)
  }

  const isConnected=async()=>{
    setIsLoading(true)
    const res=await checkCapability()
    if(res){
      const pkh=await getCurrentPkh()
      setPkh(pkh)
      console.log(pkh)
    }
    setIsLoading(false)
    return res
  }

  useEffect(()=>{
    isConnected()
    getProfiles()
  },[runtimeConnector])

  return (
    <div
      className={
        "h-screen w-screen bg-[#FF8080] flex flex-col items-center overflow-x-hidden " +
        myFont.className
      }
    >
      <div className="flex flex-col items-center w-screen mt-16 h-fit bg-[#FF8080] pb-32">
        {profile &&
          Object.entries(profile).map(([key,value])=>(
            <ProfileCard
              name={value?.streamContent?.content.name}
              age={value.streamContent.content.age}
              image={value.streamContent.content.images[0]}
              streamId={key}
              pkh={value.streamContent.content.pkh}
            />
          ))
        }
      </div>


      <div className="fixed backdrop-filter top-3 rounded-2xl hover:backdrop-filter-none transition duration-300 ease-in-out hover:bg-[#ff8080] w-[450px] h-[75px] bg-white-900/20 backdrop-blur-[10px] flex justify-center items-center">
        <Image
          src="/Logo.png"
          width={200}
          height={200}
          alt="Logo"
          className=""
        />
      </div>

      {/* <div className="fixed backdrop-filter hover:backdrop-filter-none transition duration-300 ease-in-out hover:bg-white bottom-3 w-[400px] h-[100px] bg-slate-50/20 backdrop-blur-[10px] rounded-3xl flex justify-between items-center">
        <Image
          src="/ProfileIcon.svg"
          width={60}
          height={200}
          alt="Logo"
          className="ml-10 hover:scale-110 transition duration-300 ease-in-out hover:cursor-pointer"
          onClick={()=>window.location.href=`/profile`}
        />
        <Image
          src="/LikeIcon.svg"
          width={60}
          height={200}
          alt="Logo"
          className="hover:scale-110 transition duration-300 ease-in-out hover:cursor-pointer"
        />
        <Image
          src="/ChatIcon.svg"
          width={60}
          height={200}
          alt="Logo"
          className="mr-10 hover:scale-110 transition duration-300 ease-in-out hover:cursor-pointer"
        />
      </div> */}
      <BottomNavbar />
      <LoadingProp 
        isLoading={isLoading}
        title="Fetching"
        desc="Fecthing Profiles"
      />
    </div>
  );
}

export default page;
