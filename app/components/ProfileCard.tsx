"use client";
import React, { useContext, useEffect, useRef } from "react";
import Image from "next/image";
import localFont from "next/font/local";
import LikeButton from "./LikeButton";
import VanillaTilt from "vanilla-tilt";
import { useStream } from "../hooks";
import { getAddressFromDid } from "../utils/address";
import { objectToArray } from "../utils/address";

const myFont = localFont({
  src: "../fonts/Chillax-Bold.ttf",
  display: "swap",
});

interface ProfileCardProps {
  name: string;
  age: number;
  image: string;
  streamId:string;
  pkh:string;
}
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

function ProfileCard(props: ProfileCardProps) {
  const [liked, setLiked] = React.useState(false);
  const {loadStreamsByStreamId,updatePublicStream,loadStreams}=useStream()


  const getProfiles = async () => {
    
    const res = await loadStreams({
        pkh: props.pkh,
        modelId: "kjzl6hvfrbw6c5v0ce3x14dusz2qebnzosn596q6pd3dp4oaqkq3zwdohgbb3qd"
    })
    //console.log(res)
    if(res){
      const result = res[props.streamId]
      const likedAddresses=result.streamContent.content.addresses
     
    } 
} 

  const fetchAddress=async()=>{
    console.log(props.streamId,props.name)
    const res=await loadStreamsByStreamId(props.streamId)
    const content=res?.streamContent.content
    const likedAddress=[...content.addresses,res?.pkh]
    console.log(likedAddress)
    if(res){
      const stream=await updatePublicStream(content.name,content.description,content.images[0],content.gender,content.age,res.pkh,likedAddress,props.streamId,content.createdAt)
      console.log(stream)
    }
  }

  return (
    <div
      className={
        "bg-white h-[700px] w-[500px] rounded-[40px] mt-8 relative " +
        myFont.className
      }
    >
      <img
        src={props.image}
        width={1000}
        height={100}
        alt="picture"
        className="object-cover h-[100%] rounded-[40px]"
      />
      <div className="h-[100%] w-[500px] bg-black absolute top-0 rounded-[40px] overlay"></div>
      <div className="h-[100%] w-[100%] absolute top-0 flex flex-col justify-between">
        <div className="flex justify-between p-8">
          <h1 className="text-white text-[75px]">{props.age}</h1>
          <div onClick={fetchAddress}>
            <LikeButton setLiked={setLiked} liked={liked}/>
          </div>
        </div>
        <div>
          <h1 className="text-white p-8 text-[50px]">{props.name}</h1>
        </div>
      </div>
    </div>
  );
}

export default ProfileCard;
