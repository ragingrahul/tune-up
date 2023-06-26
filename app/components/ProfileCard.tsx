"use client";
import React, { useContext, useEffect, useRef, useState } from "react";
import Image from "next/image";
import localFont from "next/font/local";
import LikeButton from "./LikeButton";
import VanillaTilt from "vanilla-tilt";
import { useStream, useWallet } from "../hooks";
import { getAddressFromDid } from "../utils/address";
import { objectToArray } from "../utils/address";
import { RuntimeConnector,StreamContent } from "@dataverse/runtime-connector";
import { DataverseContext } from "../context/Context";
import { modelId } from "../utils/constants";

const myFont = localFont({
  src: "../fonts/Chillax-Bold.ttf",
  display: "swap",
});

interface ProfileCardProps {
  name: string;
  age: number;
  image: string;
  streamId: string;
  pkh: string;
}
type StreamRecord = Record<string,
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

function ProfileCard(props: ProfileCardProps) {
  const [liked, setLiked] = React.useState(false);
  const { getCurrentPkh } = useWallet()
  const { loadStreamsByStreamId, updatePublicStream, loadStreams } = useStream()
  const { runtimeConnector } = useContext(DataverseContext)
  const [LikedList, setLikedList] = useState<Array<string>>()
  const [pkh,setPkh]=useState<string>()
  const [ownerProfile,setOwnerProfile] = useState<StreamContent>()
  const [ownerStream,setOwnerStream] = useState<string>()

  const getProfiles = async () => {
    const pkh = await getCurrentPkh();
    setPkh(pkh);
    const res = await loadStreams({
      pkh: pkh,
      modelId: modelId
    })
    
   
    if (res) {
      const result:StreamContent = objectToArray(res)
      const id=Object.keys(res)[0]
      setOwnerStream(id)
      setOwnerProfile(result)
      const likedAddresses:Array<string> = result[0].addresses
      console.log(props.pkh)
      const ifLiked = likedAddresses?.filter((address) => address === props.pkh)
      setLikedList(ifLiked)
      //console.log(ifLiked)
      if (ifLiked?.length > 0) {
        setLiked(true)
      }
    }
  }

  const fetchAddress = async () => {
    console.log(props.streamId, props.name)
    
    const res = await loadStreamsByStreamId(props.streamId)
    if(ownerProfile){
    const content = ownerProfile[0]?.addresses
    // console.log(content)
    const likedAddress = [...content, res?.pkh]
    // console.log(likedAddress)
    // console.log(LikedList?.length)
    console.log(ownerProfile)
    console.log(pkh)
    if (LikedList && pkh && ownerProfile && ownerStream) {
      if (LikedList?.length === 0) {
        const stream = await updatePublicStream(ownerProfile[0].name, ownerProfile[0].description, ownerProfile[0].images[0], ownerProfile[0].gender, ownerProfile[0].age, pkh, likedAddress,ownerStream, ownerProfile[0].createdAt)
        console.log(stream)
        getProfiles()
      }
      else{
        const addressList: Array<string>=ownerProfile[0]?.addresses
        console.log(addressList)
        const unlikedAddress=addressList.filter((address) =>address !== props.pkh)
        console.log(unlikedAddress)
        const stream = await updatePublicStream(ownerProfile[0].name, ownerProfile[0].description, ownerProfile[0].images[0], ownerProfile[0].gender, ownerProfile[0].age, pkh, unlikedAddress,ownerStream, ownerProfile[0].createdAt)
        console.log(stream)
        getProfiles()
      }
    }
  }
  }

  useEffect(() => {
    getProfiles()
  }, [runtimeConnector])

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
            <LikeButton setLiked={setLiked} liked={liked} />
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
