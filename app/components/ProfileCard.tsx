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


  const getProfiles = async () => {
    const pkh = await getCurrentPkh();
    setPkh(pkh);
    const res = await loadStreams({
      pkh: pkh,
      modelId: "kjzl6hvfrbw6c5v0ce3x14dusz2qebnzosn596q6pd3dp4oaqkq3zwdohgbb3qd"
    })
    //console.log(res)
    if (res) {
      const result:StreamContent = objectToArray(res)
      setOwnerProfile(result)
      const likedAddresses: Array<string> = result?.streamContent?.content?.addresses
      const ifLiked = likedAddresses?.filter((address) => address === props.pkh)
      setLikedList(ifLiked)
      console.log(ifLiked)
      if (ifLiked?.length > 0) {
        setLiked(true)
      }
    }
  }

  const fetchAddress = async () => {
    console.log(props.streamId, props.name)
    const res = await loadStreamsByStreamId(props.streamId)
    const content = res?.streamContent.content
    const likedAddress = [...content.addresses, res?.pkh]
    console.log(likedAddress)
    console.log(LikedList?.length)
    if (LikedList && pkh && ownerProfile) {
      if (LikedList?.length === 0) {
        const stream = await updatePublicStream(ownerProfile.name, ownerProfile.description, ownerProfile.images[0], ownerProfile.gender, ownerProfile.age, pkh, likedAddress, props.streamId, content.createdAt)
        console.log(stream)
      }
      else{
        const addressList: Array<string>=content.addresses
        console.log(addressList)
        const unlikedAddress=addressList.filter((address) =>address !== pkh)
        console.log(unlikedAddress)
        const stream = await updatePublicStream(content.name, content.description, content.images[0], content.gender, content.age,pkh, unlikedAddress, props.streamId, content.createdAt)
        console.log(stream)
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
