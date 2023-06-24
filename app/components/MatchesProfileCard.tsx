"use client";
import React, { useContext, useEffect, useRef, useState } from "react";

import localFont from "next/font/local";
import LikeButton from "./LikeButton";

import { useStream, useWallet } from "../hooks";

import { objectToArray } from "../utils/address";
import { RuntimeConnector,StreamContent } from "@dataverse/runtime-connector";
import { DataverseContext } from "../context/Context";

const myFont = localFont({
  src: "../fonts/Chillax-Bold.ttf",
  display: "swap",
});

interface MatchesProfileCardProps {
  name: string;
  age: number;
  image: string;
  pkh: string;
}


function MatchesProfileCard(props: MatchesProfileCardProps) {

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
        </div>
        <div>
          <h1 className="text-white p-8 text-[50px]">{props.name}</h1>
        </div>
      </div>
    </div>
  );
}

export default MatchesProfileCard;
